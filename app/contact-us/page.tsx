'use client'

import React from 'react'
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos'

import Header from '../components/Header/Header'
import Footer from '../components/Footer/Footer'

const Page = () => {
  return (
    <>
      <Header />
      <div className="container mx-auto px-4 pb-10 pt-[140px] h-full min-h-[calc(100vh-200px)] md:min-h-[calc(100vh-100px)]">
        <section>
          <div className="flex items-center flex-col">
            <h1 className="text-[28px] md:text-6xl text-center animate fadeIn-1">
              We’re happy to hear from you
            </h1>
            <form className="flex flex-col items-center md:w-[600px]">
              <div className="flex items-center w-full mt-7 animate fadeIn-2">
                <label
                  htmlFor="name"
                  className="w-[150px] cursor-default text-xl"
                >
                  Name <span className="text-red-700">*</span>
                </label>
                <input
                  id="name"
                  type="text"
                  name="name"
                  className="px-[10px] h-[42px] w-full border-0 border-b max-w-[572px] focus:outline-none"
                  required
                />
              </div>
              <div className="flex items-center w-full mt-7 animate fadeIn-3">
                <label
                  htmlFor="email"
                  className="w-[150px] cursor-default text-xl"
                >
                  Email <span className="text-red-700">*</span>
                </label>
                <input
                  id="email"
                  type="text"
                  name="email"
                  className="px-[10px] h-[42px] w-full border-0 border-b max-w-[572px] focus:outline-none"
                  required
                />
              </div>
              <div className="flex items-center w-full mt-7 animate fadeIn-4">
                <label
                  htmlFor="subject"
                  className="w-[150px] cursor-default text-xl"
                >
                  Subject <span className="text-red-700">*</span>
                </label>
                <select
                  name="subject"
                  id="subject"
                  className="px-[10px] h-[42px] w-full border-0 border-b max-w-[572px] focus:outline-none"
                  required
                >
                  <option value="" disabled>
                    Select
                  </option>
                  <option value="compliment">Compliment</option>
                  <option value="complaint">Complaint</option>
                  <option value="question">Question</option>
                  <option value="other">Other</option>
                </select>
              </div>
              <div className="flex items-center w-full mt-7 animate fadeIn-5">
                <label
                  htmlFor="message"
                  className="w-[150px] cursor-default text-xl place-self-start"
                >
                  Message <span className="text-red-700">*</span>
                </label>
                <textarea
                  id="message"
                  name="message"
                  className="px-[10px] w-full border-0 border-b max-w-[572px] focus:outline-none"
                  rows={5}
                  required
                />
              </div>
              <button className="text-white shadow-md bg-[#2596BE] hover:brightness-110 active:scale-[98%] p-3 rounded-lg w-40 tracking-wider flex justify-between items-center mt-7 animate fadeIn-6">
                <span className="ml-2">Submit</span>
                <ArrowForwardIosIcon className="text-sm" />
              </button>
            </form>
          </div>
        </section>
      </div>
      <Footer />
    </>
  )
}

export default Page
