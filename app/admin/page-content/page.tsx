'use client'
import { useEffect, useMemo, useState } from 'react'
import {
  Box,
  Button,
  Container,
  SvgIcon,
  Card,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
  DialogTitle,
  IconButton,
  DialogContent,
  DialogActions,
  TextField,
  InputBase,
  Paper,
} from '@mui/material'
import { styled } from '@mui/material/styles'
import Dialog from '@mui/material/Dialog'
import axios from 'axios'
import CloseIcon from '@mui/icons-material/Close'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'
import SearchIcon from '@mui/icons-material/Search'
import { useFormik } from 'formik'
import _ from 'lodash'
import covertToHtmlWithAnimation from '@/app/utils/covertToHtmlWithAnimation'
import 'react-quill/dist/quill.snow.css'
import './styles.css'
import { PageContentInterface } from '@/app/interfaces/interface'
import convertToCamelCase from '@/app/utils/convertToCamelCase'
import dynamic from 'next/dynamic'
import 'react-quill/dist/quill.core.css'

const color = [
  '#000000',
  '#333333',
  '#666666',
  '#999999',
  '#CCCCCC',
  '#FFFFFF',
  '#FF0000',
  '#FF6666',
  '#FFCCCC',
  '#FF9900',
  '#FFCC66',
  '#FFFF99',
  '#00FF00',
  '#66FF66',
  '#CCFFCC',
  '#00FFFF',
  '#66CCCC',
  '#99CCCC',
  '#0000FF',
  '#6666FF',
  '#CCCCFF',
  '#9900FF',
  '#CC66FF',
  '#FF99FF',
  '#FFD700',
  '#FFB900',
  '#FF7F00',
  '#00FF7F',
  '#008080',
  '#800080',
  '#008000',
  '#000080',
  '#800000',
  '#FF6600',
  '#993366',
]

const Page = () => {
  const [value, setValue] = useState('')
  const ReactQuill = useMemo(
    () => dynamic(() => import('react-quill'), { ssr: false }),
    []
  )
  const [searchData, setSearchData] = useState<PageContentInterface[]>([])
  const [contents, setContents] = useState<PageContentInterface[]>([])
  const [openDialog, setOpenDialog] = useState(false)
  const [refreshFlag, setRefreshFlag] = useState(false)

  const formik = useFormik({
    initialValues: {
      id: '',
      page: '',
      slug: '',
      content: '',
    },
    enableReinitialize: true,
    onSubmit: async (v) => {
      if (v.id) {
        await axios.patch(
          `${process.env.NEXT_PUBLIC_API_LINK}/page-content/${v?.id}`,
          {
            ...v,
            content: value,
          }
        )
      }
      formik.resetForm()
      setRefreshFlag(!refreshFlag)
      setOpenDialog(false)
    },
  })
  const fetchContents = async () => {
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_API_LINK}/page-content`
    )
    if (res && res.data) {
      setContents(res.data)
      setSearchData(res.data)
    }
  }

  useEffect(() => {
    fetchContents()
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
                <Typography variant="h4">Contents</Typography>
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
                        (page: PageContentInterface) =>
                          convertToCamelCase(page.page)
                            .toLowerCase()
                            .includes(e.target.value.trim().toLowerCase())
                      )
                      setContents(search)
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
              <Box sx={{ overflowX: 'auto' }}>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>
                        <b>Page</b>
                      </TableCell>
                      <TableCell>
                        <b>Position</b>
                      </TableCell>
                      <TableCell>
                        <b>Content</b>
                      </TableCell>
                      <TableCell>
                        <b>Action</b>
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {contents?.map((content: PageContentInterface) => {
                      return (
                        <TableRow hover key={content.id}>
                          <TableCell>
                            {convertToCamelCase(content?.page)}
                          </TableCell>

                          <TableCell>
                            {convertToCamelCase(content?.slug)}
                          </TableCell>
                          <TableCell>
                            {covertToHtmlWithAnimation(content?.content)}
                          </TableCell>
                          <TableCell>
                            <IconButton
                              onClick={() => {
                                setOpenDialog(true)
                                setValue(content?.content)
                                formik.setValues(content)
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
        }}
        aria-labelledby="customized-dialog-title"
        open={openDialog}
        maxWidth="lg"
        fullWidth
      >
        <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
          Update content
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
          noValidate
          component="form"
          encType="multipart/form-data"
          onSubmit={formik.handleSubmit}
          sx={{
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <DialogContent dividers>
            <ReactQuill
              theme="snow"
              value={value}
              onChange={setValue}
              modules={{
                toolbar: {
                  container: [
                    [
                      {
                        size: [],
                      },
                    ],
                    ['bold', 'italic', 'underline', 'strike'],
                    [
                      'blockquote',
                      {
                        color,
                      },
                    ],
                  ],
                },
              }}
            />
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

export default Page
