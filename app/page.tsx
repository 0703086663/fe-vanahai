'use client'

import Image from 'next/image'
import Link from 'next/link'
import Header from './components/Header/Header'
import Footer from './components/Footer/Footer'
import { useEffect, useState } from 'react'
import { fetchPageContent, fetchPageImage } from './services/fetchData'
import {
  PageContentInterface,
  PageImageInterface,
} from './interfaces/interface'
import covertToHtmlWithAnimation from './utils/covertToHtmlWithAnimation'
import Skeleton from '@mui/material/Skeleton'
import 'react-quill/dist/quill.core.css'

export default function Home() {
  const [pageContentData, setPageContentData] = useState<
    PageContentInterface[]
  >([])
  const [pageImageData, setPageImageData] = useState<PageImageInterface[]>([])

  useEffect(() => {
    const fetchDataAndSetState = async () => {
      const resultPageContent: PageContentInterface[] = await fetchPageContent(
        'home-page'
      )
      setPageContentData(resultPageContent)

      const resultPageImage: PageImageInterface[] = await fetchPageImage(
        'home-page'
      )
      setPageImageData(resultPageImage)
    }

    fetchDataAndSetState()
  }, [])

  const heroBannerContent = pageContentData.find(
    (item) => item.slug === 'hero-banner'
  )
  const bodyRightContent = pageContentData.find(
    (item) => item.slug === 'body-right'
  )
  const mainContent = pageContentData.find(
    (item) => item.slug === 'main-content'
  )

  const heroBannerImage = pageImageData.find(
    (item) => item.slug === 'hero-banner'
  )
  const bodyLeftImage = pageImageData.find((item) => item.slug === 'body-left')
  const bodyRightImage = pageImageData.find(
    (item) => item.slug === 'body-right'
  )

  return (
    <>
      <Header hasBackground />
      <section className="relative">
        <Image
          src={heroBannerImage ? heroBannerImage.image : '/banner.jpg'}
          height={1584}
          width={700}
          alt=""
          priority
          className="w-full h-[700px] object-cover brightness-50 animate-image"
        />
        <div className="absolute top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%] ">
          <div className="select-none tracking-wide text-center">
            {covertToHtmlWithAnimation(
              heroBannerContent
                ? heroBannerContent!.content
                : '<span style="color:white; font-size: 24px" className"animate fadeIn-1">Welcome to Vanahai</span>'
            )}
          </div>
          <div className="flex justify-center pt-5 animate fadeIn-2">
            <Link href="/menu" draggable={false}>
              <button
                className="py-3 px-5 bg-[#2596BE] hover:brightness-90 active:scale-[98%] text-white rounded-md select-none"
                draggable={false}
              >
                Browse our drinks
              </button>
            </Link>
          </div>
        </div>
      </section>
      <div className="container mx-auto px-10 md:px-0 lg:px-10 2xl:px-28">
        <section className="relative py-10">
          <div className="flex justify-center lg:justify-between flex-wrap">
            <div>
              <Image
                src={bodyLeftImage ? bodyLeftImage.image : '/location/shop.jpg'}
                height={550}
                width={504}
                alt=""
                className="h-[550px] w-[504px] 
                  lg:h-[550px] lg:w-[404px] 
                  xl:h-[550px] xl:w-[504px] object-cover shadow-2xl rounded-md animate fadeIn-1"
              />
            </div>
            <div className="mt-16 lg:max-xl:mt-24">
              <Image
                src={
                  bodyRightImage ? bodyRightImage.image : '/location/shop1.jpg'
                }
                height={480}
                width={780}
                alt=""
                className="h-[550px] w-[calc(100vw-80px)] 
                  md:h-[400px] md:w-[680px] 
                  lg:h-[350px] lg:w-[500px]
                  xl:w-[680px] object-cover shadow-xl rounded-md animate fadeIn-1"
              />
              <div
                className="w-[calc(100vw-80px)] 
                  md:w-[680px] 
                  lg:w-[500px]
                  mt-4"
              >
                {bodyRightContent ? (
                  covertToHtmlWithAnimation(bodyRightContent.content)
                ) : (
                  <Skeleton animation="wave" width={'90%'} />
                )}
              </div>
            </div>
          </div>
        </section>
        <section className="pb-10 pt-4">
          <div className="[&>p]:py-4">
            {mainContent ? (
              covertToHtmlWithAnimation(mainContent!.content)
            ) : (
              <>
                <Skeleton animation="wave" height={40} width={'50%'} />
                <Skeleton animation="wave" width={'90%'} />
                <Skeleton animation="wave" height={20} />
                <Skeleton animation="wave" width={'60%'} />
                <br />
                <Skeleton animation="wave" height={40} width={'50%'} />
                <Skeleton animation="wave" width={'90%'} />
                <Skeleton animation="wave" height={20} />
                <Skeleton animation="wave" width={'60%'} />
              </>
            )}
          </div>
        </section>
      </div>
      <Footer />
    </>
  )
}
