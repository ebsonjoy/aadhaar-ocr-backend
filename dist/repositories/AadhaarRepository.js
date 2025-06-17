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
exports.AadhaarRepository = void 0;
const tesseract_js_1 = __importDefault(require("tesseract.js"));
const promises_1 = __importDefault(require("fs/promises"));
const path_1 = __importDefault(require("path"));
const parseOCR_1 = require("../utils/parseOCR");
const validateAadhaar_1 = require("../utils/validateAadhaar");
class AadhaarRepository {
    constructor() {
        this.minConfidenceThreshold = 50;
    }
    processAadhaarImages(frontImagePath, backImagePath) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const frontText = yield this.extractTextFromImage(frontImagePath);
                const backText = yield this.extractTextFromImage(backImagePath);
                const frontValidation = this.validateAadhaarText(frontText);
                const backValidation = this.validateAadhaarText(backText);
                if (frontValidation === 'valid' || backValidation === 'valid') {
                    return this.parseAadhaarData(frontText, backText);
                }
                if (frontValidation === 'unclear' || backValidation === 'unclear') {
                    throw new Error('Your Aadhaar is not clear. Please upload again.');
                }
                throw new Error('Uploaded images do not appear to be Aadhaar cards');
            }
            catch (error) {
                throw new Error(`Failed to process images, ${error}`);
            }
        });
    }
    extractTextFromImage(filePath) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { data: { text, confidence } } = yield tesseract_js_1.default.recognize(filePath, 'eng', Object.assign({ logger: (m) => console.log(m), psm: 6 }, {
                    tessedit_char_whitelist: '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz/ ,-'
                }));
                if (confidence < this.minConfidenceThreshold) {
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
    }
    validateAadhaarText(text) {
        return (0, validateAadhaar_1.isAadhaarCardText)(text);
    }
    parseAadhaarData(frontText, backText) {
        return (0, parseOCR_1.parseAadhaarData)(frontText, backText);
    }
    cleanupFiles(filePaths) {
        return __awaiter(this, void 0, void 0, function* () {
            const cleanupPromises = filePaths.map((filePath) => __awaiter(this, void 0, void 0, function* () {
                try {
                    const resolvedPath = path_1.default.resolve(process.cwd(), filePath);
                    const fileExists = yield promises_1.default.stat(resolvedPath).then(() => true).catch(() => false);
                    if (fileExists) {
                        yield promises_1.default.unlink(resolvedPath);
                        console.log(`Cleaned up file: ${filePath}`);
                    }
                }
                catch (error) {
                    console.error(`Failed to cleanup file ${filePath}:`, error);
                }
            }));
            yield Promise.all(cleanupPromises);
        });
    }
}
exports.AadhaarRepository = AadhaarRepository;
