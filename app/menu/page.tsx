'use client'

import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import { Button, Divider, useMediaQuery } from '@mui/material'
import Footer from '../components/Footer/Footer'
import Header from '../components/Header/Header'
import { CategoryInterface, Product } from '../interfaces/interface'
import axios from 'axios'
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
    if (res && res.data) setCategory(res.data)
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
        (product: any) => product.categoryId == categoryId
      )
      setProducts(search)
    } else {
      setSelected('all')
      setProducts(searchData)
    }
  }

  return (
    <>
      <Header hasBackground={false} />
      <div className="container mx-auto px-4 pb-4 pt-[120px]">
        <div className="text-black text-5xl md:text-6xl font-normal font-['Newsreader'] leading-[76.80px] ">
          <span>Our menu</span>
        </div>
        <Divider className="my-4" />
        <div className="flex relative">
          {matchesResponsive && (
            <>
              <div className="w-[270px] h-[704px] ">
                <div
                  role="button"
                  onClick={() => handleFilterProductByCate()}
                  className={`hover:text-[#2596BE] ${
                    selected === 'all' ? 'text-[#2596BE]' : 'text-black'
                  }  text-xl font-normal my-5`}
                >
                  All
                </div>
                {category.map((cate: CategoryInterface) => {
                  return (
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
                  )
                })}
              </div>
              <div>
                <Divider orientation="vertical" className="my-4 " />
              </div>
            </>
          )}
          <div className="mx-auto lg:mx-[50px] w-full">
            {category.map((cate: CategoryInterface) => {
              // if (
              //   !products.find(
              //     (product: Product) => cate.id === product.categoryId
              //   )
              // )
              //   return
              return (
                <>
                  <div
                    className="flex flex-col my-4"
                    onClick={() => openProductFromCategory(cate.id)}
                  >
                    <span className="text-2xl md:text-3xl font-bold">
                      {cate.name}
                    </span>
                    {!matchesResponsive && (
                      <>
                        <span className="text-sm md:text-lg text-slate-500">
                          {cate.estName}
                        </span>
                        <Divider />
                      </>
                    )}
                  </div>
                  {(matchesResponsive || clickedCategory === cate.id) && (
                    <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
                      {products.map((product: Product) => {
                        if (cate.id !== product.categoryId) return
                        return (
                          <div
                            className="relative animate fadeIn-1"
                            key={product.id}
                          >
                            <div className="w-[170px] h-[170px] md:w-[270px] md:h-[270px] flex items-center relative bg-stone-50 rounded-3xl shadow overflow-hidden">
                              <Image
                                src={product.image!}
                                fill
                                alt={product.name!}
                                className="object-contain"
                                draggable={false}
                              />
                              {product.isBestSeller && (
                                <div className="text-center text-sm w-full left-[-45px] top-[60px] absolute origin-top-left rotate-[-33.19deg] bg-cyan-200 shadow-md">
                                  Best Seller
                                </div>
                              )}
                            </div>
                            <div className="text-black text-base font-normal font-['GFS Didot'] leading-tight select-none">
                              {product.name}
                            </div>
                            <div className="text-black text-opacity-60 text-sm font-normal font-['GFS Didot'] leading-[18.20px] select-none">
                              {product.isDiscount
                                ? product.discountPrice
                                : product?.price}
                              /lb
                            </div>
                          </div>
                        )
                      })}
                    </div>
                  )}
                </>
              )
            })}
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
}

export default Page
