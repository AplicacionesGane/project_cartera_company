import { Request, Response } from 'express';
import { Recaudo } from '../model'
import { fn } from 'sequelize';

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
    
    if(!result) return res.status(404).json({ message: 'No se encontraron datos' });
    
    return res.status(200).json(result);
  } catch (error) {
    console.error('Error en getRecaudo', error);
    return res.status(500).json({ message: 'Error en getRecaudo' });
  }
}