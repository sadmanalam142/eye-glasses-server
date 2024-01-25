import { Request, Response } from 'express'
import { UserService } from './user.service'
import catchAsync from '../../../shared/catchAsync'
import sendResponse from '../../../shared/sendResponse'
import httpStatus from 'http-status'
import { IUser } from './user.interface'

const createUser = catchAsync(async (req: Request, res: Response) => {
  const { password, ...user } = req.body
  const result = await UserService.createUser(password, user)

  sendResponse<IUser>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User created successfully !',
    data: result,
  })
})

export const UserController = {
  createUser,
}
