import { Router } from 'express';
import { authController } from '../controllers/auth.controller.js';
import { validateBody } from '../middleware/validation.middleware.js';
import { loginSchema } from '../validators/auth.validator.js';

const router = Router();

router.post('/login', validateBody(loginSchema), authController.login);

export default router;
