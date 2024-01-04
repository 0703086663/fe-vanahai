import {
  PageContentInterface,
  PageImageInterface,
} from '../interfaces/interface'

export const fetchPageContent = async (page: string) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_LINK}/page-content`
    )
    const data = await response.json()
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
    const data = await response.json()
    return data.filter((item: PageImageInterface) => item.page === page)
  } catch (error) {
    console.error('Error fetching data:', error)
    throw error
  }
}
