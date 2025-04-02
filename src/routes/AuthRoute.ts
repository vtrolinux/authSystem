import { Router } from 'express';
import AuthController from '../controllers/AuthController.ts';
import { loginValidatorMiddleware } from '../middlewares/loginValidatorMiddleware.ts';  // Supondo que você tenha esse middleware de validação
import { registerValidatorMiddleware } from '../middlewares/registerValidatorMiddleware.ts';  // Supondo que você tenha esse middleware de validação
import { rateLimiter, loginRateLimiter, registerRateLimiter, confirmationRateLimiter } from '../middlewares/rateLimiterMiddleware.ts'; 

const router = Router();

router.post('/login', rateLimiter, loginValidatorMiddleware, AuthController.login);
router.post('/register', rateLimiter, registerValidatorMiddleware, AuthController.register);
router.get('/confirmation-code', confirmationRateLimiter, AuthController.emailConfirmation);

export default router;
