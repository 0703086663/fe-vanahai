import { Divider } from '@mui/material'
import React from 'react'
import Image from 'next/image'
import Footer from '../components/Footer/Footer'
const Page = () => {
  return (
    <>
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between">
          <div className="flex w-[500px] ">
            <div className=" text-black text-[64px] font-normal font-['Newsreader'] leading-[76.80px] ">
              <span>Our menu</span>
            </div>
            <div className="  text-black text-xl font-light  leading-relaxed flex items-end mb-[6px] ml-3">
              <span>— August 21, 2023</span>
            </div>
          </div>
          <div className="relative bg-white flex items-center">
            <div>
              <div className="px-4 py-[9.50px] space-x-2 bg-sky-500 rounded-[20px] justify-center items-center inline-flex">
                <div className="text-center text-white text-base font-semibold  leading-tight">
                  Default
                </div>
              </div>
              <div className="mx-3 px-4 py-[9.50px] space-x-2 bg-cyan-200 rounded-[20px] border border-stone-300 justify-center items-center inline-flex">
                <div className="text-center text-black text-base font-semibold  leading-tight">
                  A-Z
                </div>
              </div>
              <div className="px-4 py-[9.50px] space-x-2 bg-cyan-600 rounded-[20px] border border-stone-300 justify-center items-center inline-flex">
                <div className="text-center text-white text-base font-semibold  leading-tight">
                  List view
                </div>
              </div>
            </div>
          </div>
        </div>
        <Divider className="my-4" />
        <div className="flex">
          <div className="w-[270px] h-[704px] ">
            <div className=" text-black text-xl font-normal my-5">Milk Tea</div>
            <div className=" text-black text-xl font-normal my-5">Milk Tea</div>
          </div>
          <div>
            <Divider orientation="vertical" className="my-4 " />
          </div>
          <div className="mx-[50px] ">
            <div className="w-[213px] h-[63px] text-black text-5xl font-normal font-['GFS Didot'] leading-[62.40px] my-4">
              Milk Tea
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4  ">
              <div className="w-[270px] h-[270px] relative bg-stone-50 rounded-3xl shadow overflow-hidden">
                <img
                  className="w-[171px] h-[177px] left-[49px] top-[56px] absolute  object-contain"
                  src="/location/shop2.jpg"
                />
                <div className="w-[150.83px] h-[30px] left-[-31px] top-[55.51px] absolute origin-top-left rotate-[-33.19deg] bg-cyan-200 shadow">
                  thanh{' '}
                </div>
              </div>
              <div className="w-[270px] h-[270px] relative bg-stone-50 rounded-3xl shadow overflow-hidden">
                <img
                  className="w-[171px] h-[177px] left-[49px] top-[56px] absolute  object-cover"
                  src="/location/shop2.jpg"
                  alt="Placeholder"
                />
                <div className="w-[150.83px] h-[30px] left-[-31px] top-[55.51px] absolute origin-top-left rotate-[-33.19deg] bg-cyan-200 shadow">
                  thanh
                </div>
              </div>
              <div className="w-[270px] h-[270px] pl-[49px] pr-[50px] pt-14 pb-[37px] bg-stone-50 rounded-3xl shadow justify-center items-center inline-flex">
                <img
                  className="w-[177px] h-[177px]"
                  src="/location/shop2.jpg"
                />
              </div>
              <div className="w-[270px] h-[270px] pl-[49px] pr-[50px] pt-14 pb-[37px] bg-stone-50 rounded-3xl shadow justify-center items-center inline-flex">
                <img
                  className="w-[177px] h-[177px]"
                  src="/location/shop2.jpg"
                />
              </div>
              <div className="w-[270px] h-[270px] pl-[49px] pr-[50px] pt-14 pb-[37px] bg-stone-50 rounded-3xl shadow justify-center items-center inline-flex">
                <img
                  className="w-[177px] h-[177px]"
                  src="/location/shop2.jpg"
                />
              </div>
              <div className="w-[270px] h-[270px] pl-[49px] pr-[50px] pt-14 pb-[37px] bg-stone-50 rounded-3xl shadow justify-center items-center inline-flex">
                <img
                  className="w-[177px] h-[177px]"
                  src="/location/shop2.jpg"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
}

export default Page
