'use client'

import Image from 'next/image'
import Link from 'next/link'
import Header from './components/Header/Header'
import Footer from './components/Footer/Footer'
import { useEffect, useState } from 'react'
import { fetchPageContent } from './services/fetchData'
import PageContentInterface from './interfaces/PageContentInterface'

export default function Home() {
  const [pageContentData, setPageContentData] = useState<
    PageContentInterface[]
  >([])

  useEffect(() => {
    const fetchDataAndSetState = async () => {
      const result: PageContentInterface[] = await fetchPageContent('home-page')
      setPageContentData(result)
      console.log(result)
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

  return (
    <>
      <Header hasBackground />
      <section className="relative">
        <Image
          src="/banner.jpg"
          height={1584}
          width={700}
          alt=""
          className="w-full h-[700px] object-cover brightness-50 animate-image"
        />
        <div className="absolute top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%] ">
          <div className="animate fadeIn-1">
            <h1 className="text-white text-center italic text-4xl select-none tracking-wide">
              {heroBannerContent
                ? heroBannerContent.content
                : 'Welcome to Vanahai'}
            </h1>
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
          I
        </div>
      </section>
      <div className="container mx-auto px-10 md:px-0 lg:px-10 2xl:px-28">
        <section className="relative py-10">
          <div className="flex justify-center lg:justify-between flex-wrap">
            <div className="">
              <Image
                src="/location/shop1.jpg"
                height={693}
                width={504}
                alt=""
                className="h-[550px] w-[504px] 
                  lg:h-[550px] lg:w-[404px] 
                  xl:h-[550px] xl:w-[504px] object-cover shadow-2xl rounded-md animate fadeIn-1"
              />
            </div>
            <div className="mt-16 lg:max-xl:mt-24">
              <Image
                src="/location/shop.jpg"
                height={480}
                width={780}
                alt=""
                className="h-[550px] w-[calc(100vw-80px)] 
                  md:h-[400px] md:w-[680px] 
                  lg:h-[300px] lg:w-[500px]
                  xl:w-[680px] object-cover shadow-xl rounded-md animate fadeIn-1"
              />
              <p
                className="w-[calc(100vw-80px)] 
                  md:w-[680px] 
                  lg:w-[500px]
                  text-sm tracking-wider mt-4 animate fadeIn-2"
              >
                {bodyRightContent
                  ? bodyRightContent.content
                  : 'Vanahai Bubble Tea'}
              </p>
            </div>
          </div>
        </section>
        <section className="pb-10 pt-4">
          <div className="tracking-wide leading-10">
            <div className="border-x-0 border-y-1 border-black border-solid">
              <h3 className="text-3xl text-[#2596BE] animate fadeIn-1 py-4">
                WHAT WE BELIEVE
              </h3>
            </div>
            <p className="py-4 animate fadeIn-2">
              We believe in produce. Tasty produce. Produce like:
            </p>
            <p className="py-4 animate fadeIn-3">
              Apples. Oranges. Limes. Lemons. Guavas. Carrots. Cucumbers.
              Jicamas. Cauliflowers. Brussels sprouts. Shallots. Japanese
              eggplants.
            </p>
            <p className="py-4 animate fadeIn-4">
              Asparagus. Artichokes—Jerusalem artichokes, too. Radishes.
              Broccoli. Baby broccoli. Broccolini. Bok choy. Scallions. Ginger.
              Cherries. Raspberries. Cilantro. Parsley. Dill.
            </p>
            <p className="py-4 animate fadeIn-5">What are we forgetting?</p>
            <p className="py-4 animate fadeIn-6">
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Vitae
              aut asperiores quibusdam, nam sunt ipsa distinctio necessitatibus
              quis at, doloremque facere quod. Repudiandae quos magni voluptates
              officiis temporibus blanditiis adipisci.
            </p>
            <p className="py-4 animate fadeIn-7">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempora
              nisi, maxime corrupti aut natus ipsam vitae corporis! Dicta, at
              fugit magni voluptatem odio iure, rem aliquid voluptatibus quas
              ullam laudantium!
            </p>
          </div>
        </section>
      </div>
      <Footer />
    </>
  )
}
