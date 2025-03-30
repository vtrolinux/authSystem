import {type Request, type Response} from 'express';
import { sanitizeEmail, sanitizePassword, sanitizeName } from '../sanitization/AuthSanitizer.ts';  // Importando o arquivo de sanitização
import AuthService from '../services/AuthService.ts';
import { AppError } from '../utils/AppError.ts';

class AuthController {
  
  // Função de login
  async login(req: Request, res: Response): Promise<Response> {
    try {
      let { email, password }: { email: string, password: string } = req.body;

      // Sanitização das entradas
      email = sanitizeEmail(email);
      password = sanitizePassword(password);

      const { token, userId } = await AuthService.login(email, password);

      return res.json({ message: 'Login bem-sucedido!', token, userId });
    } catch (err) {
      if (err instanceof AppError) {
        return err.sendResponse(res);  // Envia a resposta de erro com o código e mensagem
      }
      return new AppError(500, 'FAILED_OPERATION', 'Erro interno no servidor').sendResponse(res);
    }
  }

  // Função de registro
  async register(req: Request, res: Response): Promise<Response> {
    try {
      let { name, email, password, confirmPassword }: { name: string, email: string, password: string, confirmPassword: string } = req.body;
      
      // Sanitização das entradas
      name = sanitizeName(name);
      email = sanitizeEmail(email);
      password = sanitizePassword(password);

      await AuthService.register(name, email, password, confirmPassword);

      return res.json({ message: 'Cadastro bem-sucedido, você receberá um código de confirmação em seu email!'});
    } catch (err) {
      if (err) {
        return err.sendResponse(res);  // Envia a resposta de erro com o código e mensagem(tratada no Service)
      }
      return new AppError(500, 'FAILED_OPERATION', 'Erro interno no servidor').sendResponse(res);
    }
  }

  async emailConfirmation(req: Request, res: Response): Promise<Response> {
    try {
      // Acessando os parâmetros da URL via req.query
      const { userId, code } = req.query;
      console.log('params controller: %s %s', userId, code)
      // Garantir que o userId e o code estão presentes na URL
      if (!userId || !code) {
          throw new AppError(400, 'INVALID_PARAMETERS', 'Parâmetros de usuário ou código ausentes');
      }

      // Verificação do código
      await AuthService.emailConfirmationCode(userId, code);

      return res.json({ message: 'E-mail verificado com sucesso! Agora você pode fazer login.' });
    } catch (err) {
      if (err instanceof AppError) {
        return new AppError(400, 'FAILED_OPERATION', err.message).sendResponse(res);
      }
      return new AppError(500, 'FAILED_OPERATION', 'Erro interno no servidor').sendResponse(res);
    }
  }

}

export default new AuthController();
