'use client'

import React from 'react'
import Image from 'next/image'
import Map from '../components/Map/Map'
import { Swiper, SwiperSlide } from 'swiper/react'
import { EffectCards } from 'swiper/modules'
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

import './styles.css'
import 'swiper/css'
import 'swiper/css/effect-cards'
import useScrollTracker from '../hooks/useScrollTracker'
import Header from '../components/Header/Header'
import Footer from '../components/Footer/Footer'

const Page = () => {
  const isScroll = useScrollTracker(200)

  return (
    <>
      <Header hasBackground={false} />
      <div className="container mx-auto px-4 pb-10 pt-[140px] h-full">
        <section className="flex h-full">
          <div className="location-left w-1/2 flex flex-col items-center">
            <div className="h-[300px] max-w-[80%] mr-[5%]">
              <Swiper
                effect={'cards'}
                grabCursor={true}
                modules={[EffectCards]}
                className="mySwiper w-auto select-none"
                draggable={false}
              >
                <SwiperSlide>
                  <Image
                    src="/location/shop.jpg"
                    width={500}
                    height={400}
                    alt="logo"
                    draggable={false}
                    priority
                    className="object-cover h-[300px] w-full rounded-xl"
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
                    className="object-cover h-[300px] w-full rounded-xl"
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
                    className="object-cover h-[300px] w-full rounded-xl"
                  />
                </SwiperSlide>
              </Swiper>
            </div>
            <div className="h-[300px] my-4 w-[85%]">
              <Map />
            </div>
          </div>
          <div className="location-right w-1/2">
            <div>
              <h1 className="text-3xl font-semibold tracking-wider animate fadeIn-1">
                VanaHai Bubble Tea
              </h1>
              <p className="text-slate-500 tracking-wide py-3 leading-6 animate fadeIn-2">
                Welcome to VanaHai Bubble Tea, where we transport you to the
                vibrant streets of Taiwan with every sip.
              </p>
              <div className="flex justify-between pt-5 animate fadeIn-3">
                <div>
                  <h3 className="font-semibold">Address</h3>
                  <p className="py-3 leading-6">
                    Estonia pst 7-105A, Tallinn, Estonia
                  </p>
                  <h3 className="font-semibold">Hotline</h3>
                  <p className="py-3">
                    <a href="tel:+37255600122" className="leading-6">
                      +372 5560 0122
                    </a>
                  </p>
                  <h3 className="font-semibold">Time Opening</h3>
                  <p className="py-3">12:00 - 20:00</p>
                  <div className="location-meta py-3 flex flex-col md:flex-row gap-2">
                    <span className="parking flex">
                      <DirectionsCarFilledOutlined />
                      <span className="px-1">Parking available</span>
                    </span>
                    <span className="self-serving flex">
                      <ChildCareOutlinedIcon />
                      <span className="px-1">Friendly</span>
                    </span>
                    <span className="take-away flex">
                      <ShoppingBagOutlinedIcon />
                      <span className="px-1">Take away</span>
                    </span>
                  </div>
                </div>
                {/* TODO */}
                <div className="flex flex-col gap-2">
                  <Tooltip title="Share via Facebook" placement="left">
                    <IconButton>
                      <FacebookOutlined />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Share via Instagram" placement="left">
                    <IconButton>
                      <Instagram />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Share via Message" placement="left">
                    <IconButton>
                      <MessageOutlined />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Copy link" placement="left">
                    <IconButton>
                      <InsertLinkOutlined />
                    </IconButton>
                  </Tooltip>
                </div>
              </div>
            </div>
          </div>
        </section>
        <Divider className="my-10" />
        <section className={` ${isScroll && 'animate fadeIn-1'}`}>
          <ContactForm />
        </section>
      </div>
      <Footer />
    </>
  )
}

export default Page
