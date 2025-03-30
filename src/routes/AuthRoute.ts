import { Router } from 'express';
import AuthController from '../controllers/AuthController.ts';
import { loginValidatorMiddleware } from '../middlewares/loginValidatorMiddleware.ts';  // Supondo que você tenha esse middleware de validação
import { registerValidatorMiddleware } from '../middlewares/registerValidatorMiddleware.ts';  // Supondo que você tenha esse middleware de validação

const router = Router();

router.post('/login', loginValidatorMiddleware, AuthController.login);
router.post('/register', registerValidatorMiddleware, AuthController.register);
router.get('/confirmation-code', AuthController.emailConfirmation);

export default router;
