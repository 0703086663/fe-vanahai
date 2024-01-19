'useclient'

import Link from 'next/link'
import Image from 'next/image'
import React from 'react'

const Footer = () => {
  return (
    <footer className="bg-[#333] h-auto sm:h-[100px]">
      <ul className="h-full container mx-auto px-10 md:px-0 lg:px-10 2xl:px-28 flex justify-between max-[640px]:flex-col items-center">
        {/* <li className="max-[640px]:mt-2">
          <Link href="/" draggable={false}>
            <Image
              src="/logo.png"
              width={90}
              height={90}
              alt="logo"
              priority
              className="max-h-[80px] max-w-[80px] md:max-h-full md:max-w-full hover:brightness-[.5] select-none"
              draggable={false}
            />
          </Link>
        </li> */}
        <li className="max-[640px]:my-4">
          <small className="text-white select-none tracking-wider font-['Poppins']">
            © Vanahai. All rights reserved.
          </small>
        </li>
        <li className="flex items-center max-[640px]:mb-4">
          <Link
            href="https://www.facebook.com/vanahaibubbletea"
            className="mr-6"
            draggable={false}
          >
            <Image
              src="/facebook-icon.png"
              width={40}
              height={40}
              priority
              alt="facebook logo"
              className="hover:brightness-[.9] active:scale-95 select-none"
              draggable={false}
            />
          </Link>
          <Link
            href="https://www.instagram.com/vanahaibubbletea/"
            draggable={false}
          >
            <Image
              src="/instagram-icon.png"
              width={40}
              height={40}
              priority
              alt="instagram logo"
              className="hover:brightness-[.9] active:scale-95 select-none"
              draggable={false}
            />
          </Link>
        </li>
      </ul>
    </footer>
  )
}

export default Footer
