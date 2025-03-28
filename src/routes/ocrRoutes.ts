import { Router } from 'express';
import upload from '../config/multer';
import { uploadAndProcessImages } from '../controllers/ocrController';

const router = Router();

// Accept two files: 'front' and 'back'
router.post(
  '/upload',
  upload.fields([{ name: 'front', maxCount: 1 }, { name: 'back', maxCount: 1 }]),
  uploadAndProcessImages
);

export default router;
