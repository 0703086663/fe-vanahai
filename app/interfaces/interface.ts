export interface Product {
  id: string
  price?: number
  name?: string
  image?: string
  isBestSeller?: boolean
  isDiscount?: boolean
  discountPrice?: number
  categoryId?: string
}

export interface PageImageInterface {
  id: string
  image: string
  page: string
  slug: string
}

export interface PageContentInterface {
  id: string
  content: string
  page: string
  slug: string
}

export interface CategoryInterface {
  id?: string
  name: string
  estName?: string
}

export interface ProductInterface {
  id: string
  name: string
  price: number
  image: string
  isBestSeller: boolean
  isDiscount: boolean
  discountPrice: number
  categoryId: string
}

export interface ContactInterface {
  id?: string
  name: string
  email: string
  subject: string
  message: string
  createdAt: string
}

export interface NewInterface {
  id?: string
  name: string
  image: string
  description?: string
  createdAt: string
}
