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

const registerValidatorMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const { name, email, password, confirmPassword } = req.body;
    
    if (!name) {
        return new AppError(400, 'MISSING_NAME', 'O nome é obrigatório.').sendResponse(res);
    }

    if (!email) {
        return new AppError(400, 'MISSING_EMAIL', 'O e-mail é obrigatório.').sendResponse(res);
    }

    if (!validator.isEmail(email)) {
        return new AppError(400, 'INVALID_EMAIL', 'O e-mail informado não é válido.').sendResponse(res);
    }

    if (!password) {
        return new AppError(400, 'MISSING_PASSWORD', 'A senha é obrigatória.').sendResponse(res);
    }

    if (password !== confirmPassword) {
        return new AppError(400, 'PASSWORD_MISMATCH', 'As senhas não coincidem.').sendResponse(res);
    }

    next();
};

const emailConfirmationValidatorMiddlware = (req: Request, res: Response, next: NextFunction) => {
    const { userId, code} = req.param;
    if (!userId){
        return new AppError(400, 'INVALID_REQUEST', 'Parâmetro ausente.').sendResponse(res);
    }
    if (!code) {
        return new AppError(400, 'INVALID_REQUEST', 'Parâmetro ausente.').sendResponse(res);
    }
    next();
}

export { registerValidatorMiddleware, loginValidatorMiddleware, emailConfirmationValidatorMiddlware };
