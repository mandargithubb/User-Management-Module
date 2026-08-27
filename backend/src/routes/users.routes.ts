import { Router } from 'express';
import { usersController } from '../controllers/users.controller.js';
import { authMiddleware } from '../middleware/auth.middleware.js';
import { validateBody } from '../middleware/validation.middleware.js';
import { userSchema, updateUserSchema } from '../validators/user.validator.js';

const router = Router();

router.use(authMiddleware);
router.get('/', usersController.list);
router.get('/:id', usersController.getById);
router.post('/', validateBody(userSchema), usersController.create);
router.put('/:id', validateBody(updateUserSchema), usersController.update);
router.delete('/:id', usersController.remove);

export default router;
