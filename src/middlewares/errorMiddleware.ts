import { type Request, type Response, type NextFunction } from 'express'; 
import { AppError } from '../utils/AppError.ts';
import { logError } from '../utils/ErrorLog.ts';  // Importando a função logError

const errorMiddleware = (err: Error, req: Request, res: Response, next: NextFunction) => {
  // Se o erro for uma instância do AppError, envia a resposta customizada
  if (err instanceof AppError) {
    // Logando o erro
    logError(err);

    return res.status(err.statusCode).json({
      status: 'error',
      message: err.message,
    });
  }

  // Caso o erro não seja uma instância de AppError, tratamos como erro genérico
  logError(err);  // Logando o erro genérico

  // Se for um erro genérico ou desconhecido
  return res.status(500).json({
    status: 'error',
    message: 'Erro interno no servidor.',
  });
};

export default errorMiddleware;