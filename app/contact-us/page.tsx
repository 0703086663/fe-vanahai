'use client'

import React from 'react'
import Image from 'next/image'
import Map from '../components/Map/Map'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Pagination, Autoplay, Navigation } from 'swiper/modules'
import { Divider, IconButton, Tooltip } from '@mui/material'
import {
  FacebookOutlined,
  InsertLinkOutlined,
  Instagram,
  MessageOutlined,
} from '@mui/icons-material'
import ContactForm from './components/ContactForm'
import DirectionsCarFilledOutlined from '@mui/icons-material/DirectionsCar'
import ChildCareOutlinedIcon from '@mui/icons-material/ChildCareOutlined'
import ShoppingBagOutlinedIcon from '@mui/icons-material/ShoppingBagOutlined'

import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/navigation'
import useScrollTracker from '../hooks/useScrollTracker'
import Header from '../components/Header/Header'
import Footer from '../components/Footer/Footer'
import './styles.css'

const Page = () => {
  const isScroll = useScrollTracker(200)

  return (
    <>
      <Header hasBackground={false} />
      <div className="container mx-auto px-4 pb-10 pt-[140px] h-full">
        <section className="flex flex-col gap-8 md:flex-row h-full">
          <div className="md:w-1/2 md:order-2">
            <div>
              <h1 className="text-3xl font-semibold tracking-wider animate fadeIn-1">
                VanaHai Bubble Tea
              </h1>
              <p className="text-slate-500 tracking-wide py-3 leading-6 animate fadeIn-2">
                Welcome to VanaHai Bubble Tea, where we transport you to the
                vibrant streets of Taiwan with every sip.
              </p>
              <div className="flex justify-between pt-5">
                <div>
                  <h3 className="font-semibold animate fadeIn-3">Address</h3>
                  <p className="py-3 leading-6 animate fadeIn-4 text-slate-500">
                    Estonia pst 7-105A, Tallinn, Estonia
                  </p>
                  <h3 className="font-semibold animate fadeIn-5">Hotline</h3>
                  <p className="py-3 animate fadeIn-6">
                    <a
                      href="tel:+37255600122"
                      className="leading-6 text-slate-500 border-slate-400 border-0 border-b"
                    >
                      +372 5560 0122
                    </a>
                  </p>
                  <h3 className="font-semibold animate fadeIn-7">
                    Time Opening
                  </h3>
                  <p className="py-3 animate fadeIn-8 text-slate-500">
                    12:00 - 20:00
                  </p>
                  <div className="location-meta py-3 flex flex-col md:flex-row gap-2">
                    <span className="parking flex animate fadeIn-9">
                      <DirectionsCarFilledOutlined className="text-slate-600" />
                      <span className="px-1 text-slate-500">
                        Parking available
                      </span>
                    </span>
                    <span className="self-serving flex animate fadeIn-10">
                      <ChildCareOutlinedIcon className="text-slate-600" />
                      <span className="px-1 text-slate-500">Friendly</span>
                    </span>
                    <span className="take-away flex animate fadeIn-11">
                      <ShoppingBagOutlinedIcon className="text-slate-600" />
                      <span className="px-1 text-slate-500">Take away</span>
                    </span>
                  </div>
                </div>
                {/* TODO */}
                <div className="flex flex-col gap-2">
                  <Tooltip
                    title="Share via Facebook"
                    placement="left"
                    className="animate fadeIn-12"
                  >
                    <IconButton>
                      <FacebookOutlined />
                    </IconButton>
                  </Tooltip>
                  <Tooltip
                    title="Share via Instagram"
                    placement="left"
                    className="animate fadeIn-13"
                  >
                    <IconButton>
                      <Instagram />
                    </IconButton>
                  </Tooltip>
                  <Tooltip
                    title="Share via Message"
                    placement="left"
                    className="animate fadeIn-14"
                  >
                    <IconButton>
                      <MessageOutlined />
                    </IconButton>
                  </Tooltip>
                  <Tooltip
                    title="Copy link"
                    placement="left"
                    className="animate fadeIn-15"
                  >
                    <IconButton>
                      <InsertLinkOutlined />
                    </IconButton>
                  </Tooltip>
                </div>
              </div>
            </div>
          </div>
          <div className="md:w-1/2 md:order-1 flex flex-col gap-4 items-center">
            <div className="h-full w-full relative">
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
        <Divider className="my-10" />
        <section className={` ${isScroll && 'animate fadeIn-1'}`}>
          <ContactForm />
        </section>
        <section className="h-[300px] w-full mt-10">
          <Map />
        </section>
      </div>
      <Footer />
    </>
  )
}

export default Page
