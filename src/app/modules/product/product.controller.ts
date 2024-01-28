import { Request, Response } from 'express'
import catchAsync from '../../../shared/catchAsync'
import sendResponse from '../../../shared/sendResponse'
import httpStatus from 'http-status'
import { ProductService } from './product.service'
import { IProduct } from './product.interface'
import pick from '../../../shared/pick'
import { productFilterableFields } from './product.constant'
import { paginationFields } from '../../../constants/pagination'

const createProduct = catchAsync(async (req: Request, res: Response) => {
  const user = req.user
  const result = await ProductService.createProduct(req, user)

  sendResponse<IProduct>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Product created successfully !',
    data: result,
  })
})

const getProductsByEmail = catchAsync(async (req: Request, res: Response) => {
  const user = req.user
  const filters = pick(req.query, productFilterableFields)
  const paginationOptions = pick(req.query, paginationFields)
  const result = await ProductService.getProductsByEmail(
    user,
    filters,
    paginationOptions,
  )
  sendResponse<IProduct[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Products retrieved successfully!',
    meta: result.meta,
    data: result.data,
  })
})

const getSingleProduct = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id
  const result = await ProductService.getSingleProduct(id)
  sendResponse<IProduct>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Product retrieved successfully!',
    data: result,
  })
})

const getAllProducts = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, productFilterableFields)
  const paginationOptions = pick(req.query, paginationFields)

  const result = await ProductService.getAllProducts(filters, paginationOptions)

  sendResponse<IProduct[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Products retrieved successfully!',
    meta: result.meta,
    data: result.data,
  })
})

const updateProduct = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id
  const updateData = req.body

  const result = await ProductService.updateProduct(id, updateData)

  sendResponse<IProduct>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Product updated successfully!',
    data: result,
  })
})

const deleteProduct = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id

  const result = await ProductService.deleteProduct(id)

  sendResponse<IProduct>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Product deleted successfully!',
    data: result,
  })
})

export const ProductController = {
  createProduct,
  getSingleProduct,
  getProductsByEmail,
  getAllProducts,
  updateProduct,
  deleteProduct,
}
