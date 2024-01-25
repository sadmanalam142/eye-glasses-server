import { Schema, model } from 'mongoose'
import { IUser, UserModel } from './user.interface'

const userSchema = new Schema<IUser, UserModel>({
  name: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    default: 'user',
  },
  email: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    unique: true,
    required: true,
  },
})

export const User = model<IUser, UserModel>('User', userSchema)
