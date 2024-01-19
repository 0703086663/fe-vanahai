'use client'

import React from 'react'
import Header from '../components/Header/Header'
import Footer from '../components/Footer/Footer'
import Map from '../components/Map/Map'
import Image from 'next/image'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Pagination, Autoplay, Navigation } from 'swiper/modules'
import { Divider, IconButton, Tooltip } from '@mui/material'
import {
  FacebookOutlined,
  InsertLinkOutlined,
  Instagram,
  MessageOutlined,
} from '@mui/icons-material'
import CheckIcon from '@mui/icons-material/Check'

import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/navigation'
import './styles.css'

const Page = () => {
  return (
    <>
      <Header />
      <div className="container mx-auto px-10 pt-[140px] flex flex-col items-center min-h-[calc(100vh-100px)]">
        <section className="relative flex justify-center mb-8">
          <h1 className="text-3xl animate fadeIn-1">OUR STORE</h1>
          <div className="absolute bg-[#2596BE] h-[2.5px] w-8 bottom-[-8px] animate fadeIn-2"></div>
        </section>
        <section className="flex flex-col gap-8 md:flex-row h-full pb-10 md:pb-[70px]">
          <div className="md:w-1/2 md:order-2">
            <div>
              <h1 className="text-3xl font-semibold tracking-wider animate fadeIn-3">
                VanaHai Bubble Tea
              </h1>
              <p className="text-slate-500 tracking-wide py-3 leading-6 animate fadeIn-4">
                Welcome to VanaHai Bubble Tea, where we transport you to the
                vibrant streets of Taiwan with every sip.
              </p>
              <div className="flex justify-between pt-5">
                <div>
                  <h3 className="font-semibold animate fadeIn-5">Address</h3>
                  <p className="py-3 leading-6 animate fadeIn-6 text-slate-500">
                    Estonia pst 7-105A, Tallinn, Estonia
                  </p>
                  <h3 className="font-semibold animate fadeIn-7">Hotline</h3>
                  <p className="py-3 animate fadeIn-8">
                    <a
                      href="tel:+37255600122"
                      className="leading-6 text-slate-500 border-slate-400 border-0 border-b"
                    >
                      +372 5560 0122
                    </a>
                  </p>
                  <h3 className="font-semibold animate fadeIn-9">
                    Time Opening
                  </h3>
                  <p className="py-3 animate fadeIn-10 text-slate-500">
                    12:00 - 20:00
                  </p>
                </div>
                {/* TODO */}
                <div className="flex flex-col gap-2">
                  <Tooltip
                    title="Share via Facebook"
                    placement="left"
                    className="animate fadeIn-11"
                  >
                    <IconButton>
                      <FacebookOutlined />
                    </IconButton>
                  </Tooltip>
                  <Tooltip
                    title="Share via Instagram"
                    placement="left"
                    className="animate fadeIn-12"
                  >
                    <IconButton>
                      <Instagram />
                    </IconButton>
                  </Tooltip>
                  <Tooltip
                    title="Share via Message"
                    placement="left"
                    className="animate fadeIn-13"
                  >
                    <IconButton>
                      <MessageOutlined />
                    </IconButton>
                  </Tooltip>
                  <Tooltip
                    title="Copy link"
                    placement="left"
                    className="animate fadeIn-14"
                  >
                    <IconButton>
                      <InsertLinkOutlined />
                    </IconButton>
                  </Tooltip>
                </div>
              </div>
            </div>
          </div>
          <div className="md:w-1/2 md:order-1">
            <div className="h-full w-full max-w-[calc(100vw-40px)] md:max-w-[600px] relative animate fadeIn-1">
              <Swiper
                spaceBetween={10}
                centeredSlides={true}
                pagination={{
                  clickable: true,
                }}
                autoplay={{
                  delay: 4500,
                  disableOnInteraction: false,
                }}
                loop
                modules={[Pagination, Autoplay, Navigation]}
                className="mySwiper w-auto select-none"
              >
                <SwiperSlide>
                  <Image
                    src="/location/shop.jpg"
                    width={500}
                    height={400}
                    alt="logo"
                    draggable={false}
                    priority
                    className="object-cover h-[390px] w-full rounded-xl"
                  />
                </SwiperSlide>
                <SwiperSlide>
                  <Image
                    src="/location/shop1.jpg"
                    width={500}
                    height={400}
                    alt="logo"
                    draggable={false}
                    priority
                    className="object-cover h-[390px] w-full rounded-xl"
                  />
                </SwiperSlide>
                <SwiperSlide>
                  <Image
                    src="/location/shop2.jpg"
                    width={500}
                    height={400}
                    alt="logo"
                    draggable={false}
                    priority
                    className="object-cover h-[390px] w-full rounded-xl"
                  />
                </SwiperSlide>
              </Swiper>
            </div>
          </div>
        </section>
        <section className="flex flex-col gap-8 md:flex-row h-full md:min-h-[calc(100vh-100px)] w-full pb-[40px]">
          <div className="md:w-[30%] [&>p]:tracking-wide md:overflow-y-scroll md:max-h-[600px]">
            <div className="animate fadeIn-15">
              <h3 className="py-1">Service Options</h3>
              <div className="grid grid-cols-2 [&>p]:flex [&>p]:items-center [&>p]:text-sm [&>p]:py-1 [&>p]:leading-6 [&>p]:text-slate-500">
                <p className="">
                  <CheckIcon className="text-[16px] mr-1" /> Indirect Delivery
                </p>
                <p className="">
                  <CheckIcon className="text-[16px] mr-1" /> Delivery
                </p>
                <p className="">
                  <CheckIcon className="text-[16px] mr-1" /> Take away
                </p>
                <p className="">
                  <CheckIcon className="text-[16px] mr-1" /> Dine-in
                </p>
              </div>
            </div>
            <Divider className="my-3 animate fadeIn-15" />
            <div className="animate fadeIn-16">
              <h3 className="py-1">Services</h3>
              <div className="grid grid-cols-2 [&>p]:flex [&>p]:items-center [&>p]:text-sm [&>p]:py-1 [&>p]:leading-6 [&>p]:text-slate-500">
                <p className="">
                  <CheckIcon className="text-[16px] mr-1" /> Coffee
                </p>
              </div>
            </div>
            <Divider className="my-3 animate fadeIn-16" />
            <div className="animate fadeIn-17">
              <h3 className="py-1">Dining Options</h3>
              <div className="grid grid-cols-2 [&>p]:flex [&>p]:items-center [&>p]:text-sm [&>p]:py-1 [&>p]:leading-6 [&>p]:text-slate-500">
                <p className="">
                  <CheckIcon className="text-[16px] mr-1" /> Desserts
                </p>
                <p className="">
                  <CheckIcon className="text-[16px] mr-1" /> Seating
                </p>
              </div>
            </div>
            <Divider className="my-3 animate fadeIn-17" />
            <div className="animate fadeIn-18">
              <h3 className="py-1">Facilities</h3>
              <div className="grid grid-cols-2 [&>p]:flex [&>p]:items-center [&>p]:text-sm [&>p]:py-1 [&>p]:leading-6 [&>p]:text-slate-500">
                <p className="">
                  <CheckIcon className="text-[16px] mr-1" /> Free Wi-Fi
                </p>
                <p className="">
                  <CheckIcon className="text-[16px] mr-1" /> Wi-Fi
                </p>
              </div>
            </div>
            <Divider className="my-3 animate fadeIn-18" />
            <div className="animate fadeIn-19">
              <h3 className="py-1">Ambiance</h3>
              <div className="grid grid-cols-2 [&>p]:flex [&>p]:items-center [&>p]:text-sm [&>p]:py-1 [&>p]:leading-6 [&>p]:text-slate-500">
                <p className="">
                  <CheckIcon className="text-[16px] mr-1" /> Budget-friendly
                </p>
              </div>
            </div>
            <Divider className="my-3 animate fadeIn-19" />
            <div className="animate fadeIn-20">
              <h3 className="py-1">Customers</h3>
              <div className="grid grid-cols-2 [&>p]:flex [&>p]:items-center [&>p]:text-sm [&>p]:py-1 [&>p]:leading-6 [&>p]:text-slate-500">
                <p className="">
                  <CheckIcon className="text-[16px] mr-1" /> Welcomes LGBTQ+
                </p>
                <p className="">
                  <CheckIcon className="text-[16px] mr-1" /> Family-friendly
                </p>
                <p className="">
                  <CheckIcon className="text-[16px] mr-1" /> Safe space for
                  transgender
                </p>
              </div>
            </div>
            <Divider className="my-3 animate fadeIn-20" />
            <div className="animate fadeIn-21">
              <h3 className="py-1">Payment</h3>
              <div className="grid grid-cols-2 [&>p]:flex [&>p]:items-center [&>p]:text-sm [&>p]:py-1 [&>p]:leading-6 [&>p]:text-slate-500">
                <p className="">
                  <CheckIcon className="text-[16px] mr-1" /> Mobile payment via
                  NFC
                </p>
                <p className="">
                  <CheckIcon className="text-[16px] mr-1" /> Debit card
                </p>
                <p className="">
                  <CheckIcon className="text-[16px] mr-1" /> Credit card
                </p>
              </div>
            </div>
            <Divider className="my-3 animate fadeIn-21" />
            <div className="animate fadeIn-22">
              <h3 className="py-1">Children</h3>
              <div className="grid grid-cols-2 [&>p]:flex [&>p]:items-center [&>p]:text-sm [&>p]:py-1 [&>p]:leading-6 [&>p]:text-slate-500">
                <p className="">
                  <CheckIcon className="text-[16px] mr-1" /> Child-friendly
                </p>
              </div>
            </div>
            <Divider className="my-3 animate fadeIn-22" />
            <div className="animate fadeIn-23">
              <h3 className="py-1">Pets</h3>
              <div className="grid grid-cols-2 [&>p]:flex [&>p]:items-center [&>p]:text-sm [&>p]:py-1 [&>p]:leading-6 [&>p]:text-slate-500">
                <p className="">
                  <CheckIcon className="text-[16px] mr-1" /> Allows dogs
                </p>
                <p className="">
                  <CheckIcon className="text-[16px] mr-1" /> Allows dogs outside
                </p>
                <p className="">
                  <CheckIcon className="text-[16px] mr-1" /> Allows dogs inside
                </p>
              </div>
            </div>
          </div>
          <div className="md:w-[70%] h-[600px] w-full animate fadeIn-15">
            <Map />
          </div>
        </section>
      </div>
      <Footer />
    </>
  )
}

export default Page
