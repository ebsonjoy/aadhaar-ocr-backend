import { AadhaarData } from "./types";

export interface IAadhaarRepository {
  processAadhaarImages(frontImagePath: string, backImagePath: string): Promise<AadhaarData>;
  extractTextFromImage(imagePath: string): Promise<string>;
  validateAadhaarText(text: string): string;
  parseAadhaarData(frontText: string, backText: string): AadhaarData;
  cleanupFiles(filePaths: string[]): Promise<void>;
}