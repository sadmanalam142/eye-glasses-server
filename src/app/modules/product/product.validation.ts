import { z } from 'zod'
import { gender } from './product.constant'

const createProductZodSchema = z.object({
  body: z.object({
    name: z.string({
      required_error: 'Name is Required',
    }),
    price: z.string({
      required_error: 'Price is Required',
    }),
    quantity: z.string({
      required_error: 'Quantity is Required',
    }),
    frameMaterial: z.string({
      required_error: 'Frame Material is Required',
    }),
    frameShape: z.string({
      required_error: 'Frame Shape is Required',
    }),
    lensType: z.string({
      required_error: 'Lens Type is Required',
    }),
    brand: z.string({
      required_error: 'Brand is Required',
    }),
    gender: z.enum([...gender] as [string, ...string[]]),
    color: z.string({
      required_error: 'Color is Required',
    }),
    email: z.string().email().optional(),
  }),
})

export const ProductValidation = {
  createProductZodSchema,
}
