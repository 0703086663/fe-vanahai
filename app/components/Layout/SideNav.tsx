import NextLink from 'next/link'
import { usePathname } from 'next/navigation'
import PropTypes from 'prop-types'
import { Box, Divider, Drawer, IconButton, Stack, styled } from '@mui/material'
import { items } from './items'
import { SideNavItem } from './SideNavItems'
import SimpleBar from 'simplebar-react'
import Image from 'next/image'
import * as React from 'react'
import MenuIcon from '@mui/icons-material/Menu'
const Logo = () => {
  return (
    <Image
      src={'/logo-white.png'}
      alt="Logo"
      width={64}
      height={64}
      className="hover:brightness-90"
    />
  )
}

const Scrollbar = styled(SimpleBar)``
export const SideNav = (props: any) => {
  const { open, setOpenNav } = props
  const pathname = usePathname()
  const content = (
    <Scrollbar
      sx={{
        '& .simplebar-content': {
          height: '100%',
        },
        '& .simplebar-scrollbar:before': {
          background: 'neutral.400',
        },
        '& .simplebar-placeholder': {
          display: 'none',
        },
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          height: '100%',
        }}
      >
        <Box
          sx={{
            p: 3,
            display: 'flex',
            height: '100%',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <Box
            component={NextLink}
            href="/"
            sx={{
              display: 'inline-flex',
              height: 64,
              width: 64,
            }}
          >
            <Logo />
          </Box>
          <IconButton onClick={() => setOpenNav(!open)}>
            <MenuIcon color="primary" />
          </IconButton>
        </Box>
        <Divider sx={{ borderColor: 'neutral.700' }} />
        <Box
          component="nav"
          sx={{
            flexGrow: 1,
            px: 2,
            py: 3,
          }}
        >
          <Stack
            component="ul"
            spacing={0.5}
            sx={{
              listStyle: 'none',
              p: 0,
              m: 0,
            }}
          >
            {items.map((item) => {
              const active = item.path ? pathname === item.path : false
              return (
                <SideNavItem
                  active={active}
                  //   disabled={item?.disabled}
                  //   external={item?.external}
                  icon={item.icon}
                  key={item.title}
                  path={item.path}
                  title={item.title}
                />
              )
            })}
          </Stack>
        </Box>
        <Divider sx={{ borderColor: 'neutral.700' }} />
      </Box>
    </Scrollbar>
  )

  return (
    <Drawer
      sx={{
        width: '280px',
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: '280px',
          boxSizing: 'border-box',
        },
      }}
      variant="persistent"
      anchor="left"
      open={open}
      PaperProps={{
        sx: {
          backgroundColor: '#111927',
          color: 'common.white',
          width: 280,
        },
      }}
    >
      {content}
      {/* <DrawerHeader>{content}</DrawerHeader> */}
    </Drawer>
  )
}

SideNav.propTypes = {
  onClose: PropTypes.func,
  open: PropTypes.bool,
}
