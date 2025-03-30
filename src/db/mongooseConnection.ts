import mongoose from 'mongoose';
import dotenv from 'dotenv';

// Carregar as variáveis de ambiente
dotenv.config();

// Função principal para conectar ao MongoDB
async function main(): Promise<void> {

  const uri = `mongodb://${process.env.MONGO_INITDB_ROOT_USERNAME}:${process.env.MONGO_INITDB_ROOT_PASSWORD}@${process.env.MONGO_DB_ADDRESS}:${process.env.MONGO_DB_PORT}/${process.env.MONGO_INITDB_DATABASE}?authSource=admin`;
  
  const options: mongoose.ConnectOptions = {
    family: 4, // Use IPv4, skip trying IPv6
    //serverSelectionTimeoutMS: 5000,
    //autoIndex: false, // Don't build indexes
    //maxPoolSize: 10, // Maintain up to 10 socket connections
    //serverSelectionTimeoutMS: 5000, // Keep trying to send operations for 5 seconds
    //socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity  
  };

  try {
    await mongoose.connect(uri, options);
    console.log('✅ :mongoose conectado!');
  } catch (err) {
    console.log('❌ :Erro ao conectar no banco: ' + err);
    throw new Error('Erro ao conectar ao banco de dados');
  }
}
// Executar a função main
main().catch((err) => {
  console.log('Erro ao executar a função principal: ' + err);
});

// Exportar o mongoose para uso em outros módulos
export default mongoose;