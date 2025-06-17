import { AadhaarRepository } from '../repositories/AadhaarRepository';
import { AadhaarService } from '../services/AadhaarService';
import { IAadhaarRepository } from '../interfaces/IAadhaarRepository';

export class Container {
  private static aadhaarRepository: IAadhaarRepository;
  private static aadhaarService: AadhaarService;

  static getAadhaarRepository(): IAadhaarRepository {
    if (!this.aadhaarRepository) {
      this.aadhaarRepository = new AadhaarRepository();
    }
    return this.aadhaarRepository;
  }

  static getAadhaarService(): AadhaarService {
    if (!this.aadhaarService) {
      this.aadhaarService = new AadhaarService(this.getAadhaarRepository());
    }
    return this.aadhaarService;
  }
}