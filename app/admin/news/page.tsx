'use client'

import { NewInterface } from '@/app/interfaces/interface'
import PlusIcon from '@heroicons/react/24/solid/PlusIcon'
import { fetchNew } from '@/app/services/fetchData'
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
  SvgIcon,
  TextField,
  styled,
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
import DeleteIcon from '@mui/icons-material/Delete'
import convertDateToText from '@/app/utils/convertDateToText'

const Page = () => {
  const formik: any = useFormik({
    initialValues: {
      id: '',
      image: '',
      name: '',
      description: '',
    },
    onSubmit: async (v) => {
      if (v.id) {
        let data
        if (typeof v.image === 'string') {
          data = _.omit(v, 'image')
        } else {
          data = v
        }
        await axios.patch(
          `${process.env.NEXT_PUBLIC_API_LINK}/new/${v?.id}`,
          { ...data },
          {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          }
        )
      } else {
        await axios.post(
          `${process.env.NEXT_PUBLIC_API_LINK}/new`,
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
  })
  const [refreshFlag, setRefreshFlag] = useState(false)
  const [news, setNews] = useState<NewInterface[]>([])
  const [openDialog, setOpenDialog] = useState(false)
  const [searchData, setSearchData] = useState<NewInterface[]>([])
  const [preview, setPreview] = useState('')

  const fetchDataAndSetState = async () => {
    const res: NewInterface[] = await fetchNew()
    setNews(res)
    setSearchData(res)
  }

  const handleDelete = async (id: any) => {
    await axios.delete(`${process.env.NEXT_PUBLIC_API_LINK}/new/${id}`)
    setRefreshFlag(!refreshFlag)
  }

  useEffect(() => {
    fetchDataAndSetState()
  }, [refreshFlag])

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
                <Typography variant="h4">News Table</Typography>
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
                      const search = searchData.filter((news: NewInterface) =>
                        news.name.includes(e.target.value.trim())
                      )

                      setNews(search)
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
                      <TableCell>
                        <b>Image</b>
                      </TableCell>
                      <TableCell>
                        <b>Name</b>
                      </TableCell>
                      <TableCell>
                        <b>Description</b>
                      </TableCell>
                      <TableCell>
                        <b>Created At</b>
                      </TableCell>
                      <TableCell className="w-[50px]">
                        <b>Action</b>
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {news &&
                      news
                        .sort(
                          (a, b) =>
                            new Date(b.createdAt).getTime() -
                            new Date(a.createdAt).getTime()
                        )
                        .map((newValue: NewInterface) => {
                          return (
                            <TableRow hover key={newValue.id}>
                              <TableCell>
                                <Image
                                  src={newValue.image}
                                  height={100}
                                  width={100}
                                  alt=""
                                />
                              </TableCell>
                              <TableCell>{newValue.name}</TableCell>
                              <TableCell>{newValue.description}</TableCell>
                              <TableCell>
                                {convertDateToText(newValue.createdAt)}
                              </TableCell>
                              <TableCell>
                                <IconButton
                                  onClick={() => {
                                    setOpenDialog(true)
                                    formik.setValues(newValue)
                                  }}
                                >
                                  <EditIcon />
                                </IconButton>
                                <IconButton
                                  onClick={() => handleDelete(newValue.id)}
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
          Create New
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
                label="Description"
                name="description"
                variant="outlined"
                sx={{ paddingBottom: 1 }}
                fullWidth
                onChange={formik.handleChange}
                multiline
                rows={4}
                value={formik.values.description}
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
      </Dialog>
    </>
  )
}

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
