import config from '../../../config'
import { IUser } from './user.interface'
import { User } from './user.model'
import bcrypt from 'bcrypt'

const createUser = async (
  password: string,
  user: IUser,
): Promise<IUser | null> => {
  user.password = await bcrypt.hash(password, Number(config.bcrypt_salt_rounds))

  const createUser = await User.create(user)

  return createUser
}

export const UserService = {
  createUser,
}
