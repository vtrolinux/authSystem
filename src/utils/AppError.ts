import {type Response} from 'express';

export class AppError extends Error {
  statusCode: number;
  errorCode: string;

  constructor(statusCode: number, errorCode: string, message: string) {
    super(message);
    this.statusCode = statusCode;
    this.errorCode = errorCode;
    Error.captureStackTrace(this, this.constructor);
  }

  // Função para enviar a resposta de erro personalizada
  sendResponse(res: Response): Response {
    return res.status(this.statusCode).json({
      error: {
        code: this.errorCode,
        message: this.message,
      }
    });
  }
}
