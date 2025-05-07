import Tesseract from 'tesseract.js';

export const extractTextFromImage = async (filePath: string): Promise<string> => {
  try {
    const { data: { text, confidence } } = await Tesseract.recognize(filePath, 'eng', {
      logger: (m) => console.log(m),
      psm: 6,
      ...( { tessedit_char_whitelist: '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz/ ,-' } as any)
    });

    if (confidence < 50) {
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
};
