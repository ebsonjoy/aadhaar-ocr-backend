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
exports.AadhaarService = void 0;
class AadhaarService {
    constructor(aadhaarRepository) {
        this.aadhaarRepository = aadhaarRepository;
    }
    processAadhaarCards(frontImagePath, backImagePath) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield this.aadhaarRepository.processAadhaarImages(frontImagePath, backImagePath);
                yield this.aadhaarRepository.cleanupFiles([frontImagePath, backImagePath]);
                return result;
            }
            catch (error) {
                yield this.aadhaarRepository.cleanupFiles([frontImagePath, backImagePath]);
                throw error;
            }
        });
    }
}
exports.AadhaarService = AadhaarService;
