import { Request, Response } from 'express'
import catchAsync from '../../../shared/catchAsync'
import sendResponse from '../../../shared/sendResponse'
import httpStatus from 'http-status'
import { ProductService } from './product.service'
import { IProduct } from './product.interface'

const createProduct = catchAsync(async (req: Request, res: Response) => {
  const user = req.user
  const { ...productData } = req.body
  const result = await ProductService.createProduct(user, productData)

  sendResponse<IProduct>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Product created successfully !',
    data: result,
  })
})

export const ProductController = {
  createProduct,
}
