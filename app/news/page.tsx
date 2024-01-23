'use client'

import React, { ChangeEvent, useEffect, useState } from 'react'
import Header from '../components/Header/Header'
import Footer from '../components/Footer/Footer'
import Image from 'next/image'
import Link from 'next/link'
import { NewInterface } from '../interfaces/interface'
import { fetchNew } from '../services/fetchData'
import convertDateToText from '../utils/convertDateToText'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward'
import { Pagination, Skeleton, Stack } from '@mui/material'
import './styles.css'

const Page = () => {
  const [newData, setNewData] = useState<NewInterface[]>([])
  const itemsPerPage = 9
  const [currentPage, setCurrentPage] = useState(1)

  const indexOfLastItem = currentPage * itemsPerPage
  const indexOfFirstItem = indexOfLastItem - itemsPerPage
  const currentItems = newData.slice(indexOfFirstItem, indexOfLastItem)

  const handleChange = (event: ChangeEvent<unknown>, value: number) => {
    setCurrentPage(value)
  }

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
      <div className="container mx-auto px-10 pt-[100px] md:pt-[140px] pb-[50px] flex flex-col items-center min-h-[calc(100vh-200px)] md:min-h-[calc(100vh-100px)]">
        <section className="relative flex justify-center mb-8">
          <h1 className="text-3xl animate fadeIn-1">NEWS</h1>
          <div className="absolute bg-[#2596BE] h-[2.5px] w-8 bottom-[-8px] animate fadeIn-2"></div>
        </section>
        <section className="">
          <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-10">
            {currentItems &&
              currentItems
                .sort(
                  (a, b) =>
                    new Date(b.createdAt).getTime() -
                    new Date(a.createdAt).getTime()
                )
                .map((data: NewInterface) => (
                  <Link
                    href={`/news/${data.id}`}
                    key={data.id}
                    className="relative group shadow-lg overflow-hidden select-none cursor-pointer"
                  >
                    <Image
                      src={data.image}
                      alt={data.name}
                      height={300}
                      width={400}
                      className="group-hover:scale-125 duration-500 object-cover h-[300px]"
                    />
                    <div className="absolute left-0 bottom-0 w-full group">
                      <div className="overlay bg-[#00000090] text-white flex flex-col justify-between">
                        <p className="card-title text-sm transition-all duration-500 group-hover:pr-4">
                          {convertDateToText(data.createdAt)}
                        </p>
                        <div className="mt-5 overflow-hidden group-hover:max-h-[4.5rem]">
                          <p className="truncate group-hover:overflow-hidden group-hover:whitespace-normal">
                            {data.name}
                          </p>
                        </div>
                        <p className="group-hover:block hidden text-xs mt-4 text-slate-300 transition-all">
                          Find out more <ArrowForwardIcon fontSize="small" />
                        </p>
                      </div>
                    </div>
                  </Link>
                ))}
            {newData.length === 0 &&
              Array.from({ length: 3 }).map((_, index) => (
                <div key={index}>
                  <Skeleton
                    variant="rectangular"
                    animation="wave"
                    className="select-none w-full h-auto object-contain"
                    height={300}
                    width={400}
                  />
                </div>
              ))}
          </div>
        </section>
        <Stack spacing={2} mt={4}>
          <Pagination
            count={Math.ceil(newData.length / itemsPerPage)}
            page={currentPage}
            onChange={handleChange}
            variant="outlined"
            color="primary"
          />
        </Stack>
      </div>
      <Footer />
    </>
  )
}

export default Page
