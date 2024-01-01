'use client'
import PlusIcon from '@heroicons/react/24/solid/PlusIcon'
import { useCallback, useEffect, useMemo, useState } from 'react'
import {
  Button,
  Container,
  SvgIcon,
  Avatar,
  Box,
  Card,
  Checkbox,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
} from '@mui/material'

import { TableCustom } from '@/app/components/Table/Table'
import axios from 'axios'

export function applyPagination(
  documents: any,
  page: number,
  rowsPerPage: number
) {
  return documents.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
}

const useData = (initialData: any, page: number, rowsPerPage: number) => {
  const [data, setData] = useState<any>(initialData)

  useEffect(() => {
    const fetchDataAndSetData = async () => {
      const fetchedData = await fetchProducts()
      setData(fetchedData)
    }

    fetchDataAndSetData()
  }, [])

  const paginatedData = useMemo(() => {
    return data && applyPagination(data, page, rowsPerPage)
  }, [data, page, rowsPerPage])

  return paginatedData
}

const fetchProducts = async () => {
  const res = await axios.get(`${process.env.NEXT_PUBLIC_API_LINK}/product`, {
    headers: {
      'Access-Control-Allow-Origin': `${process.env.NEXT_PUBLIC_API_LINK}`,
    },
  })
  return res.data
}

const Page = () => {
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(5)
  const [products, setProducts] = useState()

  const handlePageChange = useCallback((event: any, value: any) => {
    setPage(value)
  }, [])

  const handleRowsPerPageChange = useCallback((event: any) => {
    setRowsPerPage(event.target.value)
  }, [])

  const fetchProducts = async () => {
    const res = await axios.get(`${process.env.NEXT_PUBLIC_API_LINK}/product`, {
      headers: {
        'Access-Control-Allow-Origin': `${process.env.NEXT_PUBLIC_API_LINK}`,
      },
    })
    if (res && res.data) setProducts(res.data)
  }
  const data = useData(products, page, rowsPerPage)

  useEffect(() => {
    fetchProducts()
  }, [])
  return (
    <>
      <Box
        className="px-4, m-10"
        component="main"
        sx={{
          flexGrow: 1,
          py: 8,
        }}
      >
        <Container maxWidth="xl">
          <Stack spacing={3}>
            <Stack direction="row" justifyContent="space-between" spacing={4}>
              <Stack spacing={1}>
                <Typography variant="h4">Products</Typography>
              </Stack>
              <div>
                <Button
                  startIcon={
                    <SvgIcon fontSize="small">
                      <PlusIcon />
                    </SvgIcon>
                  }
                  variant="contained"
                >
                  Add
                </Button>
              </div>
            </Stack>
            <Card>
              <Box sx={{ minWidth: 800 }}>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Name</TableCell>
                      <TableCell>Price</TableCell>
                      <TableCell>image</TableCell>
                      <TableCell>Best Seller</TableCell>
                      <TableCell>Discount</TableCell>
                      <TableCell>discountPrice</TableCell>
                      <TableCell>Category</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {data?.map((customer: any) => {
                      return (
                        <TableRow hover key={customer?.id}>
                          <TableCell>
                            <Stack
                              alignItems="center"
                              direction="row"
                              spacing={2}
                            >
                              <Typography variant="subtitle2">
                                {customer?.name}
                              </Typography>
                            </Stack>
                          </TableCell>
                          <TableCell>{customer?.price}</TableCell>
                          <TableCell>
                            <Avatar src={customer?.image} />
                          </TableCell>
                          <TableCell>{customer?.isBestSeller}</TableCell>
                          <TableCell>{customer?.isDiscount}</TableCell>
                          <TableCell>{customer?.discountPrice}</TableCell>
                          <TableCell>{customer?.categoryId}</TableCell>
                        </TableRow>
                      )
                    })}
                  </TableBody>
                </Table>
              </Box>
              <TablePagination
                component="div"
                count={data?.length}
                onPageChange={handlePageChange}
                onRowsPerPageChange={handleRowsPerPageChange}
                page={page}
                rowsPerPage={rowsPerPage}
                rowsPerPageOptions={[5, 10, 25]}
              />
            </Card>
          </Stack>
        </Container>
      </Box>
    </>
  )
}

export default Page
