import { CarteraDataServices } from '../services/cartera.services'
import { mapCarteraResults } from '../utils/funtions';
import { connMngrOra } from '../connections/mngr'
import { Request, Response } from 'express'
import { Cartera, Sellers } from '../model';
import { z } from 'zod';

const schema = z.object({
  fecha1: z.string(),
  fecha2: z.string(),
  vinculado: z.string().transform((val) => parseInt(val, 10)),
})

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
  const { success, data, error } = schema.safeParse(req.body);

  if (!success) {
    return res.status(400).json({ message: error.format() });
  }

  if (!data) {
    return res.status(400).json({ message: 'Missing parameters' });
  }

  const fecha1 = data.fecha1.split(' ')[0];
  const fecha2 = data.fecha2.split(' ')[0];
  const vinculado = data.vinculado;

  const frmDate1 = fecha1.split('-').reverse().join('/');
  const frmDate2 = fecha2.split('-').reverse().join('/');

  let connetion;

  try {

    const CarteraInicial = await Cartera.findOne({
      attributes: ['SALDO_ANT'],
      where: {
        VINCULADO: vinculado,
        FECHA: fecha1
      },
      include: [{
        model: Sellers,
        attributes: ['NOMBRES', 'CCOSTO'],
      }]
    });

    // JAMUNDI 39632, 
    // const CCOSTO = CarteraInicial?.Seller?.CCOSTO;

    const pool = await connMngrOra();

    if (pool instanceof Error) {
      throw new Error('Error al intentar conectar a la base de datos')
    }

    connetion = await pool.getConnection();

    const { rows, metaData } = await connetion.execute<RowType[][]>(`
      SELECT
      mcnfecha fecha, mcncuenta cuenta, mcnEmpresa empresa, mcnVincula vinculado, 
      SUM (case when (mn.mcntipodoc not in (1213,1252,1204,2202,2226)) then mcnvaldebi else 0 end) INGRESOS, 
      SUM (case when (mn.mcntipodoc not in (1213,1252,1204,2202,2226)) then mcnvalcred else 0 end) EGRESOS,
      SUM (case when (mn.mcntipodoc in (1213,1252,1204,2202,2226)) then mcnvalcred else 0 end) ABONOS_CARTERA,
      0 VERSION
      FROM manager.mngmcn mn
      WHERE mcncuenta = '13459501'
      And mcnfecha between TO_DATE('${frmDate1}', 'DD-MM-YYYY') and TO_DATE('${frmDate2}', 'DD-MM-YYYY')
      AND (mcntpreg = 0 or mcntpreg = 1 or mcntpreg = 2 or mcntpreg > 6)
      AND mcnVincula in (${vinculado})
      GROUP BY mcnfecha, mcncuenta, mcnEmpresa, mcnVincula
      ORDER BY mcnfecha
    `);

    const data = rows?.map(row => {
      return metaData?.reduce((acc, meta, index) => {
        acc[meta.name.toLowerCase()] = row[index];
        return acc;
      }, {} as Record<string | number, any>);
    });

    res.status(200).json({ data, CarteraInicial });
    return
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal server error', error });
  } finally {
    if (connetion) {
      connetion.close();
    }
  }
}