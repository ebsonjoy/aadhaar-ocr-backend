export const isAadhaarCardText = (text: string): boolean => {
    const aadhaarRegex = /\b\d{4}[\s-]?\d{4}[\s-]?\d{4}\b/;
    const keywords = ['aadhaar', 'government of india', 'bharat sarkar', 'भारत सरकार', 'आधार'];
  
    const lowerText = text.toLowerCase();
  
    const hasAadhaarNumber = aadhaarRegex.test(text);
    const hasKeyword = keywords.some(keyword => lowerText.includes(keyword));
  
    return hasAadhaarNumber && hasKeyword;
  };
  