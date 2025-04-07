import { Kafka } from 'kafkajs';

// Configuração do Kafka
const kafka = new Kafka({
    clientId: 'user-verification-service',  // Nome do cliente Kafka
    brokers: ['localhost:9093'],  // Endereço do broker Kafka, substitua conforme necessário
});

export const producer = kafka.producer();  // Criando o produtor para enviar mensagens