'use client'
import { usePathname } from 'next/navigation'
import { styled } from '@mui/material/styles'
import { useCallback, useEffect, useState } from 'react'
import { SideNav } from '../components/Layout/SideNav'
import MuiAppBar, { AppBarProps } from '@mui/material/AppBar'
import { IconButton, Toolbar } from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu'

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
      <AppBar position="fixed" open={openNav} sx={{ background: 'inherit' }}>
        <Toolbar>
          <IconButton
            aria-label="open drawer"
            onClick={() => setOpenNav(!openNav)}
            edge="start"
            sx={{ mr: 2, ...(openNav && { display: 'none' }) }}
          >
            <MenuIcon color="primary" />
          </IconButton>
        </Toolbar>
      </AppBar>
      <SideNav setOpenNav={setOpenNav} open={openNav} />
      <Main open={openNav}>
        <LayoutContainer>{children}</LayoutContainer>
      </Main>
    </>
  )
}

const LayoutContainer = styled('div')({
  display: 'flex',
  flex: '1 1 auto',
  flexDirection: 'column',
  width: '100%',
})

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })<{
  open?: boolean
}>(({ theme, open }) => ({
  flexGrow: 1,
  padding: theme.spacing(3),
  transition: theme.transitions.create('margin', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  width: '100%',
  marginRight: 280,
  ...(open && {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 280,
    width: `calc(100% - ${280}px)`,
  }),
  position: 'relative',
}))

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})<{ open: boolean }>(({ theme, open }) => ({
  transition: theme.transitions.create(['margin', 'width'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${280}px)`,
    marginLeft: `${280}px`,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}))

export default LayoutAdmin
