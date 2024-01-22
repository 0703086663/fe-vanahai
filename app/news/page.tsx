'use client'

import React, { useEffect, useState } from 'react'
import Header from '../components/Header/Header'
import Footer from '../components/Footer/Footer'
import Image from 'next/image'
import { Divider } from '@mui/material'
import Link from 'next/link'
import { NewInterface } from '../interfaces/interface'
import { fetchNew } from '../services/fetchData'

const Page = () => {
  const [newData, setNewData] = useState<NewInterface[]>([])

  useEffect(() => {
    const fetchDataAndSetState = async () => {
      const result: NewInterface[] = await fetchNew()
      setNewData(result)
    }

    fetchDataAndSetState()
  }, [])

  return (
    <>
      <Header />
      <div className="container mx-auto px-10 py-[140px] flex flex-col items-center min-h-[calc(100vh-200px)] md:min-h-[calc(100vh-100px)]">
        <section className="relative flex justify-center mb-8">
          <h1 className="text-3xl animate fadeIn-1">NEWS</h1>
          <div className="absolute bg-[#2596BE] h-[2.5px] w-8 bottom-[-8px] animate fadeIn-2"></div>
        </section>
        <section className="">
            
        </section>
      </div>
      <Footer />
    </>
  )
}

export default Page
