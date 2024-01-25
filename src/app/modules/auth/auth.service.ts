import httpStatus from 'http-status'
import ApiError from '../../../errors/ApiError'
import { User } from '../user/user.model'
import {
  IChangePassword,
  ILoginUser,
  ILoginUserResponse,
  IRefreshTokenResponse,
} from './auth.interface'
import config from '../../../config'
import { JwtPayload, Secret } from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import { jwtHelper } from '../../../helpers/jwtHelpers'

const loginUser = async (payload: ILoginUser): Promise<ILoginUserResponse> => {
  const { email, password } = payload
  const isUserExist = await User.findOne({ email })

  if (!isUserExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User does not exist')
  }

  const isPasswordMatched = await bcrypt.compare(
    password,
    isUserExist?.password,
  )

  if (!isPasswordMatched) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Password is incorrect')
  }

  const accessToken = jwtHelper.createToken(
    { email: isUserExist?.email, role: isUserExist?.role },
    config.jwt.jwt_secret as Secret,
    config.jwt.jwt_expires_in as string,
  )

  const refreshToken = jwtHelper.createToken(
    { email: isUserExist?.email, role: isUserExist?.role },
    config.jwt.jwt_refresh_secret as Secret,
    config.jwt.jwt_refresh_expires_in as string,
  )

  return {
    accessToken,
    refreshToken,
  }
}

const refreshToken = async (token: string): Promise<IRefreshTokenResponse> => {
  let verifiedToken = null
  try {
    verifiedToken = jwtHelper.verifyToken(
      token,
      config.jwt.jwt_refresh_secret as Secret,
    )
  } catch (err) {
    throw new ApiError(httpStatus.FORBIDDEN, 'Invalid Refresh Token')
  }

  const { email } = verifiedToken

  const isUserExist = await User.findOne({ email })

  if (!isUserExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User does not exist')
  }

  const newAccessToken = jwtHelper.createToken(
    { email: isUserExist?.email, role: isUserExist?.role },
    config.jwt.jwt_secret as Secret,
    config.jwt.jwt_expires_in as string,
  )

  return {
    accessToken: newAccessToken,
  }
}

const changePassword = async (
  user: JwtPayload,
  payload: IChangePassword,
): Promise<void> => {
  const { oldPassword, newPassword } = payload
  const isUserExist = await User.findOne({ email: user.email })

  if (!isUserExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User does not exist')
  }

  const isPasswordMatched = await bcrypt.compare(
    oldPassword,
    isUserExist?.password,
  )

  if (!isPasswordMatched) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Old password is incorrect')
  }

  const newHashedPassword = await bcrypt.hash(
    newPassword,
    Number(config.bcrypt_salt_rounds),
  )

  const query = { email: user?.email }
  const updatedData = {
    password: newHashedPassword,
    passwordChangedAt: new Date(),
  }

  await User.findOneAndUpdate(query, updatedData)
}

export const AuthService = {
  loginUser,
  refreshToken,
  changePassword,
}
