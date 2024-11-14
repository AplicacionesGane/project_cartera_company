import { connectionOracle } from '../connections/oracledb';
import { Request, Response } from 'express';
import { Recaudo, Sellers } from '../model'
import { fn, Op } from 'sequelize';

export const getRecaudo = async (req: Request, res: Response) => {
  const { id, estado } = req.params;
  try {
    await Recaudo.sync();

    const result = await Recaudo.findOne({
      where: {
        VINCULADO: id as string,
        FECHA: fn('CURDATE'),
        ESTADO: estado as string
      }
    })

    if (!result) return res.status(404).json({ message: 'No se encontraron datos' });

    return res.status(200).json(result);
  } catch (error) {
    console.error('Error en getRecaudo', error);
    return res.status(500).json({ message: 'Error en getRecaudo' });
  }
}

export const getReportRecaudo = async (req: Request, res: Response) => {
  const { fecha1, fecha2, zona } = req.body;

  try {
    if (!fecha1 || !fecha2 || !zona) {
      res.status(400).json('Falta fecha inicial o final o zona, verificar estos datos')
      return
    }

    if (zona !== '101' && zona !== '102') {
      res.status(400).json('Zona no válida, verificar zona')
      return
    }

    const result = await Recaudo.findAll({
      attributes: ['FECHA', 'VINCULADO', 'VALOR', 'ESTADO', 'NOTA_CONTEO', 'USR_CONTEO', 'HORA_CONTEO', 'EMPRESA'],
      where: {
        ESTADO: { [Op.in]: ['u', 'r'] },
        FECHA: { [Op.between]: [fecha1, fecha2] },
        NOTA_CONTEO: { [Op.ne]: '' },
        EMPRESA: zona
      },
      include: [{
        attributes: ['NOMBRES'],
        model: Sellers
      }]
    })

    res.status(200).json(result)
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Error en getReportRecaudo' });
  }
}

export const getReportOracle = async (req: Request, res: Response) => {
  try {
    const pool = await connectionOracle();

    if (pool instanceof Error) {
      return res.status(500).json({ message: 'Error en getReportOracle' });
    }

    const connection = await pool.getConnection();

    const { rows } = await connection.execute("SELECT tvn.fecha, tvn.persona, upper(pe.nombres||' '||pe.apellido1||''||pe.apellido2) nombres, pro.razonsocial, tvn.servicio, se.nombre nombreservicio, TVN.VENTABRUTA, round(TVN.VTABRUTASINIVA,2)vtasiniva, round(TVN.IVA,2) iva, round(TVN.COMISION,2) comision, round(TVN.VENTANETA,2) ventaneta, TVN.FORMULARIOS, tvn.sucursal, IPV.NOMBRE_COMERCIAL from V_TOTALVENTASNEGOCIO tvn, proveedores pro, servicios se, personas pe, info_puntosventa_cem ipv WHERE tvn.fecha=to_date('12/02/2024','DD/MM/YYYY') and TVN.PROVEEDOR=pro.nit and tvn.servicio=se.codigo and pe.documento=tvn.persona and ipv.codigo=TVN.SUCURSAL and tvn.persona=31477050");

    await connection.close();

    return res.status(200).json(rows);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Error'});
  }
}