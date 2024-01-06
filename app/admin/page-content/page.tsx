'use client'
import PlusIcon from '@heroicons/react/24/solid/PlusIcon'
import { useCallback, useEffect, useMemo, useState } from 'react'
import {
  Button,
  Container,
  SvgIcon,
  Box,
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
} from '@mui/material'
import { styled } from '@mui/material/styles'
import Dialog from '@mui/material/Dialog'
import axios from 'axios'
import CloseIcon from '@mui/icons-material/Close'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'
import { useFormik } from 'formik'
import _ from 'lodash'
import covertToHtmlWithAnimation from '@/app/utils/covertToHtmlWithAnimation'
import { Editor } from 'react-draft-wysiwyg'
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css'
import {
  EditorState,
  convertToRaw,
  ContentState,
  convertFromHTML,
} from 'draft-js'
import draftToHtml from 'draftjs-to-html'
import ColorPic from '@/app/components/color'

const Page = () => {
  const [searchData, setSearchData] = useState()
  const [contents, setContents] = useState()
  const [openDialog, setOpenDialog] = useState(false)
  const [editorState, setEditorState] = useState(EditorState.createEmpty())
  const [refreshFlag, setRefreshFlag] = useState(false)

  const onEditorStateChange = (newEditorState: any) => {
    setEditorState(newEditorState)
  }
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
            content: draftToHtml(convertToRaw(editorState.getCurrentContent())),
          }
        )
      }
      formik.resetForm()
      setRefreshFlag(!refreshFlag)
      setOpenDialog(false)
      setEditorState(EditorState.createEmpty())
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
                {/* <TextField
                  id="outlined-basic"
                  label="Search"
                  fullWidth
                  sx={{ paddingBottom: 1, padding: 0 }}
                  variant="outlined"
                  onChange={(e) => {
                    const search = searchData.filter((content: any) =>
                      content.name.includes(e.target.value.trim())
                    )
                    setContents(search)
                  }}
                /> */}
              </Stack>
            </Stack>
            <Card>
              <Box sx={{ overflowX: 'auto' }}>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>page</TableCell>
                      <TableCell>slug</TableCell>
                      <TableCell>content</TableCell>
                      <TableCell>Action</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {contents?.map((content: any) => {
                      return (
                        <TableRow hover key={content.id}>
                          <TableCell>{content?.page}</TableCell>

                          <TableCell>{content?.slug}</TableCell>
                          <TableCell>
                            {covertToHtmlWithAnimation(content?.content)}
                          </TableCell>
                          <TableCell>
                            <IconButton
                              onClick={() => {
                                setOpenDialog(true)
                                const blocksFromHTML = convertFromHTML(
                                  content?.content
                                )
                                const contentState =
                                  ContentState.createFromBlockArray(
                                    blocksFromHTML.contentBlocks,
                                    blocksFromHTML.entityMap
                                  )
                                setEditorState(
                                  EditorState.createWithContent(contentState)
                                )
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
          Modal title
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
            m: 'auto',
            width: 'fit-content',
          }}
        >
          <DialogContent dividers className="h-[500px] ">
            <Editor
              editorState={editorState}
              wrapperClassName="demo-wrapper"
              editorClassName="demo-editor"
              toolbarClassName="demo-toolbar-custom"
              onEditorStateChange={onEditorStateChange}
              toolbar={{
                colorPicker: { component: ColorPic },
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
