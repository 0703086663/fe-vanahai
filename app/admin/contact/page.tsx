'use client'

import { ContactInterface } from '@/app/interfaces/interface'
import { fetchContact } from '@/app/services/fetchData'
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
import SearchIcon from '@mui/icons-material/Search'
import React, { useEffect, useState } from 'react'
import { useFormik } from 'formik'
import axios from 'axios'
import convertDateToText from '@/app/utils/convertDateToText'

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
          `${process.env.NEXT_PUBLIC_API_LINK}/contact/${values.id}`,
          {
            ...values,
          }
        )
      } else {
        res = await axios.post(`${process.env.NEXT_PUBLIC_API_LINK}/contact`, {
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
  const [contacts, setContacts] = useState<ContactInterface[]>([])
  const [openDialog, setOpenDialog] = useState(false)
  const [searchData, setSearchData] = useState<ContactInterface[]>([])

  const fetchDataAndSetState = async () => {
    const res: ContactInterface[] = await fetchContact()
    setContacts(res)
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
                <Typography variant="h4">Contact Table</Typography>
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
                    placeholder="Search message by subject"
                    inputProps={{ 'aria-label': 'search message by subject' }}
                    onChange={(e) => {
                      const search = searchData.filter(
                        (contact: ContactInterface) =>
                          contact.subject
                            .toLowerCase()
                            .includes(e.target.value.trim().toLowerCase())
                      )
                      setContacts(search)
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
              <Box className="overflow-x-auto">
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>
                        <b>Subject</b>
                      </TableCell>
                      <TableCell>
                        <b>Email</b>
                      </TableCell>
                      <TableCell>
                        <b>Name</b>
                      </TableCell>
                      <TableCell>
                        <b>Message</b>
                      </TableCell>
                      <TableCell>
                        <b>Created at</b>
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {contacts?.map((contact: ContactInterface) => {
                      return (
                        <TableRow hover key={contact.id}>
                          <TableCell>
                            <span
                              className={`capitalize font-semibold ${
                                contact.subject == 'compliment'
                                  ? 'text-[#28a745]'
                                  : contact.subject == 'complaint'
                                  ? 'text-[#dc3545]'
                                  : contact.subject == 'question'
                                  ? 'text-[#007bff]'
                                  : 'text-black'
                              }`}
                            >
                              {contact.subject}
                            </span>
                          </TableCell>
                          <TableCell>{contact.email}</TableCell>
                          <TableCell>{contact.name}</TableCell>
                          <TableCell>{contact.message}</TableCell>
                          <TableCell>
                            {convertDateToText(contact.createdAt)}
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
          Category
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
