import PageContentInterface from '../interfaces/PageContentInterface'

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
