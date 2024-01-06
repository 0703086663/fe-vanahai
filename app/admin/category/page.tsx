'use client'

import { CategoryInterface } from '@/app/interfaces/interface'
import { fetchCategory } from '@/app/services/fetchData'
import PlusIcon from '@heroicons/react/24/solid/PlusIcon'
import {
  Box,
  Container,
  Stack,
  Typography,
  Button,
  SvgIcon,
  Card,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TextField,
  Dialog,
  DialogTitle,
  IconButton,
  DialogContent,
  DialogActions,
  Paper,
  InputBase,
} from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'
import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'
import SearchIcon from '@mui/icons-material/Search'
import React, { useEffect, useState } from 'react'
import { useFormik } from 'formik'
import axios from 'axios'

const Page = () => {
  const formik = useFormik({
    initialValues: {
      id: '',
      name: '',
    },
    onSubmit: async (values) => {
      let res
      if (values.id) {
        res = await axios.patch(
          `${process.env.NEXT_PUBLIC_API_LINK}/category/${values.id}`,
          {
            ...values,
          }
        )
      } else {
        res = await axios.post(`${process.env.NEXT_PUBLIC_API_LINK}/category`, {
          ...values,
        })
      }
      if (res) {
        setRefreshFlag(!refreshFlag)
        setOpenDialog(false)
      }
    },
  })
  const [refreshFlag, setRefreshFlag] = useState(false)
  const [categories, setCategories] = useState<CategoryInterface[]>([])
  const [openDialog, setOpenDialog] = useState(false)
  const [searchData, setSearchData] = useState<CategoryInterface[]>([])

  const handleDelete = async (categoryId?: string) => {
    const res = await axios.delete(
      `${process.env.NEXT_PUBLIC_API_LINK}/category/${categoryId}`
    )
    if (res) {
      setRefreshFlag(!refreshFlag)
      setOpenDialog(false)
    }
  }

  const fetchDataAndSetState = async () => {
    const res: CategoryInterface[] = await fetchCategory()
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
                <Typography variant="h4">Category Table</Typography>
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
                    placeholder="Search category by name"
                    inputProps={{ 'aria-label': 'search category by name' }}
                    onChange={(e) => {
                      const search = searchData.filter(
                        (category: CategoryInterface) =>
                          category.name.includes(e.target.value.trim())
                      )
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
              <Box>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>
                        <b>Name</b>
                      </TableCell>
                      <TableCell className="w-[120px]">
                        <b>Action</b>
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {categories?.map((category: CategoryInterface) => {
                      return (
                        <TableRow hover key={category.id}>
                          <TableCell>{category.name}</TableCell>
                          <TableCell>
                            <IconButton
                              onClick={() => {
                                setOpenDialog(true)
                                formik.setValues({ id: '', ...category })
                              }}
                            >
                              <EditIcon />
                            </IconButton>
                            <IconButton
                              onClick={() => handleDelete(category.id)}
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
        }}
        aria-labelledby="customized-dialog-title"
        open={openDialog}
      >
        <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
          Create category
        </DialogTitle>
        <IconButton
          aria-label="close"
          onClick={() => {
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
          component="form"
          onSubmit={formik.handleSubmit}
          sx={{
            display: 'flex',
            flexDirection: 'column',
            m: 'auto',
            width: 'fit-content',
          }}
        >
          <DialogContent dividers>
            <TextField
              id="outlined-basic"
              label="Name"
              variant="outlined"
              sx={{ paddingBottom: 1 }}
              fullWidth
              required
              name="name"
              onChange={formik.handleChange}
              value={formik.values.name}
            />
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
