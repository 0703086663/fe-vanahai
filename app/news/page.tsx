import React from 'react'
import Header from '../components/Header/Header'
import Footer from '../components/Footer/Footer'

const Page = () => {
  return (
    <>
      <Header hasBackground={false} />
      <div className="container mx-auto px-10 pt-[140px] flex flex-col items-center min-h-[calc(100vh-200px)] md:min-h-[calc(100vh-100px)]">
        <section className="relative flex justify-center pb-[40px]">
          <h1 className="text-3xl animate fadeIn-1">NEWS</h1>
          <div className="absolute bg-[#2596BE] h-[2.5px] w-8 top-1/2 animate fadeIn-2"></div>
        </section>
        <section></section>
      </div>
      <Footer />
    </>
  )
}

export default Page
