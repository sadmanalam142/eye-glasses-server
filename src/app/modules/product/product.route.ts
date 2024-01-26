import express from 'express'
import validateRequest from '../../middlewares/validateRequest'
import { ProductValidation } from './product.validation'
import { ProductController } from './product.controller'
import auth from '../../middlewares/auth'
import { ENUM_USER_ROLE } from '../../../enums/users'

const router = express.Router()

router.post(
  '/create-product',
  auth(ENUM_USER_ROLE.USER),
  validateRequest(ProductValidation.createProductZodSchema),
  ProductController.createProduct,
)

export const ProductRoutes = {
  router,
}
