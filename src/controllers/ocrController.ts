import { Request, Response } from 'express';
import { extractTextFromImage } from '../services/ocrService';
import fs from 'fs/promises';
import path from 'path';
import { parseAadhaarData } from '../utils/parseOCR';
import { isAadhaarCardText } from '../utils/validateAadhaar';




export const uploadAndProcessImages = async (
  req: Request,
  res: Response,
  next: Function
): Promise<void> => {
  try {
    if (!req.files || !('front' in req.files) || !('back' in req.files)) {
      const error = new Error('Both front and back images are required');
      (error as any).statusCode = 400;
      return next(error);
    }

    const files = req.files as { [fieldname: string]: Express.Multer.File[] };

    const frontText = await extractTextFromImage(files.front[0].path);
    const backText = await extractTextFromImage(files.back[0].path);

    const frontPath = path.resolve(__dirname, `../${files.front[0].path}`);
    const backPath = path.resolve(__dirname, `../${files.back[0].path}`);

    if (await fs.stat(frontPath).catch(() => false)) {
      await fs.unlink(frontPath);
    }
    if (await fs.stat(backPath).catch(() => false)) {
      await fs.unlink(backPath);
    }

    const isValid = isAadhaarCardText(frontText) || isAadhaarCardText(backText);
    if (!isValid) {
      const error = new Error('Uploaded images do not appear to be Aadhaar cards');
      (error as any).statusCode = 400;
      return next(error);
    }

    const formattedData = parseAadhaarData(frontText, backText);
    res.status(200).json({ success: true, data: formattedData });

  } catch (error) {
    next(error);
  }
};