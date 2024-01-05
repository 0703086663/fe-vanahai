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
  TablePagination,
  TextField,
  Dialog,
  DialogTitle,
  IconButton,
  DialogContent,
  DialogActions,
} from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'

import React, { useCallback, useEffect, useMemo, useState } from 'react'
import axios from 'axios'

function applyPagination(
  documents: CategoryInterface[],
  page: number,
  rowsPerPage: number
) {
  return documents.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
}

const useData = (
  initialData: CategoryInterface[],
  page: number,
  rowsPerPage: number
) => {
  const [data, setData] = useState<CategoryInterface[]>(initialData)

  useEffect(() => {
    const fetchDataAndSetState = async () => {
      const res: CategoryInterface[] = await fetchCategory()
      setData(res)
    }

    fetchDataAndSetState()
  }, [])

  const paginatedData = useMemo(() => {
    return data && applyPagination(data, page, rowsPerPage)
  }, [data, page, rowsPerPage])

  return paginatedData
}

const Page = () => {
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(5)
  const [categories, setCategories] = useState<CategoryInterface[]>([])
  const [openDialog, setOpenDialog] = useState(false)
  const [dataForm, setDataForm] = useState<CategoryInterface>({
    name: '',
  })
  const handlePageChange = useCallback(
    (
      e: React.MouseEvent<HTMLButtonElement, MouseEvent> | null,
      value: number
    ) => {
      setPage(value)
    },
    []
  )

  const handleRowsPerPageChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setRowsPerPage(+e.target.value)
    },
    []
  )

  const data = useData(categories, page, rowsPerPage)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const res = await axios.post(
      `${process.env.NEXT_PUBLIC_API_LINK}/category`,
      {
        name: dataForm.name,
      }
    )

    return res.data
  }

  useEffect(() => {
    const fetchDataAndSetState = async () => {
      const res: CategoryInterface[] = await fetchCategory()
      setCategories(res)
    }

    fetchDataAndSetState()
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
                <Typography variant="h4">Category Table</Typography>
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
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {data?.map((category: CategoryInterface) => {
                      return (
                        <TableRow hover key={category?.id}>
                          <TableCell>{category?.name}</TableCell>
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

      <Dialog
        onClose={() => setOpenDialog(false)}
        aria-labelledby="customized-dialog-title"
        open={openDialog}
      >
        <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
          Create category
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
              value={dataForm.name}
              onChange={(e) =>
                setDataForm({
                  name: e.target.value,
                })
              }
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
