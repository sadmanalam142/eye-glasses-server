import { JwtPayload } from 'jsonwebtoken'
import { IProduct, IProductFilters } from './product.interface'
import { Product } from './product.model'
import { IPaginationOptions } from '../../../interfaces/pagination'
import { IGenericResponse } from '../../../interfaces/common'
import { productSearchableFields } from './product.constant'
import { paginationHelpers } from '../../../helpers/paginationHelpers'
import { SortOrder } from 'mongoose'
import { Request } from 'express'
import { IUploadFile } from '../../../interfaces/file'
import { fileUploadHelper } from '../../../helpers/fileUploadHelper'

const createProduct = async (
  req: Request,
  user: JwtPayload,
): Promise<IProduct | null> => {
  // console.log(req.body);

  const file = req.file as IUploadFile
  const uploadedImage = await fileUploadHelper.uploadToCloudinary(file)

  if (uploadedImage) {
    req.body.image = uploadedImage.secure_url
  }

  req.body.email = user?.email

  const indexes = await Product.collection.indexes()

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const emailIndex = indexes.find((index: any) => index.key.email === 1)

  if (emailIndex) {
    await Product.collection.dropIndex(emailIndex.name)
  }

  const createdProduct = await Product.create(req.body)

  return createdProduct
}

const getProductsByEmail = async (
  user: JwtPayload,
  filters: IProductFilters,
  paginationOptions: IPaginationOptions,
): Promise<IGenericResponse<IProduct[]>> => {
  const email = user?.email
  const { searchTerm, ...filtersData } = filters
  const andConditions = []
  if (searchTerm) {
    andConditions.push({
      $or: productSearchableFields.map(field => ({
        [field]: {
          $regex: searchTerm,
          $options: 'i',
        },
      })),
    })
  }
  if (email) {
    andConditions.push({ email })
  }
  if (Object.keys(filtersData).length) {
    andConditions.push({
      $and: Object.entries(filtersData).map(([field, value]) => ({
        [field]: value,
      })),
    })
  }
  const { page, limit, skip, sortBy, sortOrder } =
    paginationHelpers.calculatePagination(paginationOptions)
  const sortConditions: { [key: string]: SortOrder } = {}
  if (sortBy && sortOrder) {
    sortConditions[sortBy] = sortOrder
  }
  const whereConditions =
    andConditions.length > 0 ? { $and: andConditions } : {}
  const result = await Product.find(whereConditions)
    .sort(sortConditions)
    .skip(skip)
    .limit(limit)
  const total = await Product.countDocuments(whereConditions)
  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  }
}

const getSingleProduct = async (id: string): Promise<IProduct | null> => {
  const result = await Product.findById(id)

  return result
}

const getAllProducts = async (
  filters: IProductFilters,
  paginationOptions: IPaginationOptions,
): Promise<IGenericResponse<IProduct[]>> => {
  const { searchTerm, ...filtersData } = filters
  const andConditions = []
  if (searchTerm) {
    andConditions.push({
      $or: productSearchableFields.map(field => ({
        [field]: {
          $regex: searchTerm,
          $options: 'i',
        },
      })),
    })
  }
  if (Object.keys(filtersData).length) {
    andConditions.push({
      $and: Object.entries(filtersData).map(([field, value]) => ({
        [field]: value,
      })),
    })
  }
  const { page, limit, skip, sortBy, sortOrder } =
    paginationHelpers.calculatePagination(paginationOptions)
  const sortConditions: { [key: string]: SortOrder } = {}
  if (sortBy && sortOrder) {
    sortConditions[sortBy] = sortOrder
  }
  const whereConditions =
    andConditions.length > 0 ? { $and: andConditions } : {}
  const result = await Product.find(whereConditions)
    .sort(sortConditions)
    .skip(skip)
    .limit(limit)
  const total = await Product.countDocuments(whereConditions)
  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  }
}

const updateProduct = async (
  id: string,
  payload: Partial<IProduct>,
): Promise<IProduct | null> => {
  const result = await Product.findOneAndUpdate({ _id: id }, payload, {
    new: true,
  })
  return result
}

const deleteProduct = async (id: string): Promise<IProduct | null> => {
  const result = await Product.findByIdAndDelete(id)
  return result
}

export const ProductService = {
  createProduct,
  getSingleProduct,
  getProductsByEmail,
  getAllProducts,
  updateProduct,
  deleteProduct,
}
