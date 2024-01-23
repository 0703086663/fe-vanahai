'use client'

import React, { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import Header from '../../components/Header/Header'
import Footer from '../../components/Footer/Footer'
import Image from 'next/image'
import Link from 'next/link'
import { NewInterface } from '../../interfaces/interface'
import { fetchNew, fetchNewById } from '../../services/fetchData'
import convertDateToText from '@/app/utils/convertDateToText'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward'
import { Skeleton } from '@mui/material'
import '../styles.css'

const Page = () => {
  const router = useParams()
  const { id } = router
  const [newData, setNewData] = useState<NewInterface>()
  const [relatedData, setRelatedData] = useState<NewInterface[]>([])

  useEffect(() => {
    const fetchDataAndSetState = async () => {
      const result: NewInterface = await fetchNewById(id as string)
      setNewData(result)
    }

    fetchDataAndSetState()
  }, [id])

  useEffect(() => {
    const fetchDataAndSetState = async () => {
      const result: NewInterface[] = await fetchNew()
      setRelatedData(result)
    }

    fetchDataAndSetState()
  }, [])

  return (
    <>
      <Header />
      <div className="container mx-auto px-10 py-[140px] flex flex-col items-center min-h-[calc(100vh-200px)] md:min-h-[calc(100vh-100px)]">
        {newData && (
          <>
            <section className="lg:w-[880px] lg:px-[5%]">
              <div className="relative flex justify-center mb-8">
                <h1 className="text-3xl lg:text-4xl animate fadeIn-1 text-center leading-10 tracking-wide">
                  {newData.name}
                </h1>
                <div className="absolute bg-[#2596BE] h-[2.5px] w-8 bottom-[-8px] animate fadeIn-2"></div>
              </div>
              <div className="flex flex-col justify-center">
                <p className="text-md text-center text-[#2596BE] tracking-wide animate fadeIn-3">
                  {convertDateToText(newData.createdAt)}
                </p>
                {newData.description && (
                  <p className="text-left text-slate-600 pt-8 text-lg tracking-wide leading-10 animate fadeIn-3">
                    {newData.description}
                  </p>
                )}
                <div className="pt-8 animate fadeIn-4">
                  <Image
                    src={newData!.image}
                    fill
                    alt="Name news"
                    className="object-contain !static"
                  />
                </div>
              </div>
            </section>

            <section>
              <h1 className="text-3xl text-center leading-10 tracking-wide py-10 animate fadeIn-5">
                Related News
              </h1>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10 w-full animate fadeIn-6">
                {relatedData &&
                  relatedData
                    .filter((data) => data.id !== id)
                    .sort(
                      (a, b) =>
                        new Date(b.createdAt).getTime() -
                        new Date(a.createdAt).getTime()
                    )
                    .slice(0, 3)
                    .map((data: NewInterface) => (
                      <Link
                        href={`/news/${data.id}`}
                        key={data.id}
                        className="relative group/item shadow-lg overflow-hidden select-none cursor-pointer"
                      >
                        <Image
                          src={data.image}
                          alt={data.name}
                          height={200}
                          width={300}
                          className="group-hover/item:scale-125 duration-500"
                        />
                        <div className="absolute left-0 bottom-0 w-full group">
                          <div className="overlay bg-[#00000090] text-white flex flex-col justify-between">
                            <p className="card-title text-sm transition-all duration-500 group-hover:pr-4">
                              {convertDateToText(data.createdAt)}
                            </p>
                            <p className="mt-5 truncate group-hover:overflow-hidden group-hover:whitespace-normal">
                              {data.name}
                            </p>
                            <p className="group-hover:block hidden text-xs mt-4 text-slate-300 transition-all">
                              Find out more{' '}
                              <ArrowForwardIcon fontSize="small" />
                            </p>
                          </div>
                        </div>
                      </Link>
                    ))}
              </div>
            </section>
          </>
        )}

        {!newData && (
          <>
            <section className="w-[400px] lg:w-[880px] lg:px-[5%]">
              <div className="relative flex justify-center mb-8">
                <Skeleton animation="wave" width={600} />
                <div className="absolute bg-[#2596BE] h-[2.5px] w-8 bottom-[-8px]"></div>
              </div>
              <div className="flex flex-col justify-center items-center">
                <Skeleton animation="wave" width={100} height={15} />
                <div className="pt-8 w-full">
                  <Skeleton
                    variant="rectangular"
                    animation="wave"
                    className="select-none h-auto object-contain"
                    height={400}
                  />
                </div>
              </div>
            </section>
            <section>
              <h1 className="text-3xl text-center leading-10 tracking-wide py-10">
                Related News
              </h1>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10 w-full">
                {relatedData.length === 0 &&
                  Array.from({ length: 3 }).map((_, index) => (
                    <div key={index}>
                      <Skeleton
                        variant="rectangular"
                        animation="wave"
                        className="select-none w-full h-auto object-contain"
                        height={200}
                        width={300}
                      />
                    </div>
                  ))}
              </div>
            </section>
          </>
        )}
      </div>
      <Footer />
    </>
  )
}

export default Page
