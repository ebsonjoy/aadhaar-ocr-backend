"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.extractTextFromImage = void 0;
const tesseract_js_1 = __importDefault(require("tesseract.js"));
const extractTextFromImage = (filePath) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { data: { text, confidence } } = yield tesseract_js_1.default.recognize(filePath, 'eng', Object.assign({ logger: (m) => console.log(m), psm: 6 }, { tessedit_char_whitelist: '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz/ ,-' }));
        if (confidence < 50) {
            console.warn(`Low OCR confidence (${confidence}) for image: ${filePath}`);
        }
        return text
            .replace(/\n/g, ' ')
            .replace(/\s+/g, ' ')
            .trim();
    }
    catch (error) {
        console.error('Error during OCR processing:', error);
        throw new Error('Failed to extract text from image');
    }
});
exports.extractTextFromImage = extractTextFromImage;
