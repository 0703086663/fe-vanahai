import React from 'react'
import Header from '../components/Header/Header'
import Footer from '../components/Footer/Footer'
import Image from 'next/image'
import { Divider } from '@mui/material'
import Link from 'next/link'

const Page = () => {
  return (
    <>
      <Header />
      <div className="container mx-auto px-10 py-[140px] flex flex-col items-center min-h-[calc(100vh-200px)] md:min-h-[calc(100vh-100px)]">
        <section className="relative flex justify-center mb-8">
          <h1 className="text-3xl animate fadeIn-1">NEWS</h1>
          <div className="absolute bg-[#2596BE] h-[2.5px] w-8 bottom-[-8px] animate fadeIn-2"></div>
        </section>
        <section className="flex flex-col items-center justify-center">
          <h1 className="text-3xl text-center font-semibold leading-10 tracking-wide">
            Brand new spot in Malaysia - Welcome to join us in Johor Bahru!
          </h1>
          <h6 className="text-md text-center text-[#2596BE] tracking-wide">
            2019.09.01
          </h6>
          <div className="">
            <Image
              src="/location/shop.jpg"
              height={550}
              width={504}
              alt="Name news"
              className="h-[550px] w-[504px] 
              lg:h-[550px] lg:w-[404px] 
              xl:h-[550px] xl:w-[504px] object-contain"
            />
          </div>
        </section>
        <Divider />
        <section>
          <h1 className="text-3xl text-center font-semibold leading-10 tracking-wide py-10">
            Related News
          </h1>

          <div className="relative w-full">
            <Link href="#!" className="w-full">
              <Image
                src="/location/shop.jpg"
                height={300}
                width={504}
                alt="Name news"
                className="h-[300px] w-full object-cover hover:shadow-2xl"
              />
            </Link>
          </div>
        </section>
      </div>
      <Footer />
    </>
  )
}

export default Page
