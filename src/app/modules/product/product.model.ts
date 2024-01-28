import { Schema, model } from 'mongoose'
import { IProduct, ProductModel } from './product.interface'
import { gender } from './product.constant'

const productSchema = new Schema<IProduct, ProductModel>(
  {
    name: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    price: {
      type: String,
      required: true,
    },
    quantity: {
      type: String,
      required: true,
    },
    frameMaterial: {
      type: String,
      required: true,
    },
    frameShape: {
      type: String,
      required: true,
    },
    lensType: {
      type: String,
      required: true,
    },
    brand: {
      type: String,
      required: true,
    },
    gender: {
      type: String,
      enum: gender,
    },
    color: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  },
)

export const Product = model<IProduct, ProductModel>('Product', productSchema)
