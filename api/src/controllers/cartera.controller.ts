import { CarteraDataServices } from '../services/cartera.services'
import { mapCarteraResults } from '../utils/funtions';
import { connMngrOra } from '../connections/mngr'
import { Request, Response } from 'express'

type RowType = [
  string,  // fecha
  string,  // cuenta
  string,  // empresa
  string,  // vinculado
  number,  // ingresos
  number,  // egresos
  number,  // abonos_cartera
  number   // version
];

export const getCartera = async (req: Request, res: Response) => {
  const { empresa, abs } = req.query;

  if (!empresa || !abs) {
    return res.status(400).json({ message: 'Missing parameters' });
  }

  const absBool = abs === 'true' ? true : false;

  try {
    const results = await CarteraDataServices(empresa as string, absBool);
    const mapeado = mapCarteraResults(results);
    return res.status(200).json(mapeado);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal server error', error });
  }
}

export const getReportMngr = async (req: Request, res: Response) => {
  const { fecha1, fecha2, vinculado } = req.body;

  if (!fecha1 || !fecha2 || !vinculado) {
    return res.status(400).json({ message: 'Missing parameters' });
  }

  let connetion;

  const formattedDate1 = fecha1.split('-').reverse().join('/');
  const formattedDate2 = fecha2.split('-').reverse().join('/');

  try {
    const pool = await connMngrOra();

    if (pool instanceof Error) {
      throw new Error('Error al intentar conectar a la base de datos')
    }

    connetion = await pool.getConnection();

    const { rows, metaData } = await connetion.execute<RowType[][]>(`
      SELECT
      mcnfecha fecha, mcncuenta cuenta, mcnEmpresa empresa,mcnVincula vinculado, 
      SUM (case when (mn.mcntipodoc not in (1213,1252,1204,2202,2226)) then mcnvaldebi else 0 end) INGRESOS, 
      SUM (case when (mn.mcntipodoc not in (1213,1252,1204,2202,2226)) then mcnvalcred else 0 end) EGRESOS,
      SUM (case when (mn.mcntipodoc in (1213,1252,1204,2202,2226)) then mcnvalcred else 0 end) ABONOS_CARTERA,
      0 VERSION
      FROM manager.mngmcn mn
      WHERE mcncuenta = '13459501'
      And mcnfecha between TO_DATE('${formattedDate1}', 'DD/MM/YYYY') and TO_DATE('${formattedDate2}', 'DD/MM/YYYY')
      and (mcntpreg = 0 or mcntpreg = 1 or mcntpreg = 2 or mcntpreg > 6)
      AND mcnVincula in ('${vinculado}')
      group by mcnfecha,mcncuenta,mcnEmpresa,mcnVincula
      ORDER BY mcnfecha
    `);

    const data = rows?.map(row => {
      return metaData?.reduce((acc, meta, index) => {
        acc[meta.name.toLowerCase()] = row[index];
        return acc;
      }, {} as Record<string | number, any>);
    });

    return res.status(200).json(data);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal server error', error });
  }
}