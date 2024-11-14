import { connectionOracle } from '../connections/oracledb';
import { RowType } from '../types/interface';
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
  let connection;
  try {
    const pool = await connectionOracle();

    if (pool instanceof Error) {
      return res.status(500).json({ message: 'Error en getReportOracle' });
    }

    connection = await pool.getConnection();

    const { rows, metaData } = await connection.execute<RowType[]>(`
      SELECT tvn.fecha, tvn.persona, 
             UPPER(pe.nombres || ' ' || pe.apellido1 || ' ' || pe.apellido2) nombres, 
             pro.razonsocial, tvn.servicio, se.nombre nombreservicio, 
             TVN.VENTABRUTA, round(TVN.VTABRUTASINIVA, 2) vtasiniva, 
             round(TVN.IVA, 2) iva, round(TVN.COMISION, 2) comision, 
             round(TVN.VENTANETA, 2) ventaneta, TVN.FORMULARIOS, 
             tvn.sucursal, IPV.NOMBRE_COMERCIAL 
      FROM V_TOTALVENTASNEGOCIO tvn
      JOIN proveedores pro ON TVN.PROVEEDOR = pro.nit
      JOIN servicios se ON tvn.servicio = se.codigo
      JOIN personas pe ON pe.documento = tvn.persona
      JOIN info_puntosventa_cem ipv ON ipv.codigo = TVN.SUCURSAL
      WHERE tvn.fecha = TO_DATE('12/02/2024', 'DD/MM/YYYY') 
        AND tvn.persona = 31477050
    `);

    if (!rows) {
      return res.status(404).json({ message: 'No se encontraron datos' });
    }

    const data = rows.map(row => {
      return metaData?.reduce((acc, meta, index) => {
        acc[meta.name.toLowerCase()] = row[index];
        return acc;
      }, {} as Record<string, any>);
    });

    return res.status(200).json(data);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Error en getReportOracle' });
  } finally {
    if (connection) {
      try {
        await connection.close();
      } catch (closeError) {
        console.error('Error closing connection', closeError);
      }
    }
  }
}