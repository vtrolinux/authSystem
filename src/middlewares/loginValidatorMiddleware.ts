import { type Request, type Response, type NextFunction } from 'express'; 
import validator from 'validator';
import { AppError } from '../utils/AppError.ts';

const loginValidatorMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const { email, password } = req.body;

    if (!email) {
        return new AppError(400, 'INVALID_REQUEST', 'O e-mail é obrigatório.').sendResponse(res);
    }

    if (!validator.isEmail(email)) {
        return new AppError(400, 'INVALID_REQUEST', 'O campo e-mail deve ser um endereço de e-mail válido.').sendResponse(res);
    }

    if (!password) {
        return new AppError(400, 'INVALID_REQUEST', 'A senha é obrigatória.').sendResponse(res);
    }

    next();
};

export { loginValidatorMiddleware };
