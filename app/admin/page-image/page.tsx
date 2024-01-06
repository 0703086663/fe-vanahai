'use client'

import { PageImageInterface } from '@/app/interfaces/interface'
import { fetchPageImage } from '@/app/services/fetchData'
import {
  Box,
  Container,
  Stack,
  Typography,
  Button,
  Card,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Dialog,
  DialogTitle,
  IconButton,
  DialogContent,
  DialogActions,
  Paper,
  InputBase,
} from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'
import EditIcon from '@mui/icons-material/Edit'
import SearchIcon from '@mui/icons-material/Search'
import CloudUploadIcon from '@mui/icons-material/CloudUpload'
import React, { useEffect, useState } from 'react'
import { useFormik } from 'formik'
import axios from 'axios'
import Image from 'next/image'
import convertToCamelCase from '@/app/utils/convertToCamelCase'
import _ from 'lodash'

const Page = () => {
  const formik = useFormik({
    initialValues: {
      id: '',
      image: '',
      page: '',
      slug: '',
    },
    onSubmit: async (values) => {
      let res
      if (preview) {
        res = await axios.patch(
          `${process.env.NEXT_PUBLIC_API_LINK}/page-image/${values.id}`,
          {
            ...values,
          },
          {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          }
        )
      }
      if (res) {
        setRefreshFlag(!refreshFlag)
      }
      setPreview('')
      setOpenDialog(false)
    },
  })
  const [refreshFlag, setRefreshFlag] = useState(false)
  const [categories, setCategories] = useState<PageImageInterface[]>([])
  const [openDialog, setOpenDialog] = useState(false)
  const [searchData, setSearchData] = useState<PageImageInterface[]>([])
  const [preview, setPreview] = useState('')

  const fetchDataAndSetState = async () => {
    const res: PageImageInterface[] = await fetchPageImage()
    setCategories(res)
    setSearchData(res)
  }

  useEffect(() => {
    fetchDataAndSetState()
  }, [refreshFlag])

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
                <Typography variant="h4">Page Image Table</Typography>
                <Paper
                  component="form"
                  sx={{
                    p: '2px 4px',
                    display: 'flex',
                    alignItems: 'center',
                  }}
                >
                  <InputBase
                    sx={{ ml: 1, flex: 1 }}
                    placeholder="Search page by name"
                    inputProps={{ 'aria-label': 'search page by name' }}
                    onChange={(e) => {
                      const search = searchData.filter(
                        (page: PageImageInterface) =>
                          convertToCamelCase(page.page)
                            .toLowerCase()
                            .includes(e.target.value.trim().toLowerCase())
                      )
                      console.log(search)
                      setCategories(search)
                    }}
                  />
                  <IconButton
                    type="button"
                    sx={{ p: '10px' }}
                    aria-label="search"
                  >
                    <SearchIcon />
                  </IconButton>
                </Paper>
              </Stack>
            </Stack>
            <Card>
              <Box
                sx={{
                  overflowX: 'auto',
                }}
              >
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>
                        <b>Image</b>
                      </TableCell>
                      <TableCell>
                        <b>Page</b>
                      </TableCell>
                      <TableCell>
                        <b>Position</b>
                      </TableCell>
                      <TableCell className="w-[50px]">
                        <b>Action</b>
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {categories?.map((category: PageImageInterface) => {
                      return (
                        <TableRow hover key={category.id}>
                          <TableCell>
                            <Image
                              src={category.image}
                              height={100}
                              width={100}
                              alt=""
                            />
                          </TableCell>
                          <TableCell>
                            {convertToCamelCase(category.page)}
                          </TableCell>
                          <TableCell>
                            {convertToCamelCase(category.slug)}
                          </TableCell>
                          <TableCell>
                            <IconButton
                              onClick={() => {
                                setOpenDialog(true)
                                formik.setValues({ id: '', ...category })
                              }}
                            >
                              <EditIcon />
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

      <Dialog
        onClose={() => {
          formik.resetForm()
          setOpenDialog(false)
          setPreview('')
        }}
        aria-labelledby="customized-dialog-title"
        open={openDialog}
      >
        <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
          Update image
        </DialogTitle>
        <IconButton
          aria-label="close"
          onClick={() => {
            setOpenDialog(false)
            formik.resetForm()
            setPreview('')
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
          component="form"
          onSubmit={formik.handleSubmit}
          sx={{
            m: 'auto',
          }}
        >
          <DialogContent dividers>
            <div className="flex flex-col items-center ">
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
                <input hidden type="file" name="image" />
              </Button>
              {/*eslint-disable-next-line @next/next/no-img-element*/}
              <img
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
              Save
            </Button>
          </DialogActions>
        </Box>
      </Dialog>
    </>
  )
}

export default Page
