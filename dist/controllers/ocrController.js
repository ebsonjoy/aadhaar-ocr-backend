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
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadAndProcessImages = void 0;
const AadhaarService_1 = require("../services/AadhaarService");
const AadhaarRepository_1 = require("../repositories/AadhaarRepository");
const aadhaarRepository = new AadhaarRepository_1.AadhaarRepository();
const aadhaarService = new AadhaarService_1.AadhaarService(aadhaarRepository);
const uploadAndProcessImages = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!req.files || !('front' in req.files) || !('back' in req.files)) {
            const error = new Error('Both front and back images are required');
            error.statusCode = 400;
            return next(error);
        }
        const files = req.files;
        const frontImagePath = files.front[0].path;
        const backImagePath = files.back[0].path;
        const formattedData = yield aadhaarService.processAadhaarCards(frontImagePath, backImagePath);
        res.status(200).json({
            success: true,
            data: formattedData
        });
    }
    catch (error) {
        next(error);
    }
});
exports.uploadAndProcessImages = uploadAndProcessImages;
