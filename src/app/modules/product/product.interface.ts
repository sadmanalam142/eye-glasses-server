import { Model } from 'mongoose'

export type IProduct = {
  name: string
  image: string
  price: string
  quantity: string
  frameMaterial: string
  frameShape: string
  lensType: string
  brand: string
  gender: 'Male' | 'Female' | 'Unisex'
  color: string
  email: string
}

export type ProductModel = Model<IProduct>

export type IProductFilters = {
  searchTerm?: string
  frameMaterial?: string
  frameShape?: string
  lensType?: string
  brand?: string
  gender?: 'Male' | 'Female' | 'Unisex'
  color?: string
}
