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
  DialogTitle,
  IconButton,
  DialogContent,
  DialogActions,
  TextField,
  FormControlLabel,
  Switch,
  Autocomplete,
} from '@mui/material'
import { styled } from '@mui/material/styles'
import Dialog from '@mui/material/Dialog'
import { TableCustom } from '@/app/components/Table/Table'
import axios from 'axios'
import CloudUploadIcon from '@mui/icons-material/CloudUpload'
import CloseIcon from '@mui/icons-material/Close'
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
  const [category, setCategory] = useState()
  const [openDialog, setOpenDialog] = useState(false)
  const [dataForm, setDataForm] = useState<any>({
    discountPrice: '',
    name: '',
    price: '',
    image: {},
    isDiscount: false,
    isBestseller: false,
    categoryId: '',
  })
  const [selectedFileName, setSelectedFileName] = useState('')

  const handlePageChange = useCallback((event: any, value: any) => {
    setPage(value)
  }, [])

  const handleRowsPerPageChange = useCallback((event: any) => {
    setRowsPerPage(event.target.value)
  }, [])

  const fetchCategory = async () => {
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_API_LINK}/category`,
      {
        headers: {
          'Access-Control-Allow-Origin': `${process.env.NEXT_PUBLIC_API_LINK}`,
        },
      }
    )
    if (res && res.data) setCategory(res.data)
  }
  const data = useData(products, page, rowsPerPage)

  const handleSubmit = async (e: any) => {
    console.log('datafor,', dataForm)
    e.preventDefault()
    const res = await axios.post(
      `${process.env.NEXT_PUBLIC_API_LINK}/product`,
      { data: dataForm },
      {
        headers: {
          'Access-Control-Allow-Origin': `${process.env.NEXT_PUBLIC_API_LINK}`,
        },
      }
    )

    console.log('v', res)
  }

  useEffect(() => {
    fetchCategory()
  }, [])
  console.log('cate', category)
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
                  onClick={() => setOpenDialog(true)}
                  color="primary"
                  variant="outlined"
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

      <BootstrapDialog
        onClose={() => setOpenDialog(false)}
        aria-labelledby="customized-dialog-title"
        open={openDialog}
      >
        <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
          Modal title
        </DialogTitle>
        <IconButton
          aria-label="close"
          onClick={() => setOpenDialog(false)}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
        <Box
          noValidate
          component="form"
          onSubmit={handleSubmit}
          encType="multipart/form-data"
          sx={{
            display: 'flex',
            flexDirection: 'column',
            m: 'auto',
            width: 'fit-content',
          }}
        >
          <DialogContent dividers>
            <Autocomplete
              disablePortal
              id="combo-box-demo"
              // value={dataForm.categoryId}
              onChange={(event, newValue) => {
                setDataForm({
                  ...dataForm,
                  categoryId: newValue?.id,
                })
              }}
              options={category ? category : []}
              getOptionLabel={(option) => option?.name}
              sx={{ width: 300, paddingBottom: 1 }}
              renderInput={(params) => (
                <TextField {...params} label="Category" variant="outlined" />
              )}
            />
            <TextField
              id="outlined-basic"
              label="Name"
              variant="outlined"
              sx={{ paddingBottom: 1 }}
              fullWidth
              value={dataForm.name}
              onChange={(e) =>
                setDataForm({
                  ...dataForm,
                  name: e.target.value,
                })
              }
            />{' '}
            <TextField
              id="outlined-basic"
              label="discountPrice"
              fullWidth
              sx={{ paddingBottom: 1 }}
              variant="outlined"
              value={dataForm.id}
              onChange={(e) =>
                setDataForm({
                  ...dataForm,
                  discountPrice: e.target.value,
                })
              }
            />
            <TextField
              id="outlined-basic"
              label="Price"
              fullWidth
              sx={{ paddingBottom: 1 }}
              variant="outlined"
              value={dataForm.price}
              onChange={(e) =>
                setDataForm({
                  ...dataForm,
                  price: e.target.value,
                })
              }
            />
            <FormControlLabel
              control={<Switch />}
              label="Discount"
              value={dataForm.isDiscount}
              onChange={(e: any) =>
                setDataForm({
                  ...dataForm,
                  isDiscount: e.target.checked,
                })
              }
            />
            <FormControlLabel
              control={<Switch />}
              label="Best Seller"
              value={dataForm.isBestSeller}
              onChange={(e: any) =>
                setDataForm({
                  ...dataForm,
                  isBestSeller: e.target.checked,
                })
              }
            />
            <Button
              component="label"
              variant="contained"
              onChange={(event) => {
                const file = event.target.files[0]
                const fileData = new FormData()
                fileData.append('file', file)

                setSelectedFileName(file ? file.name : '')
                setDataForm({ ...dataForm, image: fileData })
              }}
              startIcon={<CloudUploadIcon />}
            >
              Upload file
              <VisuallyHiddenInput type="file" />
            </Button>
            {selectedFileName && <p>Selected File: {selectedFileName}</p>}
          </DialogContent>
          <DialogActions>
            <Button type="submit" autoFocus>
              Save changes
            </Button>
          </DialogActions>
        </Box>
      </BootstrapDialog>
    </>
  )
}

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}))

const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1,
})

export default Page
