import express,{ type Request, type Response} from 'express'; // Importação padrão do express para evitar o problema de módulos CommonJS
import cors from 'cors';
import dotenv from 'dotenv';
import AuthRouter from './routes/AuthRoute.ts';
import errorMiddleware from './middlewares/errorMiddleware.ts';  // Importando o middleware de erro


// Configuração de ambiente
dotenv.config();

// Definindo a porta a partir do arquivo .env
const port = process.env.EXPRESS_PORT;

// Inicializando o app Express
const app = express();

// Middleware
app.use(cors());
app.use(express.json());
// Configuração do CORS
app.use(cors({
    origin: process.env.CORS_DOMAIN // Permite solicitações apenas do domínio configurado
}));


// Roteadores da API
app.use('/api/auth', AuthRouter);

// Rota principal
app.get('/', (req: Request, res: Response): void => {
    //throw new Error('Erro inesperado');
    res.json({ message: 'ok' });  // Retorna um JSON simples
});

// Middleware de erro (deve ser sempre o último): envia uma resposta generica para erros nao previstos
app.use(errorMiddleware);

// Iniciando o servidor
app.listen(port, () => {
    console.log(`💻 :SERVIDOR SENDO EXECUTADO NA PORTA: ${port}`);
});
