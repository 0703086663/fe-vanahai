'use client'

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

const Header = () => {
  const [openNav, setOpenNav] = useState(false)
  const pathname = usePathname()

  return (
    <header className="header h-[80px] md:h-[100px] w-full z-50 fixed bg-white shadow-lg left-0 right-0">
      <div className="container mx-auto px-10 md:px-0 lg:px-10 2xl:px-28 flex justify-between items-center ">
        <div className="logo">
          <Link href="/" draggable={false}>
            <Image
              src="/logo.png"
              height={100}
              width={100}
              alt="logo"
              priority
              draggable={false}
              className="max-h-[80px] max-w-[80px] md:max-h-full md:max-w-full"
            />
          </Link>
        </div>
        <nav className="hidden lg:!block navigation">
          <ul className="flex [&>li]:ml-16 [&>li>a]:font-['Poppins']">
            <li>
              <Link
                href="/"
                className={`select-none text-md font-medium" ${
                  pathname === '/' ? 'text-[#2596BE]' : 'text-black'
                } tracking-wide`}
                draggable={false}
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                href="/menu"
                className={`select-none text-md font-medium" ${
                  pathname === '/menu' ? 'text-[#2596BE]' : 'text-black'
                } tracking-wide`}
                draggable={false}
              >
                Menu
              </Link>
            </li>
            <li>
              <Link
                href="/our-stories"
                className={`select-none text-md font-medium" ${
                  pathname === '/our-stories' ? 'text-[#2596BE]' : 'text-black'
                } tracking-wide`}
                draggable={false}
              >
                Our Stories
              </Link>
            </li>
            <li>
              <Link
                href="/our-store"
                className={`select-none text-md font-medium" ${
                  pathname === '/our-store' ? 'text-[#2596BE]' : 'text-black'
                } tracking-wide`}
                draggable={false}
              >
                Our Store
              </Link>
            </li>
            <li>
              <Link
                href="/news"
                className={`select-none text-md font-medium" ${
                  pathname === '/news' ? 'text-[#2596BE]' : 'text-black'
                } tracking-wide`}
                draggable={false}
              >
                News
              </Link>
            </li>
            <li>
              <Link
                href="/contact-us"
                className={`select-none text-md font-medium" ${
                  pathname === '/contact-us' ? 'text-[#2596BE]' : 'text-black'
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
            className="block lg:!hidden cursor-pointer hover:brightness-200 text-black active:text-[#00000090]"
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
              <Link href="/our-stories">
                <ListItem disablePadding>
                  <ListItemButton>
                    <ListItemText
                      primary={'Our Stories'}
                      className="text-center"
                    />
                  </ListItemButton>
                </ListItem>
              </Link>
              <Divider />
              <Link href="/our-store">
                <ListItem disablePadding>
                  <ListItemButton>
                    <ListItemText
                      primary={'Our Store'}
                      className="text-center"
                    />
                  </ListItemButton>
                </ListItem>
              </Link>
              <Divider />
              <Link href="/news">
                <ListItem disablePadding>
                  <ListItemButton>
                    <ListItemText primary={'News'} className="text-center" />
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
      </div>
    </header>
  )
}

export default Header
