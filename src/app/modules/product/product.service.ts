import { JwtPayload } from 'jsonwebtoken'
import { IProduct } from './product.interface'
import { Product } from './product.model'

const createProduct = async (
  user: JwtPayload,
  payload: IProduct,
): Promise<IProduct | null> => {
  payload.email = user?.email

  const createProduct = await Product.create(payload)

  return createProduct
}

export const ProductService = {
  createProduct,
}
