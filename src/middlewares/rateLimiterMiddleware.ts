import rateLimit from 'express-rate-limit';
import { logLimiter } from '../utils/ErrorLog.ts';
import { AppError } from '../utils/AppError.ts';

const rateLimiter = rateLimit({
    windowMs: 5 * 60 * 1000,  // 5 minutos
    max: 10,                    // Limita a 5 requisições por 5 minutos
    message: 'Muitas tentativas. Tente novamente mais tarde.',
    keyGenerator: (req) => req.ip,  // Usando o IP do cliente como chave
    handler: (req, res) => {
        return new AppError(429, 'INVALID_REQUEST', 'Você atingiu o limite de requisições. Tente novamente mais tarde.').sendResponse(res);
    },
});

// Limite para login: até 5 tentativas em 15 minutos
const loginRateLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,  // 15 minutos
    max: 5,                    // Limita a 5 requisições por 15 minutos
    message: 'Muitas tentativas de login. Tente novamente mais tarde.',
    keyGenerator: (req) => req.ip,  // Usando o IP do cliente
    handler: (req, res) => {
        return new AppError(429, 'INVALID_REQUEST', 'Muitas tentativas de login. Tente novamente mais tarde.').sendResponse(res);
    },
});

// Limite para registro de novo usuário: até 3 tentativas em 1 hora
const registerRateLimiter = rateLimit({
    windowMs: 60 * 60 * 1000,  // 1 hora
    max: 3,                    // Limita a 3 requisições por hora
    message: 'Muitas tentativas de registro. Tente novamente mais tarde.',
    keyGenerator: (req) => req.ip,  // Usando o IP do cliente
    handler: (req, res) => {
        return new AppError(429, 'INVALID_REQUEST', 'Muitas tentativas de registro. Tente novamente mais tarde.').sendResponse(res);
    },
});

// Limite para confirmação de e-mail: até 2 tentativas em 10 minutos
const confirmationRateLimiter = rateLimit({
    windowMs: 10 * 60 * 1000,  // 10 minutos
    max: 2,                    // Limita a 2 requisições por 10 minutos
    message: 'Muitas tentativas de confirmação. Tente novamente mais tarde.',
    keyGenerator: (req) => req.ip,  // Usando o IP do cliente
    handler: (req, res) => {
        // Gerar log com detalhes sobre a violação de limite
        const errorDetails = {
            ip: req.ip,  // IP do cliente
            path: req.originalUrl,  // Caminho da rota acessada
            method: req.method,  // Método HTTP (GET, POST, etc.)
            timestamp: new Date().toISOString(),  // Hora da requisição
            message: 'Limite de requisições atingido',
        };

        // Usando a função logLimiter para registrar o erro
        logLimiter(new Error('Limite de requisições atingido'), errorDetails);

        return new AppError(429, 'INVALID_REQUEST', 'Muitas tentativas de confirmação. Tente novamente mais tarde.').sendResponse(res);
        
    },
});

export { rateLimiter, loginRateLimiter, registerRateLimiter, confirmationRateLimiter };
