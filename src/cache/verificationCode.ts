import client from '../db/redisConnection.ts'; // Importando o cliente Redis
import { AppError } from '../utils/AppError.ts';

// Função para armazenar um código de verificação no Redis com expiração
export const storeVerificationCode = async (binaryId: Buffer, code: string): Promise<void> => {
    const key = `verification_code:${binaryId}`; // Chave única para cada usuário (usando o e-mail como chave)
    
    try {
        // Armazenando o código no Redis com um tempo de expiração de 5 minutos (300 segundos)
        client.setEx(key, 300, code);
    } catch (err) {
        throw new AppError(500, 'REDIS_ERROR', 'Erro ao armazenar código de verificação no Redis.');
    }
};

// Função para obter um código de verificação armazenado no Redis
export const getVerificationCode = async (binaryId: Buffer): Promise<string | null> => {
    const key = `verification_code:${binaryId}`;

    try {
        // Usando o método get como uma Promise
        const reply = await client.get(key);
        return reply;  // Pode ser null caso o código tenha expirado
    } catch (err) {
        throw new AppError(500, 'REDIS_ERROR', 'Erro ao recuperar código de verificação do Redis.');
    }
};

// Função para deletar o código do Redis (por exemplo, após a verificação bem-sucedida)
export const deleteVerificationCode = async (binaryId: Buffer): Promise<void> => {
    const key = `verification_code:${binaryId}`;

    try {
        client.del(key);
    } catch (err) {
        throw new AppError(500, 'REDIS_ERROR', 'Erro ao deletar código de verificação no Redis.');
    }
};
