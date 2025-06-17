import { IAadhaarRepository } from '../interfaces/IAadhaarRepository';
import { AadhaarData } from '../interfaces/types';

export class AadhaarService {
  constructor(private readonly aadhaarRepository: IAadhaarRepository) {}

  async processAadhaarCards(frontImagePath: string, backImagePath: string): Promise<AadhaarData> {
    try {
      const result = await this.aadhaarRepository.processAadhaarImages(frontImagePath, backImagePath);
      
      await this.aadhaarRepository.cleanupFiles([frontImagePath, backImagePath]);
      
      return result;
    } catch (error) {
      await this.aadhaarRepository.cleanupFiles([frontImagePath, backImagePath]);
      throw error;
    }
  }
}