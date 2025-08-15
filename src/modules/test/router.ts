import { Router } from 'express';

import { testController } from './controller.js';

const router = Router();

router.get('/', testController);

export default router;
