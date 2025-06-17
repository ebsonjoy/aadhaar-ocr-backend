export interface AadhaarData {
  name?: string;
  aadhaarNumber?: string;
  dob?: string;
  gender?: string;
  address?: string;
  fatherName?: string;
  pincode?: string;
}

export interface ProcessedImageResult {
  text: string;
  confidence: number;
}

export type AadhaarValidationStatus = 'valid' | 'not_aadhaar' | 'unclear';

