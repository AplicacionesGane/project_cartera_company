import { CarteraDataServices } from '../services/cartera.services'
import { Request, Response } from 'express'
import { mapCarteraResults } from '../utils/funtions';

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
