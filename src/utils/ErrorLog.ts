import winston from 'winston';

const logger = winston.createLogger({
    level: 'info',
    format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.json()
    ),
    transports: [
        new winston.transports.Console(),
        new winston.transports.File({ filename: 'server.log' })
    ]
});

export function logError(error: any) {
    logger.error(error.message, { stack: error.stack, statusCode: error.statusCode });
}

// Função para logar erros de forma personalizada
export function logLimiter(error: any, details: any = {}) {
    // Log detalhado com informações adicionais
    logger.error(error.message, {
        stack: error.stack,
        statusCode: error.statusCode,
        ...details,  // Aqui você pode passar qualquer dado adicional, como o ip, path, etc.
    });
}
