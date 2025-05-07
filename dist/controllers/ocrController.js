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
exports.uploadAndProcessImages = void 0;
const ocrService_1 = require("../services/ocrService");
const promises_1 = __importDefault(require("fs/promises"));
const path_1 = __importDefault(require("path"));
const parseOCR_1 = require("../utils/parseOCR");
const validateAadhaar_1 = require("../utils/validateAadhaar");
const uploadAndProcessImages = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!req.files || !('front' in req.files) || !('back' in req.files)) {
            const error = new Error('Both front and back images are required');
            error.statusCode = 400;
            return next(error);
        }
        const files = req.files;
        const frontText = yield (0, ocrService_1.extractTextFromImage)(files.front[0].path);
        const backText = yield (0, ocrService_1.extractTextFromImage)(files.back[0].path);
        const frontPath = path_1.default.resolve(__dirname, `../${files.front[0].path}`);
        const backPath = path_1.default.resolve(__dirname, `../${files.back[0].path}`);
        if (yield promises_1.default.stat(frontPath).catch(() => false)) {
            yield promises_1.default.unlink(frontPath);
        }
        if (yield promises_1.default.stat(backPath).catch(() => false)) {
            yield promises_1.default.unlink(backPath);
        }
        const isValid = (0, validateAadhaar_1.isAadhaarCardText)(frontText) || (0, validateAadhaar_1.isAadhaarCardText)(backText);
        if (!isValid) {
            const error = new Error('Uploaded images do not appear to be Aadhaar cards');
            error.statusCode = 400;
            return next(error);
        }
        const formattedData = (0, parseOCR_1.parseAadhaarData)(frontText, backText);
        res.status(200).json({ success: true, data: formattedData });
    }
    catch (error) {
        next(error);
    }
});
exports.uploadAndProcessImages = uploadAndProcessImages;
