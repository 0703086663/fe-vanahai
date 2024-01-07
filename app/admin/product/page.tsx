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
  Chip,
} from '@mui/material'
import { styled } from '@mui/material/styles'
import Dialog from '@mui/material/Dialog'
import { TableCustom } from '@/app/components/Table/Table'
import axios from 'axios'
import CloudUploadIcon from '@mui/icons-material/CloudUpload'
import CloseIcon from '@mui/icons-material/Close'
import Image from 'next/image'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'
import { useFormik } from 'formik'
import _ from 'lodash'
import { CategoryInterface, ProductInterface } from '@/app/interfaces/interface'

const Page = () => {
  const [searchData, setSearchData] = useState<ProductInterface[]>([])
  const [products, setProducts] = useState<ProductInterface[]>([])
  const [category, setCategory] = useState<CategoryInterface[]>([])
  const [openDialog, setOpenDialog] = useState(false)
  const [preview, setPreview] = useState('')
  const [refreshFlag, setRefreshFlag] = useState(false)
  const formik = useFormik({
    initialValues: {
      id: '',
      discountPrice: 0,
      name: '',
      price: 0,
      image: {},
      isDiscount: false,
      isBestSeller: false,
      categoryId: '',
    },
    enableReinitialize: true,
    onSubmit: async (v) => {
      if (v.id) {
        let data
        if (typeof v.image === 'string') {
          data = _.omit(v, 'image')
        } else {
          data = v
        }
        await axios.patch(
          `${process.env.NEXT_PUBLIC_API_LINK}/product/${v?.id}`,
          { ...data },
          {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          }
        )
      } else {
        await axios.post(
          `${process.env.NEXT_PUBLIC_API_LINK}/product`,
          { ...v },
          {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          }
        )
      }
      formik.resetForm()
      setPreview('')
      setRefreshFlag(!refreshFlag)
      setOpenDialog(false)
    },
    validate: (v) => {
      console.log(v.isBestSeller, v.isDiscount)
    },
  })
  const fetchProducts = async () => {
    const res = await axios.get(`${process.env.NEXT_PUBLIC_API_LINK}/product`)
    if (res && res.data) {
      setProducts(res.data)
      setSearchData(res.data)
    }
  }

  const fetchCategory = async () => {
    const res = await axios.get(`${process.env.NEXT_PUBLIC_API_LINK}/category`)
    if (res && res.data) setCategory(res.data)
  }

  const handleDelete = async (id: any) => {
    await axios.delete(`${process.env.NEXT_PUBLIC_API_LINK}/product/${id}`)
    setRefreshFlag(!refreshFlag)
  }

  useEffect(() => {
    fetchCategory()
    fetchProducts()
  }, [refreshFlag])

  let defaultCategory

  if (formik.getFieldMeta('categoryId').value && category) {
    defaultCategory = category.find(
      (option: any) => option.id === formik.getFieldMeta('categoryId').value
    )
  }

  return (
    <>
      <Box
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
                <TextField
                  id="outlined-basic"
                  label="Search"
                  name="search"
                  // autoComplete="off"
                  fullWidth
                  sx={{ paddingBottom: 1, padding: 0 }}
                  variant="outlined"
                  onChange={(e) => {
                    const search = searchData.filter((product: any) =>
                      product.name.includes(e.target.value.trim())
                    )
                    setProducts(search)
                  }}
                />
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
              <Box className="overflow-x-auto">
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Image</TableCell>
                      <TableCell>Name</TableCell>
                      <TableCell>Price</TableCell>
                      <TableCell>Best Seller</TableCell>
                      <TableCell>Discount</TableCell>
                      <TableCell>Discount Price</TableCell>
                      <TableCell>Category</TableCell>
                      <TableCell>Action</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {products?.map((product: ProductInterface) => {
                      return (
                        <TableRow hover key={product.id}>
                          <TableCell>
                            <Image
                              src={product ? product.image : ''}
                              alt={''}
                              priority
                              height={50}
                              width={50}
                            />
                          </TableCell>
                          <TableCell>
                            <Typography variant="subtitle2">
                              {product?.name}
                            </Typography>
                          </TableCell>
                          <TableCell>{product?.price}</TableCell>
                          <TableCell>
                            {product?.isBestSeller.toString() === 'true' ? (
                              <Chip label="Yes" color="success" />
                            ) : (
                              <Chip label="No" color="error" />
                            )}
                          </TableCell>
                          <TableCell>
                            {product?.isDiscount.toString() === 'true' ? (
                              <Chip label="Yes" color="success" />
                            ) : (
                              <Chip label="No" color="error" />
                            )}
                          </TableCell>
                          <TableCell>{product?.discountPrice}</TableCell>
                          <TableCell>
                            {category
                              ? category.find(
                                  (cate: CategoryInterface) =>
                                    product.categoryId === cate.id
                                )?.name
                              : ''}
                          </TableCell>
                          <TableCell>
                            <IconButton
                              onClick={() => {
                                setOpenDialog(true)
                                formik.setValues(product)
                              }}
                            >
                              <EditIcon />
                            </IconButton>
                            <IconButton
                              onClick={() => handleDelete(product.id)}
                            >
                              <DeleteIcon />
                            </IconButton>
                          </TableCell>
                        </TableRow>
                      )
                    })}
                  </TableBody>
                </Table>
              </Box>
            </Card>
          </Stack>
        </Container>
      </Box>

      <BootstrapDialog
        onClose={() => {
          setPreview('')
          formik.resetForm()
          setOpenDialog(false)
        }}
        aria-labelledby="customized-dialog-title"
        open={openDialog}
      >
        <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
          Create Product
        </DialogTitle>
        <IconButton
          aria-label="close"
          onClick={() => {
            setPreview('')
            setOpenDialog(false)
            formik.resetForm()
          }}
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
          encType="multipart/form-data"
          onSubmit={formik.handleSubmit}
          sx={{
            display: 'flex',
            flexDirection: 'column',
            m: 'auto',
            width: 'fit-content',
          }}
        >
          <DialogContent dividers className="flex justify-between gap-2 ">
            <div className="w-1/2">
              <Autocomplete
                disablePortal
                id="combo-box-demo"
                defaultValue={defaultCategory || null}
                onChange={(event, newValue: any) => {
                  formik.setFieldValue('categoryId', newValue?.id || '')
                }}
                options={category ? category : []}
                getOptionLabel={(option) => option?.name}
                sx={{ width: '100%', paddingBottom: 1 }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Category"
                    variant="outlined"
                    name="categoryId"
                  />
                )}
              />
              <TextField
                id="outlined-basic"
                label="Name"
                name="name"
                variant="outlined"
                sx={{ paddingBottom: 1 }}
                fullWidth
                onChange={formik.handleChange}
                value={formik.values.name}
              />
              <TextField
                id="outlined-basic"
                label="Price"
                fullWidth
                type="number"
                sx={{ paddingBottom: 1 }}
                variant="outlined"
                value={formik.values.price}
                name="price"
                onChange={formik.handleChange}
              />
              <TextField
                id="outlined-basic"
                label="Discount Price"
                fullWidth
                sx={{ paddingBottom: 1 }}
                variant="outlined"
                value={formik.values.discountPrice}
                onChange={formik.handleChange}
                name="discountPrice"
                type="number"
              />

              <FormControlLabel
                control={
                  <Switch
                    checked={formik.values.isDiscount}
                    onChange={formik.handleChange}
                  />
                }
                label="Discount"
                // value={formik.values.isDiscount}
                name="isDiscount"
              />
              <FormControlLabel
                control={
                  <Switch
                    checked={formik.values.isBestSeller}
                    onChange={formik.handleChange}
                  />
                }
                label="Best Seller"
                // value={formik.values.isBestSeller}
                name="isBestSeller"
              />
            </div>
            <div className="w-1/2 flex flex-col items-center ">
              <Button
                component="label"
                variant="contained"
                onChange={(event: any) => {
                  const file = event.target.files[0]
                  const object = URL.createObjectURL(file)
                  setPreview(object)
                  formik.setFieldValue('image', file || {})
                }}
                startIcon={<CloudUploadIcon />}
              >
                Upload file
                <VisuallyHiddenInput type="file" name="image" />
              </Button>

              <Image
                width={500}
                height={500}
                src={
                  preview ||
                  (!_.isEmpty(formik.getFieldMeta('image').value) &&
                    formik.getFieldMeta('image').value) ||
                  '/noImage.jpg'
                }
                alt=""
                className="w-full h-full object-contain mt-2 max-h-[290px]"
              />
            </div>
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
