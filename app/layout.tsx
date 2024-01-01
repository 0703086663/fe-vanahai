import type { Metadata } from 'next'
import { GFS_Didot } from 'next/font/google'
import './globals.css'
import Footer from './components/Footer/Footer'
import Header from './components/Header/Header'

const gfs = GFS_Didot({ weight: '400', subsets: ['greek'] })

export const metadata: Metadata = {
  title: 'Vanahai',
  description: 'Generated by create next app',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={gfs.className}>{children}</body>
    </html>
  )
}
