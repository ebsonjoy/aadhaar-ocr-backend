import { AadhaarValidationStatus } from "../interfaces/types";
export const isAadhaarCardText = (text: string): AadhaarValidationStatus => {
    const aadhaarRegex = /\b\d{4}[\s-]?\d{4}[\s-]?\d{4}\b/;
    const keywords = ['aadhaar','government', 'government of india', 'bharat sarkar', 'भारत सरकार', 'आधार'];
  
    const lowerText = text.toLowerCase();
  
    const hasAadhaarNumber = aadhaarRegex.test(text);
    console.log('hasAadhaarNumber',hasAadhaarNumber)
    const hasKeyword = keywords.some(keyword => lowerText.includes(keyword));
    console.log('hasAadhaarNumber',hasKeyword)
  
    if (hasAadhaarNumber && hasKeyword) return 'valid';
    if (hasAadhaarNumber || hasKeyword) return 'unclear';
    return 'not_aadhaar';
  };
  