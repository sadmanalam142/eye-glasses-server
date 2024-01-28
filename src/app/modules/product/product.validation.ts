import { z } from 'zod'
import { gender } from './product.constant'

const createProductZodSchema = z.object({
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
  gender: z.string({
    required_error: 'Gender is Required',
  }),
  color: z.string({
    required_error: 'Color is Required',
  }),
})

const updateProductZodSchema = z.object({
  body: z.object({
    name: z
      .string({
        required_error: 'Name is Required',
      })
      .optional(),
    price: z
      .string({
        required_error: 'Price is Required',
      })
      .optional(),
    quantity: z
      .string({
        required_error: 'Quantity is Required',
      })
      .optional(),
    frameMaterial: z
      .string({
        required_error: 'Frame Material is Required',
      })
      .optional(),
    frameShape: z
      .string({
        required_error: 'Frame Shape is Required',
      })
      .optional(),
    lensType: z
      .string({
        required_error: 'Lens Type is Required',
      })
      .optional(),
    brand: z
      .string({
        required_error: 'Brand is Required',
      })
      .optional(),
    gender: z.enum([...gender] as [string, ...string[]]).optional(),
    color: z
      .string({
        required_error: 'Color is Required',
      })
      .optional(),
  }),
})

export const ProductValidation = {
  createProductZodSchema,
  updateProductZodSchema,
}
