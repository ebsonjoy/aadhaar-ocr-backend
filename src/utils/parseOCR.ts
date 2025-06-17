import { AadhaarData } from "../interfaces/types";

export const parseAadhaarData = (frontText: string, backText: string): AadhaarData => {
  const nameRegex = /([A-Z][a-z]+\s+[A-Z][a-z]+(\s+[A-Z][a-z]+)?)/;
  const dobRegex = /(?:DOB\s*[:]\s*)(\d{2}\/\d{2}\/\d{4})/i;
  const genderRegex = /\b(Male|Female|Other)\b/i;
  const aadhaarNumberRegex = /(\d{4}\s\d{4}\s\d{4})/;

  const addressRegex = /Address:\s*([\s\S]*?)(?:\d{6})/;

  console.log('Front Text Raw:', frontText);
  console.log('Back Text Raw:', backText);

  const name = 
    frontText.match(nameRegex)?.[0]?.trim() || 
    backText.match(nameRegex)?.[0]?.trim() || 
    '';

  const dob = 
    frontText.match(dobRegex)?.[1]?.trim() || 
    backText.match(dobRegex)?.[1]?.trim() || 
    '';

  const gender = 
    frontText.match(genderRegex)?.[0]?.trim() || 
    backText.match(genderRegex)?.[0]?.trim() || 
    '';

  const aadhaarNumber = 
    frontText.match(aadhaarNumberRegex)?.[1]?.trim() || 
    backText.match(aadhaarNumberRegex)?.[1]?.trim() || 
    '';

  const addressMatch = backText.match(addressRegex);
  const address = addressMatch?.[1]?.trim() || '';
  const pincode = backText.match(/\b(\d{6})\b/)?.[1] || '';

  console.log('Parsed Results:', {
    name, 
    dob, 
    gender, 
    aadhaarNumber, 
    address, 
    pincode
  });

  return {
    name,
    dob,
    gender,
    aadhaarNumber,
    address,
    pincode,
  };
};