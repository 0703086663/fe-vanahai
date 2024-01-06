'use client'

import React, { useEffect, useState } from 'react'
import Header from '../components/Header/Header'
import Footer from '../components/Footer/Footer'
import { PageContentInterface } from '../interfaces/interface'
import { fetchPageContent } from '../services/fetchData'
import covertToHtmlWithAnimation from '../utils/covertToHtmlWithAnimation'

const Page = () => {
  const [pageContentData, setPageContentData] = useState<
    PageContentInterface[]
  >([])

  useEffect(() => {
    const fetchDataAndSetState = async () => {
      const resultPageContent: PageContentInterface[] = await fetchPageContent(
        'about-us'
      )
      setPageContentData(resultPageContent)
    }

    fetchDataAndSetState()
  }, [])

  const quoteContent = pageContentData.find((item) => item.slug === 'quote')
  const mainContent = pageContentData.find(
    (item) => item.slug === 'main-content'
  )

  return (
    <>
      <Header hasBackground={false} />
      <section className="container mx-auto px-10 pt-[140px] flex flex-col items-center ql-editor">
        <div className="relative flex justify-center">
          <h1 className="text-3xl pb-[40px] animate fadeIn-1">ABOUT US</h1>
          <div className="absolute bg-[#2596BE] h-[2.5px] w-8 top-1/2 animate fadeIn-2"></div>
        </div>
        <div className="relative flex justify-center">
          <div className="pl-4 text-center border-[2.5px] border-y-0 border-r-0 border-solid border-[#2596BE]">
            {covertToHtmlWithAnimation(quoteContent && quoteContent!.content)}
          </div>
        </div>
        <div className="max-w-[740px] py-[40px] tracking-wide">
          {covertToHtmlWithAnimation(mainContent ? mainContent!.content : '')}
        </div>
      </section>
      <Footer />
    </>
  )
}

export default Page
