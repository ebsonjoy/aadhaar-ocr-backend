
import { Request, Response, NextFunction } from 'express';
import { AadhaarService } from '../services/AadhaarService';
import { AadhaarRepository } from '../repositories/AadhaarRepository';

const aadhaarRepository = new AadhaarRepository();
const aadhaarService = new AadhaarService(aadhaarRepository);

export const uploadAndProcessImages = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    if (!req.files || !('front' in req.files) || !('back' in req.files)) {
      const error = new Error('Both front and back images are required');
      (error as any).statusCode = 400;
      return next(error);
    }

    const files = req.files as { [fieldname: string]: Express.Multer.File[] };
    const frontImagePath = files.front[0].path;
    const backImagePath = files.back[0].path;

    const formattedData = await aadhaarService.processAadhaarCards(frontImagePath, backImagePath);

    res.status(200).json({
      success: true,
      data: formattedData
    });
  } catch (error) {
    next(error);
  }
};