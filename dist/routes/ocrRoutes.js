"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const multer_1 = __importDefault(require("../config/multer"));
const ocrController_1 = require("../controllers/ocrController");
const router = (0, express_1.Router)();
router.post('/upload', multer_1.default.fields([
    { name: 'front', maxCount: 1 },
    { name: 'back', maxCount: 1 }
]), ocrController_1.uploadAndProcessImages);
exports.default = router;
