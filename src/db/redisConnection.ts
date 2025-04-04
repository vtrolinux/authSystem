import { createClient } from 'redis';

// Configuração do cliente Redis
const client = createClient({
    url: `redis://localhost:6379`   
});

// Conectar ao Redis ao importar o módulo
client.connect().then(() => {
    console.log('✅ :redis conectado!');
}).catch((err) => {
    console.error('❌ :Erro ao conectar ao Redis:', err);
});

client.on('error', (err) => {
    console.error('Erro ao conectar no Redis: ', err);
});

export default client;
