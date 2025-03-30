import validator from 'validator';

/**
 * Função para sanitizar e validar o e-mail.
 * - Remove espaços extras.
 * - Verifica se é um e-mail válido.
 */
export const sanitizeEmail = (email: string): string => {
  const sanitizedEmail = email.trim().toLowerCase(); // Remove espaços e coloca em minúsculas

  if (!validator.isEmail(sanitizedEmail)) {
    throw new Error('O e-mail fornecido não é válido.');
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
    throw new Error('A senha deve ter pelo menos 6 caracteres.');
  }

  if (!validator.isAlphanumeric(sanitizedPassword)) {
    throw new Error('A senha deve conter apenas caracteres alfanuméricos.');
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
    throw new Error('O nome deve ter entre 3 e 35 caracteres.');
  }

  return sanitizedName;
};
