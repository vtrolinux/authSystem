import validator from 'validator';
import { Types } from 'mongoose';  // Para validar o ObjectId
import { AppError } from '../utils/AppError.ts';

/**
 * Função para sanitizar e validar o e-mail.
 * - Remove espaços extras.
 * - Verifica se é um e-mail válido.
 */
export const sanitizeEmail = (email: string): string => {
  const sanitizedEmail = email.trim().toLowerCase(); // Remove espaços e coloca em minúsculas

  if (!validator.isEmail(sanitizedEmail)) {
    throw new AppError(400, 'INVALID_PARAMETERS', 'O e-mail fornecido não é válido.');
  }

  return sanitizedEmail;
};

/**
 * Função para sanitizar a senha.
 * - Remove espaços desnecessários.
 * - Verifica se a senha atende a critérios básicos de segurança.
 */
export const sanitizePassword = (password: string): string => {
  const sanitizedPassword = password.trim(); // Remove espaços extras

  if (sanitizedPassword.length < 6) {
    throw new AppError(400, 'INVALID_PARAMETERS', 'A senha deve ter pelo menos 6 caracteres.');
  }

  if (!validator.isAlphanumeric(sanitizedPassword)) {
    throw new AppError(400, 'INVALID_PARAMETERS', 'A senha deve conter apenas caracteres alfanuméricos.');
  }

  return sanitizedPassword;
};

/**
 * Função para sanitizar o nome.
 * - Remove espaços extras.
 * - Garante que o nome tenha um tamanho adequado.
 */
export const sanitizeName = (name: string): string => {
  const sanitizedName = name.trim();

  if (sanitizedName.length < 3 || sanitizedName.length > 35) {
    throw new AppError(400, 'INVALID_PARAMETERS', 'O nome deve ter entre 3 e 35 caracteres.');
  }

  return sanitizedName;
};
/**
 * Função para sanitizar o userId. Verifica se é um ObjectId válido do MongoDB.
 */
export const sanitizeUserId = (userId: string): string => {
  if (!Types.ObjectId.isValid(userId)) {
    throw new AppError(400, 'INVALID_PARAMETERS', 'Parâmetros de usuário ou código ausentes');
  }

  return userId;  // Retorna o userId, já validado.
};

/**
 * Função para sanitizar o código de verificação. Verifica se é um código numérico de 6 dígitos.
 */
export const sanitizeCode = (code: string): string => {
  if (!/^\d{6}$/.test(code)) {
    throw new AppError(400, 'INVALID_PARAMETERS', 'O código de verificação deve ser numérico e ter exatamente 6 dígitos.');
  }

  return code;  // Retorna o código, já validado.
};