import { IAadhaarRepository } from '../interfaces/IAadhaarRepository';
import { AadhaarData, AadhaarValidationStatus } from '../interfaces/types';
import Tesseract from 'tesseract.js';
import fs from 'fs/promises';
import path from 'path';
import { parseAadhaarData } from '../utils/parseOCR';
import { isAadhaarCardText } from '../utils/validateAadhaar';

export class AadhaarRepository implements IAadhaarRepository {
  private readonly minConfidenceThreshold = 50;

  async processAadhaarImages(frontImagePath: string, backImagePath: string): Promise<AadhaarData> {
    try {
      const frontText = await this.extractTextFromImage(frontImagePath);
      const backText = await this.extractTextFromImage(backImagePath);

      const frontValidation = this.validateAadhaarText(frontText);
      const backValidation = this.validateAadhaarText(backText);

      if (frontValidation === 'valid' || backValidation === 'valid') {
        return this.parseAadhaarData(frontText, backText);
      }

      if (frontValidation === 'unclear' || backValidation === 'unclear') {
        throw new Error('Your Aadhaar is not clear. Please upload again.');
      }

      throw new Error('Uploaded images do not appear to be Aadhaar cards');
    } catch (error) {
      throw new Error(`Failed to process images, ${error}`);
    }
  }

  async extractTextFromImage(filePath: string): Promise<string> {
    try {
      const { data: { text, confidence } } = await Tesseract.recognize(filePath, 'eng', {
        logger: (m) => console.log(m),
        psm: 6,
        ...({
          tessedit_char_whitelist: '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz/ ,-'
        } as any)
      });

      if (confidence < this.minConfidenceThreshold) {
        console.warn(`Low OCR confidence (${confidence}) for image: ${filePath}`);
      }

      return text
        .replace(/\n/g, ' ')
        .replace(/\s+/g, ' ')
        .trim();
    } catch (error) {
      console.error('Error during OCR processing:', error);
      throw new Error('Failed to extract text from image');
    }
  }

  validateAadhaarText(text: string): AadhaarValidationStatus {
    return isAadhaarCardText(text);
  }

  parseAadhaarData(frontText: string, backText: string): AadhaarData {
    return parseAadhaarData(frontText, backText);
  }

  async cleanupFiles(filePaths: string[]): Promise<void> {
    const cleanupPromises = filePaths.map(async (filePath) => {
      try {
        const resolvedPath = path.resolve(process.cwd(), filePath);
        const fileExists = await fs.stat(resolvedPath).then(() => true).catch(() => false);
        if (fileExists) {
          await fs.unlink(resolvedPath);
          console.log(`Cleaned up file: ${filePath}`);
        }
      } catch (error) {
        console.error(`Failed to cleanup file ${filePath}:`, error);
      }
    });

    await Promise.all(cleanupPromises);
  }
}
