import { Request, Response } from 'express';
import { Recaudo } from '../model'
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

  console.log(fecha1, fecha2, zona);
  
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
      attributes: ['VINCULADO', 'VALOR', 'ESTADO', 'NOTA_CONTEO'],
      where: { 
        FECHA: { [Op.between]: [fecha1, fecha2] }, 
        EMPRESA: zona
      }
    })

    res.status(200).json(result)
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Error en getReportRecaudo' });
  }
}