import bcrypt from 'bcrypt';
import crypto from 'crypto';
import User from '../models/user.ts';
import createToken from '../helpers/tokenJWT.ts';  // Supondo que você tenha um helper para criar o token
import { AppError } from '../utils/AppError.ts';  // Classe de erro personalizada
import { sendVerificationCode } from '../helpers/mailer.ts'; // Importar função para envio de e-mail
import { storeVerificationCode, getVerificationCode, deleteVerificationCode } from '../db/redisConnection.ts';
import { Types } from 'mongoose';

class AuthService {
    // Função de login
    async login(email: string, password: string): Promise<{ token: string, userId: string }> {
        const user = await User.findOne({ email });

        if (!user) {
            throw new AppError(422, 'EMAIL_NOT_FOUND', 'Usuário não encontrado com esse e-mail.');
        }

        if (user.isEmailVerified == false) {
            throw new AppError(422, 'UNCONFIRMED_EMAIL', 'Confirme seu email para fazer login.');
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            throw new AppError(422, 'INVALID_PASSWORD', 'Senha inválida.');
        }
        
        // Criação do token
        const { token, userId } = await createToken({
            _id: user._id.toString(),  // Convertendo ObjectId para string
            name: user.name
        });
        return { token, userId };
    }

    // Função de registro
    async register(name: string, email: string, password: string, confirmPassword: string): Promise< void > {
        
        const existingUser = await User.findOne({ email });
        
        if (existingUser) {
            throw new AppError(422, 'EMAIL_EXISTS', 'O e-mail informado já está em uso.');
        }

        const salt = await bcrypt.genSalt(12);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new User({
            name,
            email,
            password: hashedPassword,
            isEmailVerified: false, // Adiciona flag de email não verificado
            //verificationCode: crypto.randomBytes(3).toString('hex'), // Gera código de verificação
            //verificationCodeExpiry: Date.now() + 15 * 60 * 1000, // Expira em 15 minutos
        });
        try {
            const savedUser = await newUser.save(); // Salva o usuário
        
            // Gerar um código de verificação aleatório
            const verificationCode = Math.floor(100000 + Math.random() * 900000).toString(); // Código de 6 dígitos
            console.log(verificationCode)

            // Convertendo o ObjectId para binário(o redis não armazena ObjectId)
            const binaryId = Buffer.from(savedUser._id.toHexString(), 'hex'); // Converte o ObjectId para Buffer(binário 12 bytes)
            console.log(binaryId);
            // Armazenar o código no Redis com expiração de 5 minutos
            await storeVerificationCode(binaryId, verificationCode);  
            
            // Enviar o código de verificação por e-mail
            await sendVerificationCode(email,savedUser._id.toString(), verificationCode);

            // Converte a string hexadecimal de volta para o ObjectId
            // const hexString = binaryId.toString('hex');
            // const originalId = new Object(hexString);
            // console.log(originalId)

          } catch (err) {
            throw new AppError(500, 'USER_CREATION_FAILED', 'Erro ao criar usuário.');
        }
    }

    async emailConfirmationCode(userId: string, code: string): Promise<boolean> {

        const binaryId = Buffer.from(userId, 'hex');
        console.log('id: ', binaryId )
        const storedCode = await getVerificationCode(binaryId);
        
        if (!storedCode) {
            throw new AppError(400, 'CODE_EXPIRED', 'O código de verificação expirou.');
        }

        if (storedCode !== code) {
            throw new AppError(400, 'INVALID_CODE', 'Código de verificação inválido.');
        }

        if(code == storedCode) {
            // Converte o Buffer de volta para ObjectId
            const objectId = new Types.ObjectId(binaryId);  // Converte para ObjectId
            console.log('Os códigos conferem. Persistindo a verificação no mongoDB.');
            await User.updateOne(
                { _id: objectId },  // Encontra o usuário pelo ID
                { $set: { isEmailVerified: true } }  // Atualiza o campo isEmailVerified
            );           
        }

        // Se o código for correto, podemos remover o código do Redis
        await deleteVerificationCode(binaryId);

        return true; // O código é válido
    }
}

export default new AuthService();
