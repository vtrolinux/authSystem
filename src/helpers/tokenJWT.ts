import jwt from 'jsonwebtoken';

// Definindo a interface IUser com os campos mínimos necessários
interface IUser {
  _id: string;  // Vamos passar o _id como string para o JWT
  name: string;
}

const createToken = async (user: IUser) => {
  // Gerando o token com apenas o id e name
  const token = jwt.sign(
    {
      id: user._id.toString(),  // Apenas o _id é necessário aqui para o JWT
      name: user.name,  // Enviando o nome no payload (opcional, pode ser removido se não precisar)
    },
    process.env.JWT_SECRET as string,  // Segredo para criar o token
    { expiresIn: '1h' } // Opcional: tempo de expiração do token
  );

  return { token, userId: user._id }; // Retorna o token e o userId (que é o _id)
};

export default createToken;
