import express from 'express';
import { wistonMiddleware } from './middlewares/winston.js';

const router = express.Router();

// Middlewares
router.use(wistonMiddleware);

export default router;
