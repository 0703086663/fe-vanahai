import {
  CategoryInterface,
  ContactInterface,
  ProductInterface,
} from './../interfaces/interface'
import {
  PageContentInterface,
  PageImageInterface,
} from '../interfaces/interface'

export const fetchPageContent = async (page: string) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_LINK}/page-content`
    )
    const data: PageContentInterface[] = await response.json()
    return data.filter((item: PageContentInterface) => item.page === page)
  } catch (error) {
    console.error('Error fetching data:', error)
    throw error
  }
}

export const fetchPageImage = async (page: string) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_LINK}/page-image`
    )
    const data: PageImageInterface[] = await response.json()
    return data.filter((item: PageImageInterface) => item.page === page)
  } catch (error) {
    console.error('Error fetching data:', error)
    throw error
  }
}

export const fetchCategory = async () => {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_LINK}/category`)
    const data: CategoryInterface[] = await response.json()
    return data
  } catch (error) {
    console.error('Error fetching data:', error)
    throw error
  }
}

export const fetchProduct = async () => {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_LINK}/product`)
    const data: ProductInterface[] = await response.json()
    return data
  } catch (error) {
    console.error('Error fetching data:', error)
    throw error
  }
}

export const fetchProductById = async (productId: string) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_LINK}/product/${productId}`
    )
    const data: ProductInterface[] = await response.json()
    return data
  } catch (error) {
    console.error('Error fetching data:', error)
    throw error
  }
}

// export const fetchProductByCategoryId = async (categoryId: string) => {
//   try {
//     const response = await fetch(`${process.env.NEXT_PUBLIC_API_LINK}/product`)
//     const data: ProductInterface[] = await response.json()
//     return data
//   } catch (error) {
//     console.error('Error fetching data:', error)
//     throw error
//   }
// }

export const fetchContact = async () => {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_LINK}/contact`)
    const data: ContactInterface[] = await response.json()
    return data
  } catch (error) {
    console.error('Error fetching data:', error)
    throw error
  }
}

export const fetchContactById = async (contactId: string) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_LINK}/contact/${contactId}`
    )
    const data: ContactInterface[] = await response.json()
    return data
  } catch (error) {
    console.error('Error fetching data:', error)
    throw error
  }
}
