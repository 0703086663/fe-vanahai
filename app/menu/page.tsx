'use client'

import React, { Fragment, useEffect, useState } from 'react'
import Image from 'next/image'
import { Divider, Skeleton, useMediaQuery } from '@mui/material'
import Footer from '../components/Footer/Footer'
import Header from '../components/Header/Header'
import { CategoryInterface, Product } from '../interfaces/interface'
import axios from 'axios'
import randomWidthSkeleton from '../utils/randomWidthSkeleton'

const Page = () => {
  const [products, setProducts] = useState<Product[]>([])
  const [category, setCategory] = useState<CategoryInterface[]>([])
  const [searchData, setSearchData] = useState<Product[]>([])
  const [selected, setSelected] = useState('all')
  const [clickedCategory, setlickedCategory] = useState('')
  const matchesResponsive = useMediaQuery('(min-width:1024px)')

  const openProductFromCategory = (cateId?: string) => {
    clickedCategory === cateId
      ? setlickedCategory('')
      : setlickedCategory(cateId!)
  }

  const fetchCategory = async () => {
    const res = await axios.get(`${process.env.NEXT_PUBLIC_API_LINK}/category`)
    if (res && res.data) {
      setCategory(res.data)
    }
  }
  const fetchContents = async () => {
    const res = await axios.get(`${process.env.NEXT_PUBLIC_API_LINK}/product`)
    if (res && res.data) {
      setProducts(res.data)
      setSearchData(res.data)
    }
  }
  useEffect(() => {
    fetchContents()
    fetchCategory()
  }, [])

  const handleFilterProductByCate = (categoryId?: string) => {
    let search
    if (categoryId) {
      setSelected(categoryId)
      search = searchData.filter(
        (product: Product) => product.categoryId == categoryId
      )
      setProducts(search)
    } else {
      setSelected('all')
      setProducts(searchData)
    }
  }

  return (
    <>
      <Header />
      <div className="container mx-auto px-4 pb-12 pt-[120px] min-h-[calc(100vh-200px)]">
        <section className="relative flex justify-center mb-8">
          <h1 className="text-3xl animate fadeIn-1">OUR MENU</h1>
          <div className="absolute bg-[#2596BE] h-[2.5px] w-8 bottom-[-8px] animate fadeIn-2"></div>
        </section>
        <div className="flex relative">
          <div className="hidden lg:block w-[270px]">
            {category.length !== 0 && (
              <>
                <div
                  role="button"
                  onClick={() => handleFilterProductByCate()}
                  className={`hover:text-[#2596BE] ${
                    selected === 'all' ? 'text-[#2596BE]' : 'text-black'
                  }  text-xl font-normal my-5`}
                >
                  All
                </div>
                {category.map((cate: CategoryInterface) => (
                  <div
                    key={cate.id}
                    role="button"
                    onClick={() => handleFilterProductByCate(cate.id)}
                    className={`hover:text-[#2596BE] ${
                      selected === cate.id ? 'text-[#2596BE]' : 'text-black'
                    }  text-xl font-normal my-5`}
                  >
                    {cate.name}
                  </div>
                ))}
              </>
            )}
            {category.length === 0 &&
              Array.from({ length: 10 }).map((_, index) => (
                <div key={index} className="my-5 select-none">
                  <Skeleton animation="wave" width={randomWidthSkeleton()} />
                </div>
              ))}
          </div>
          <div className="hidden lg:block">
            <Divider orientation="vertical" className="my-4 " />
          </div>
          <div className="mx-auto lg:mx-[50px] w-full">
            {category.length === 0 ? (
              <div className="hidden lg:block">
                <div className="grid grid-cols-2 lg:grid-cols-3 gap-6">
                  {Array.from({ length: 9 }).map((_, index) => (
                    <Fragment key={index}>
                      <div className="my-4">
                        <Skeleton
                          variant="rectangular"
                          animation="wave"
                          className="select-none w-full h-auto object-contain"
                          height={250}
                        />
                        <Skeleton
                          animation="wave"
                          className="select-none"
                          width={randomWidthSkeleton()}
                        />
                        <Skeleton
                          animation="wave"
                          className="select-none text-sm"
                          width={50}
                        />
                      </div>
                    </Fragment>
                  ))}
                </div>
              </div>
            ) : (
              category.map((cate: CategoryInterface, index: number) => {
                if (
                  !products.find(
                    (product: Product) => cate.id === product.categoryId
                  )
                )
                  return
                return (
                  <Fragment key={cate.id}>
                    <div
                      className={`flex flex-col my-4 animate-product ${
                        selected !== 'all' ? 'fadeIn-1' : `fadeIn-${index + 1}`
                      }`}
                      onClick={() => openProductFromCategory(cate.id)}
                    >
                      <span className="text-xl md:text-2xl font-bold">
                        {cate.name}
                      </span>
                      <span className="text-sm md:text-lg text-slate-500">
                        {cate.estName}
                      </span>
                      <Divider className="block lg:hidden" />
                    </div>
                    {(matchesResponsive || clickedCategory === cate.id) && (
                      <div className="grid grid-cols-2 lg:grid-cols-3 gap-6">
                        {products.map((product: Product) => {
                          if (cate.id !== product.categoryId) return
                          return (
                            <div
                              className={`relative animate-product ${
                                !matchesResponsive || selected !== 'all'
                                  ? 'fadeIn-1'
                                  : `fadeIn-${index + 1}`
                              }`}
                              key={product.id}
                            >
                              <div className="flex items-center relative bg-stone-50 rounded-3xl shadow overflow-hidden">
                                <Image
                                  src={product.image!}
                                  width={500}
                                  height={500}
                                  alt={product.name!}
                                  className="object-contain hover:scale-110 duration-500"
                                  draggable={false}
                                />
                                {product.isBestSeller && (
                                  <div className="text-center text-sm w-[170px] left-[-45px] top-[60px] absolute origin-top-left rotate-[-33.19deg] bg-cyan-200 shadow-md">
                                    Best Seller
                                  </div>
                                )}
                                {product.isDiscount && (
                                  <div className="text-center text-sm text-white w-[170px] left-[-45px] top-[60px] absolute origin-top-left rotate-[-33.19deg] bg-red-500 shadow-md">
                                    Sale
                                  </div>
                                )}
                              </div>
                              <div className="text-black text-base font-normal leading-tight select-none py-2">
                                {product.name}
                              </div>
                              <div className="text-black text-opacity-60 text-sm font-normal leading-[18.20px] select-none">
                                {product.isDiscount ? (
                                  <>
                                    <span className="text-red-500">
                                      €{product.discountPrice?.toFixed(2)}
                                    </span>{' '}
                                    <s>€{product.price?.toFixed(2)}</s>
                                  </>
                                ) : (
                                  `€${product.price?.toFixed(2)}`
                                )}
                              </div>
                            </div>
                          )
                        })}
                      </div>
                    )}
                  </Fragment>
                )
              })
            )}
            {category.length === 0 &&
              Array.from({ length: 10 }).map((_, index) => (
                <div key={index} className="my-4 block lg:hidden">
                  <Skeleton
                    animation="wave"
                    className="text-xl select-none"
                    width={randomWidthSkeleton()}
                  />
                  <Skeleton
                    animation="wave"
                    className="text-sm select-none"
                    width={randomWidthSkeleton()}
                  />
                  <Divider />
                </div>
              ))}
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
}

export default Page
