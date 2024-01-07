import ChartBarIcon from '@heroicons/react/24/solid/ChartBarIcon'
import CogIcon from '@heroicons/react/24/solid/CogIcon'
import LockClosedIcon from '@heroicons/react/24/solid/LockClosedIcon'
import ShoppingBagIcon from '@heroicons/react/24/solid/ShoppingBagIcon'
import UserIcon from '@heroicons/react/24/solid/UserIcon'
import UserPlusIcon from '@heroicons/react/24/solid/UserPlusIcon'
import UsersIcon from '@heroicons/react/24/solid/UsersIcon'
import XCircleIcon from '@heroicons/react/24/solid/XCircleIcon'
import { SvgIcon } from '@mui/material'

export const items = [
  {
    title: 'Categories',
    path: '/admin/category',
    icon: (
      <SvgIcon fontSize="small">
        <ShoppingBagIcon />
      </SvgIcon>
    ),
  },
  {
    title: 'Products',
    path: '/admin/product',
    icon: (
      <SvgIcon fontSize="small">
        <UsersIcon />
      </SvgIcon>
    ),
  },
  {
    title: 'Page content',
    path: '/admin/page-content',
    icon: (
      <SvgIcon fontSize="small">
        <UserIcon />
      </SvgIcon>
    ),
  },
  {
    title: 'Page Image',
    path: '/admin/page-image',
    icon: (
      <SvgIcon fontSize="small">
        <CogIcon />
      </SvgIcon>
    ),
  },
  {
    title: 'Contact',
    path: '/admin/contact',
    icon: (
      <SvgIcon fontSize="small">
        <LockClosedIcon />
      </SvgIcon>
    ),
  },
]
