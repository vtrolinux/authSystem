// src/helpers/mailer.ts

import nodemailer from 'nodemailer';
import { AppError } from '../utils/AppError.ts';  // Classe de erro personalizada

// Criando uma instância do transporte para envio de e-mail
const transporter = nodemailer.createTransport({
    service: 'gmail', // Ou outro serviço de sua preferência
    auth: {
        user: process.env.MAILER_EMAIL_USER,  // Substitua pelo seu e-mail
        pass: process.env.MAILER_EMAIL_PASSWORD,   // Substitua pela sua senha
    },
});

// Função para enviar código de verificação
export const sendVerificationCode = async (email: string,userId: string, code: string): Promise<void> => {

    const url = `http://localhost:3000/api/auth/confirmation-code?userId=${userId}&code=${code}`;

    const mailOptions = {
        from: process.env.MAILER_EMAIL_USER,
        to: email,
        subject: 'Código de Verificação',
        text: `Seu código de verificação é: ${code}. Ele expirará em 5 minutos.\nClique no link para confirmar: ${url}`,      
    };

    try {
        await transporter.sendMail(mailOptions);
    } catch (error) {
        throw new AppError(500, 'EMAIL_SEND_FAILED', 'Falha ao enviar o código de verificação.');
    }
};
