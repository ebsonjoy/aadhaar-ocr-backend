import { Request, Response } from 'express';
import { extractTextFromImage } from '../services/ocrService';
import fs from 'fs/promises';
import path from 'path';
import { parseAadhaarData } from '../utils/parseOCR';
export const uploadAndProcessImages = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    if (!req.files || !('front' in req.files) || !('back' in req.files)) {
      res.status(400).json({ message: 'Both front and back images are required' });
      return;
    }

    const files = req.files as { [fieldname: string]: Express.Multer.File[] };

    console.log('Uploaded files:', files);

    const frontText = await extractTextFromImage(files.front[0].path);
    const backText = await extractTextFromImage(files.back[0].path);

    console.log('Front text:', frontText);
    console.log('Back text:', backText);
    const frontPath = path.resolve(__dirname, `../${files.front[0].path}`);
    const backPath = path.resolve(__dirname, `../${files.back[0].path}`);

    if (await fs.stat(frontPath).catch(() => false)) {
      await fs.unlink(frontPath);
    }

    if (await fs.stat(backPath).catch(() => false)) {
      await fs.unlink(backPath);
    }
    const formattedData = parseAadhaarData(frontText, backText)

    res.status(200).json(formattedData);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ message: 'Failed to process images' });
  }
};
