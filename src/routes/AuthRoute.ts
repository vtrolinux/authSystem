import { Router } from 'express';
import AuthController from '../controllers/AuthController.ts';
import { loginValidatorMiddleware, registerValidatorMiddleware, emailConfirmationValidatorMiddlware } from '../middlewares/authValidatorMiddleware.ts';
import { rateLimiter, loginRateLimiter, registerRateLimiter, confirmationRateLimiter } from '../middlewares/rateLimiterMiddleware.ts'; 

const router = Router();

router.post('/login', rateLimiter, loginValidatorMiddleware, AuthController.login);
router.post('/register', rateLimiter, registerValidatorMiddleware, AuthController.register);
router.get('/confirmation-code', confirmationRateLimiter, emailConfirmationValidatorMiddlware, AuthController.emailConfirmation);

export default router;
