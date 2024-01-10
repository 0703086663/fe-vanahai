'use client'

import useScrollTracker from '@/app/hooks/useScrollTracker'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React, { useState } from 'react'
import DensityMediumIcon from '@mui/icons-material/DensityMedium'
import {
  Divider,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
} from '@mui/material'

const Header = ({ hasBackground = true }: { hasBackground: boolean }) => {
  const [openNav, setOpenNav] = useState(false)
  const pathname = usePathname()

  const checkBackground = () => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    if ((hasBackground && useScrollTracker(100)) || !hasBackground) return true
    if (hasBackground) return false
  }

  const isScroll = checkBackground()

  return (
    <header
      className={`header h-[80px] md:h-[100px] w-full px-10 flex justify-between items-center z-50 fixed
    ${isScroll ? 'bg-white shadow-lg left-0 right-0' : 'bg-inherit'}
    `}
    >
      <div className="logo">
        <Link href="/" draggable={false}>
          <Image
            src={`${isScroll ? '/logo-black.png' : '/logo-white.png'}`}
            height={100}
            width={100}
            alt="logo"
            priority
            draggable={false}
            className={`max-h-[80px] max-w-[80px] md:max-h-full md:max-w-full ${
              isScroll ? 'hover:brightness-200' : 'hover:brightness-90'
            }`}
          />
        </Link>
      </div>
      <nav className="hidden lg:!block navigation">
        <ul className="flex">
          <li className="ml-20">
            <Link
              href="/"
              className={`select-none text-lg font-medium" ${
                pathname === '/' && isScroll
                  ? 'text-[#2596BE]'
                  : pathname === '/' && !isScroll
                  ? 'text-[#99FFFF]'
                  : isScroll
                  ? 'text-black'
                  : 'text-white'
              } tracking-wide`}
              draggable={false}
            >
              Home
            </Link>
          </li>
          <li className="ml-20">
            <Link
              href="/menu"
              className={`select-none text-lg font-medium" ${
                pathname === '/menu' && isScroll
                  ? 'text-[#2596BE]'
                  : pathname === '/menu' && !isScroll
                  ? 'text-[#99FFFF]'
                  : isScroll
                  ? 'text-black'
                  : 'text-white'
              } tracking-wide`}
              draggable={false}
            >
              Menu
            </Link>
          </li>
          <li className="ml-20">
            <Link
              href="/about-us"
              className={`select-none text-lg font-medium" ${
                pathname === '/about-us' && isScroll
                  ? 'text-[#2596BE]'
                  : pathname === '/about-us' && !isScroll
                  ? 'text-[#99FFFF]'
                  : isScroll
                  ? 'text-black'
                  : 'text-white'
              } tracking-wide`}
              draggable={false}
            >
              About Us
            </Link>
          </li>
          <li className="ml-20">
            <Link
              href="/contact-us"
              className={`select-none text-lg font-medium" ${
                pathname === '/contact-us' && isScroll
                  ? 'text-[#2596BE]'
                  : pathname === '/contact-us' && !isScroll
                  ? 'text-[#99FFFF]'
                  : isScroll
                  ? 'text-black'
                  : 'text-white'
              } tracking-wide`}
              draggable={false}
            >
              Contact Us
            </Link>
          </li>
        </ul>
      </nav>
      <>
        <DensityMediumIcon
          onClick={() => setOpenNav(!openNav)}
          fontSize="medium"
          className={`block lg:!hidden ${
            isScroll
              ? 'hover:brightness-200 text-black active:text-[#00000090]'
              : 'hover:brightness-90 text-white active:text-[#ffffff90]'
          }`}
        />
        <Drawer
          anchor="top"
          open={openNav}
          onClose={() => setOpenNav(!openNav)}
        >
          <List>
            <Link href="/">
              <ListItem disablePadding>
                <ListItemButton>
                  <ListItemText primary={'Home'} className="text-center" />
                </ListItemButton>
              </ListItem>
            </Link>
            <Divider />
            <Link href="/menu">
              <ListItem disablePadding>
                <ListItemButton>
                  <ListItemText primary={'Menu'} className="text-center" />
                </ListItemButton>
              </ListItem>
            </Link>
            <Divider />
            <Link href="/about-us">
              <ListItem disablePadding>
                <ListItemButton>
                  <ListItemText primary={'About Us'} className="text-center" />
                </ListItemButton>
              </ListItem>
            </Link>
            <Divider />
            <Link href="/contact-us">
              <ListItem disablePadding>
                <ListItemButton>
                  <ListItemText
                    primary={'Contact Us'}
                    className="text-center"
                  />
                </ListItemButton>
              </ListItem>
            </Link>
          </List>
        </Drawer>
      </>
    </header>
  )
}

export default Header
