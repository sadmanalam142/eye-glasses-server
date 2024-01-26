import express from 'express'
import { UserRoutes } from '../modules/user/user.route'
import { AuthRoutes } from '../modules/auth/auth.route'
import { ProductRoutes } from '../modules/product/product.route'

const router = express.Router()

const moduleRoutes = [
  {
    path: '/users/',
    route: UserRoutes.router,
  },
  {
    path: '/auth/',
    route: AuthRoutes.router,
  },
  {
    path: '/product/',
    route: ProductRoutes.router,
  },
]

moduleRoutes.forEach(route => router.use(route.path, route.route))

export default router
