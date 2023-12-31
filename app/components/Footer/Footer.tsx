import Link from 'next/link'
import Image from 'next/image'
import React from 'react'

const Footer = () => {
  return (
    <footer className="bg-[#333] py-2 px-8">
      <ul className="flex justify-between items-center">
        <li>
          <Link href="/" draggable={false}>
            <Image
              src="/logo-white.png"
              width={120}
              height={120}
              alt="logo"
              className="hover:brightness-[.85] select-none"
              draggable={false}
            />
          </Link>
        </li>
        <li>
          <small className="text-white select-none">
            © Vanahai. All rights reserved.
          </small>
        </li>
        <li className="flex items-center">
          <Link
            href="https://www.facebook.com/vanahaibubbletea"
            className="mr-6"
            draggable={false}
          >
            <Image
              src="/facebook-icon.png"
              width={50}
              height={50}
              alt="facebook logo"
              className="hover:brightness-[.85] select-none"
              draggable={false}
            />
          </Link>
          <Link
            href="https://www.instagram.com/vanahaibubbletea/"
            draggable={false}
          >
            <Image
              src="/instagram-icon.png"
              width={50}
              height={50}
              alt="instagram logo"
              className="hover:brightness-[.85] select-none"
              draggable={false}
            />
          </Link>
        </li>
      </ul>
    </footer>
  )
}

export default Footer
