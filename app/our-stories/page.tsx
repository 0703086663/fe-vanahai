'use client'

import React, { useEffect, useState } from 'react'
import Header from '../components/Header/Header'
import Footer from '../components/Footer/Footer'
import { PageContentInterface } from '../interfaces/interface'
import { fetchPageContent } from '../services/fetchData'
import Skeleton from '@mui/material/Skeleton'
import covertToHtmlWithAnimation from '../utils/covertToHtmlWithAnimation'
import 'react-quill/dist/quill.core.css'
import randomWidthSkeleton from '../utils/randomWidthSkeleton'

const Page = () => {
  const [pageContentData, setPageContentData] = useState<
    PageContentInterface[]
  >([])

  useEffect(() => {
    const fetchDataAndSetState = async () => {
      const resultPageContent: PageContentInterface[] = await fetchPageContent(
        'our-stories'
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
      <Header />
      <div className="container mx-auto px-10 pt-[140px] flex flex-col items-center min-h-[calc(100vh-200px)] md:min-h-[calc(100vh-100px)]">
        <section className="relative flex justify-center mb-8">
          <h1 className="text-3xl animate fadeIn-1">OUR STORIES</h1>
          <div className="absolute bg-[#2596BE] h-[2.5px] w-8 bottom-[-8px] animate fadeIn-2"></div>
        </section>
        <section className="relative flex justify-center max-w-[840px]">
          <div className="pl-4 text-center border-[2.5px] border-y-0 border-r-0 border-solid border-[#2596BE]">
            {covertToHtmlWithAnimation(quoteContent && quoteContent!.content)}
          </div>
        </section>
        <section className="max-w-[740px] min-w-[300px] md:min-w-[500px] pb-[40px] tracking-wide">
          {mainContent
            ? covertToHtmlWithAnimation(mainContent!.content)
            : Array.from({ length: 12 }).map((_, index) => (
                <div
                  key={index}
                  className={`select-none my-2 animate fadeIn-${index + 1}`}
                >
                  <Skeleton animation="wave" width={randomWidthSkeleton()} />
                </div>
              ))}
        </section>
      </div>
      <Footer />
    </>
  )
}

export default Page
