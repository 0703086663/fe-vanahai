'use client'
import { usePathname } from 'next/navigation'
import { styled } from '@mui/material/styles'
import { useCallback, useEffect, useState } from 'react'
import { SideNav } from '../components/Layout/SideNav'
import Footer from '../components/Footer/Footer'

const LayoutAdmin = (props: any) => {
  const { children } = props
  const pathname = usePathname()
  const [openNav, setOpenNav] = useState(false)

  const handlePathnameChange = useCallback(() => {
    if (openNav) {
      setOpenNav(false)
    }
  }, [openNav])

  useEffect(
    () => {
      handlePathnameChange()
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [pathname]
  )

  return (
    <>
      {/* <TopNav onNavOpen={() => setOpenNav(true)} /> */}
      <SideNav onClose={() => setOpenNav(false)} open={openNav} />
      <LayoutRoot>
        <LayoutContainer>{children}</LayoutContainer>
      </LayoutRoot>
    </>
  )
}

const LayoutRoot = styled('div')(({ theme }) => ({
  display: 'flex',
  flex: '1 1 auto',
  maxWidth: '100%',
  [theme.breakpoints.up('lg')]: {
    paddingLeft: 280,
  },
}))
const LayoutContainer = styled('div')({
  display: 'flex',
  flex: '1 1 auto',
  flexDirection: 'column',
  width: '100%',
})

export default LayoutAdmin
