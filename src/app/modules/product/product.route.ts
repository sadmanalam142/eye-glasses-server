import express, { NextFunction, Request, Response } from 'express'
import validateRequest from '../../middlewares/validateRequest'
import { ProductValidation } from './product.validation'
import { ProductController } from './product.controller'
import auth from '../../middlewares/auth'
import { ENUM_USER_ROLE } from '../../../enums/users'
import { fileUploadHelper } from '../../../helpers/fileUploadHelper'

const router = express.Router()

router.post(
  '/create-product',
  auth(ENUM_USER_ROLE.USER),
  fileUploadHelper.upload.single('file'),
  (req: Request, res: Response, next: NextFunction) => {
    req.body = ProductValidation.createProductZodSchema.parse(
      JSON.parse(req.body.data),
    )
    console.log(req.body)
    return ProductController.createProduct(req, res, next)
  },
)

router.get(
  '/get-product-by-email',
  auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.USER),
  ProductController.getProductsByEmail,
)
router.get(
  '/:id',
  auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.USER),
  ProductController.getSingleProduct,
)
router.get(
  '/',
  auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.USER),
  ProductController.getAllProducts,
)

router.patch(
  '/:id',
  auth(ENUM_USER_ROLE.USER),
  validateRequest(ProductValidation.updateProductZodSchema),
  ProductController.updateProduct,
)

router.delete(
  '/:id',
  auth(ENUM_USER_ROLE.USER),
  ProductController.deleteProduct,
)

export const ProductRoutes = {
  router,
}
