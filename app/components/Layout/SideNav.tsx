import NextLink from 'next/link'
import { usePathname } from 'next/navigation'
import PropTypes from 'prop-types'
import ArrowTopRightOnSquareIcon from '@heroicons/react/24/solid/ArrowTopRightOnSquareIcon'
import ChevronUpDownIcon from '@heroicons/react/24/solid/ChevronUpDownIcon'
import {
  Box,
  Button,
  Divider,
  Drawer,
  Stack,
  SvgIcon,
  Typography,
  styled,
  useMediaQuery,
} from '@mui/material'
import { items } from './items'
import { SideNavItem } from './SideNavItems'
import SimpleBar from 'simplebar-react'
import Image from 'next/image'
import { useTheme } from '@mui/material/styles'

const Logo = () => {
  const theme = useTheme()
  const fillColor = theme.palette.primary.main

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
        <Box sx={{ p: 3 }}>
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
      anchor="left"
      open={true}
      PaperProps={{
        sx: {
          backgroundColor: '#111927',
          color: 'common.white',
          width: 280,
        },
      }}
      variant="permanent"
    >
      {content}
    </Drawer>
  )
}

SideNav.propTypes = {
  onClose: PropTypes.func,
  open: PropTypes.bool,
}
