'use client'

import React, { useRef, useState } from 'react'
import Header from '../components/Header/Header'
import Footer from '../components/Footer/Footer'
import Map from '../components/Map/Map'
import Image from 'next/image'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Pagination, Autoplay, Navigation } from 'swiper/modules'
import { Divider, IconButton, Input, Tooltip } from '@mui/material'
import {
  FacebookOutlined,
  InsertLinkOutlined,
  MessageOutlined,
} from '@mui/icons-material'
import CheckIcon from '@mui/icons-material/Check'
import XIcon from '@mui/icons-material/X'
import Link from 'next/link'

import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/navigation'
import './styles.css'

const Page = () => {
  const [isCopied, setIsCopied] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  const handleCopyClick = () => {
    if (inputRef.current) {
      inputRef.current.select()
      document.execCommand('copy')
      setIsCopied(true)
    }
  }

  return (
    <>
      <Header />
      <div className="container mx-auto px-5 md:px-10 pt-[140px] flex flex-col items-center min-h-[calc(100vh-100px)] relative">
        <section className="relative flex justify-center mb-8">
          <h1 className="text-3xl animate fadeIn-1">OUR STORE</h1>
          <div className="absolute bg-[#2596BE] h-[2.5px] w-8 bottom-[-8px] animate fadeIn-2"></div>
        </section>
        <section className="flex flex-col gap-8 md:flex-row h-full w-full pb-10 md:pb-[70px] animate fadeIn-3">
          <div className="md:w-[30%] md:order-1">
            <div>
              <h1 className="text-3xl font-semibold tracking-wider">
                VanaHai Bubble Tea
              </h1>
              <p className="text-slate-500 tracking-wide py-3 leading-6">
                Welcome to VanaHai Bubble Tea, where we transport you to the
                vibrant streets of Taiwan with every sip.
              </p>
              <div className="flex justify-between md:flex-col pt-5">
                <div>
                  <h3 className="font-semibold">Address</h3>
                  <p className="py-3 leading-6 text-slate-500">
                    Estonia pst 7-105A, Tallinn, Estonia
                  </p>
                  <h3 className="font-semibold">Hotline</h3>
                  <p className="py-3">
                    <a
                      href="tel:+37255600122"
                      className="leading-6 text-slate-500 border-slate-400 border-0 border-b"
                    >
                      +372 5560 0122
                    </a>
                  </p>
                  <h3 className="font-semibold">Time Opening</h3>
                  <p className="py-3 text-slate-500">12:00 - 20:00</p>
                </div>
                <div className="flex flex-col md:flex-row gap-3">
                  <Link
                    href="https://www.facebook.com/sharer/sharer.php?u=https%3A%2F%2Fwww.facebook.com%2Fvanahaibubbletea"
                    target="_blank"
                  >
                    <Tooltip
                      title="Share via Facebook"
                      placement="bottom"
                      className="group"
                    >
                      <IconButton>
                        <FacebookOutlined className="group-hover:text-[#2596BE]" />
                      </IconButton>
                    </Tooltip>
                  </Link>
                  <Link
                    href="https://twitter.com/intent/tweet?url=https%3A%2F%2Fwww.facebook.com%2Fvanahaibubbletea"
                    target="_blank"
                  >
                    <Tooltip
                      title="Share via Twitter (X)"
                      placement="bottom"
                      className="group"
                    >
                      <IconButton>
                        <XIcon className="group-hover:text-[#2596BE]" />
                      </IconButton>
                    </Tooltip>
                  </Link>
                  <Link href="sms:&body=https%3A%2F%2Fwww.facebook.com%2Fvanahaibubbletea">
                    <Tooltip
                      title="Share via Message"
                      placement="bottom"
                      className="group"
                    >
                      <IconButton>
                        <MessageOutlined className="group-hover:text-[#2596BE]" />
                      </IconButton>
                    </Tooltip>
                  </Link>
                  <Tooltip
                    title={isCopied ? 'Link copied!' : 'Copy link'}
                    placement="bottom"
                    className="group"
                  >
                    <IconButton onClick={handleCopyClick}>
                      <InsertLinkOutlined className="group-hover:text-[#2596BE]" />
                    </IconButton>
                  </Tooltip>
                  <Input
                    inputRef={inputRef}
                    type="text"
                    value="https://www.facebook.com/vanahaibubbletea"
                    readOnly
                    style={{ position: 'absolute', left: '-9999px' }}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="md:w-[70%] md:order-2 h-[600px]">
            <div className="h-full w-full max-w-[calc(100vw-40px)] md:max-w-[900px] relative animate fadeIn-1">
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
                    className="object-cover h-[600px] w-full rounded-xl"
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
                    className="object-cover h-[600px] w-full rounded-xl"
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
                    className="object-cover h-[600px] w-full rounded-xl"
                  />
                </SwiperSlide>
              </Swiper>
            </div>
          </div>
        </section>
        <section className="relative flex justify-center mb-8">
          <h1 className="text-3xl animate fadeIn-2">LOCATION</h1>
          <div className="absolute bg-[#2596BE] h-[2.5px] w-8 bottom-[-8px] animate fadeIn-3"></div>
        </section>
        <section className="flex flex-col gap-8 md:flex-row h-full md:min-h-[calc(100vh-100px)] w-full pb-[40px] animate fadeIn-4">
          <div
            className="md:w-[30%] [&>p]:tracking-wide md:overflow-y-scroll md:max-h-[600px]"
            id="scrollbar-css"
          >
            <div>
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
            <Divider className="my-3" />
            <div className="">
              <h3 className="py-1">Services</h3>
              <div className="grid grid-cols-2 [&>p]:flex [&>p]:items-center [&>p]:text-sm [&>p]:py-1 [&>p]:leading-6 [&>p]:text-slate-500">
                <p className="">
                  <CheckIcon className="text-[16px] mr-1" /> Coffee
                </p>
              </div>
            </div>
            <Divider className="my-3" />
            <div className="">
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
            <Divider className="my-3" />
            <div className="">
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
            <Divider className="my-3" />
            <div className="">
              <h3 className="py-1">Ambiance</h3>
              <div className="grid grid-cols-2 [&>p]:flex [&>p]:items-center [&>p]:text-sm [&>p]:py-1 [&>p]:leading-6 [&>p]:text-slate-500">
                <p className="">
                  <CheckIcon className="text-[16px] mr-1" /> Budget-friendly
                </p>
              </div>
            </div>
            <Divider className="my-3" />
            <div className="">
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
            <Divider className="my-3" />
            <div className="">
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
            <Divider className="my-3" />
            <div className="">
              <h3 className="py-1">Children</h3>
              <div className="grid grid-cols-2 [&>p]:flex [&>p]:items-center [&>p]:text-sm [&>p]:py-1 [&>p]:leading-6 [&>p]:text-slate-500">
                <p className="">
                  <CheckIcon className="text-[16px] mr-1" /> Child-friendly
                </p>
              </div>
            </div>
            <Divider className="my-3" />
            <div className="">
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
          <div className="md:w-[70%] h-[600px] w-full">
            <Map />
          </div>
        </section>
      </div>
      <Footer />
    </>
  )
}

export default Page
