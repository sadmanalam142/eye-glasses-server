import { Model } from 'mongoose'

export type IUser = {
  name: string
  role: string
  email: string
  password: string
  passwordChangedAt?: Date
}

export type UserModel = Model<IUser>
