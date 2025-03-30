import mongoose from '../db/mongooseConnection.ts';
import { Document, Types } from 'mongoose';

// Definição da interface IUser
export interface IUser extends Document {  
  _id: Types.ObjectId;
  name: string;
  email: string;
  password: string;
  role: string;
  isEmailVerified: boolean;
  dataReg?: Date;
  photoProfile?: string;
  twoFactorsEnable?: boolean;
  contaDesativada?: boolean;
}

// Definição do esquema do usuário
const userSchema = new mongoose.Schema<IUser>({
  name: {
    type: String,
    required: true,
    trim: true,
    minlength: 3,
    maxlength: 35
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
    match: [
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      'Please add a valid email address.'
    ]
  },
  password: { type: String, required: true },
  role: {
    type: String,
    default: 'user'
  },
  isEmailVerified: {
    type: Boolean,
    default: false
  },
  dataReg: { type: Date },
  photoProfile: { type: String },
  twoFactorsEnable: { type: Boolean },
  contaDesativada: { type: Boolean }
});

// Criação do modelo User com o esquema
const User = mongoose.model<IUser>('User', userSchema);

export default User;
