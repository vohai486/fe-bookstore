import * as React from 'react'
import Dialog from '@mui/material/Dialog'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import Slide from '@mui/material/Slide'
import { Box, IconButton, styled } from '@mui/material'
import InputField from '../form-control/InputField'
import SelectField from '../form-control/SelectField'
import PickerDate from '../form-control/PickerDate/Index'
import dayjs from 'dayjs'
import categoriesApi from '@/api/axiosCategory'
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate'
import ReactQuill, { Quill } from 'react-quill'
import 'react-quill/dist/quill.snow.css'
import 'react-quill/dist/quill.snow.css'
import { useState } from 'react'
import bookApi from '@/api/axiosBook'
import { toast } from 'react-toastify'
import { getImage } from '@/utils/common'
import ConfirmMsg from '../ConfirmMsg'
const Transition = React.forwardRef(function Transition(props, ref) {
  return (
    <Slide
      direction="up"
      ref={ref}
      {...props}
    />
  )
})
const BoxMain = styled(Dialog)(({ theme }) => ({
  '.MuiDialog-container': {
    alignItems: 'center',
    padding: '4rem 0',
    '.MuiPaper-root': {
      padding: '1rem 1rem',
      width: '800px',
      borderRadius: 0,
    },
    '.add-book': {
      '.content': {
        display: 'flex',
        gap: '2rem',
        '.left': {
          flex: 3,
          '.category': {
            display: 'flex',
            gap: '.5rem',
            div: {
              width: '100%',
            },
          },
          '.upload-text': {
            '.error-text': {
              color: theme.palette.red1.main,
            },
          },
          '.image': {
            width: '100%',
            height: '300px',
            border: '.125rem dashed rgba(231,234,243,.7)',
            '&.error': {
              borderColor: theme.palette.red1.main,
            },
            position: 'relative',
            svg: {
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%,-50%)',
              fontSize: '2rem',
            },
            img: {
              margin: 'auto',
              height: '100%',
              objectFit: 'cover',
            },
          },
        },
        '.right': {
          flex: 1,
        },
      },
      '.text-editor': {
        marginTop: '1rem',
        width: '100%',
        '.ql-editor': {
          height: '400px',
        },
      },
      '.btn-action': {
        margin: '2rem 0',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '.5rem',
        button: {
          border: 'none',
          width: '200px',
          height: '36px',
          background: theme.palette.blue1.main,
          color: theme.palette.background.main,
          '&.delete': {
            background: theme.palette.red1.main,
          },
        },
      },

      select: {
        marginBottom: '1rem',
      },
      '.MuiFormControl-root': {
        marginBottom: '1rem',
        input: {
          padding: '.5rem 1rem',
        },

        width: '100%',
      },
    },
  },
}))
const arr = [
  0, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55, 60, 65, 70, 75, 80, 85, 90, 95,
]
const SUPPORTED_FORMATS = ['image/jpg', 'image/jpeg', 'image/gif', 'image/png']
export default function ModalProduct({
  open,
  setOpen,
  item,
  setCurrentItem,
  getProducts,
  page,
  setListBook,
}) {
  const schema = yup.object().shape({
    name: yup.string().required('Không được bỏ trống'),
    original_price: yup
      .number()
      .min(1, 'Phải lớn hơn 0')
      .required('Không được bỏ trống'),
    file:
      !item?._id &&
      yup
        .mixed()
        .test(
          'required',
          'Vui lòng chọn hình ảnh',
          (value) => value && value.length
        )
        .test('fileFormat', 'Chỉ hỗ trợ loại jpg, jpeg, gif, png', (value) => {
          return value && SUPPORTED_FORMATS.includes(value[0]?.type)
        }),
    categoryId: yup.string().required('Không được bỏ trống'),
  })
  const form = useForm({
    defaultValues: {
      name: item.name || '',
      countInStock: item?.countInStock || 0,
      original_price: item?.original_price || 0,
      discount_rate: item?.discount_rate || 0,
      cover: item?.cover || '',
      pages: item?.pages || 0,
      size: item?.size || '',
      publishingYear: dayjs(`01 01 ${item?.publishingYear}` || new Date()),
      author: item.author || '',
      company: item.company || '',
      publisher: item.publisher || '',
      categoryId: item.categoryId || '',
    },
    resolver: yupResolver(schema),
    mode: 'onChange',
  })
  const { register } = form
  const [openConfirm, setOpenConfirm] = useState(false)
  const [value, setValue] = useState('')
  const [listCategory, setListCategory] = useState([])
  React.useEffect(() => {
    ;(async () => {
      const res = await categoriesApi.getCategory()
      setListCategory(res.data.data)
    })()
  }, [])
  const handleSubmit = async (values) => {
    const clone = { ...values }
    clone.description = value
    if (dayjs(values.publishingYear, 'DD-MM-YYYY', true).isValid()) {
      clone.publishingYear = +clone.publishingYear.$y
    } else {
      delete clone.publishingYear
    }
    delete clone.file
    clone.image = form.watch('file')[0]
    try {
      const res = await (item?._id
        ? bookApi.updateBook(clone, item._id)
        : bookApi.createBook(clone))
      setOpen(false)
      toast.success(
        item?._id ? 'Cập nhập sản phẩm thành công' : 'Thêm sách thành công'
      )
      getProducts()
      setCurrentItem({})
    } catch (error) {
      console.log(error)
    }
  }

  const imageHandler = (e) => {
    const input = document.createElement('input')
    input.setAttribute('type', 'file')
    input.setAttribute('accept', 'image/*')
    input.click()

    input.onchange = async () => {
      const file = input.files[0]
      if (file) {
        const range = quillRef.current.getEditor().getSelection(true)

        quillRef.current.getEditor().setSelection(range.index + 1)

        const data = new FormData()
        data.append('file', file)
        data.append('upload_preset', 'gygnrg1o')
        let res = await fetch(
          'https://api.cloudinary.com/v1_1/dxfacytqp/image/upload',
          {
            method: 'post',
            body: data,
          }
        )
        const urlData = await res.json()

        quillRef.current
          .getEditor()
          .insertEmbed(range.index, 'image', urlData.url)
      } else {
        ErrorToast('You could only upload images.')
      }
    }
  }

  const modules = React.useMemo(
    () => ({
      toolbar: {
        container: [
          [{ header: '1' }, { header: '2' }, { font: [] }],
          [
            { align: '' },
            { align: 'center' },
            { align: 'right' },
            { align: 'justify' },
          ],
          ['bold', 'italic', 'underline', 'strike', 'blockquote'],
          [
            { color: ['#eeeeee', '#0D5CB6B6', '#ff424e'] },
            { background: ['#eeeeee', '#0D5CB6B6'] },
          ],
          [{ header: [1, 2, 3, 4, 5, 6, false] }],
          [
            { list: 'ordered' },
            { list: 'bullet' },
            { indent: '-1' },
            { indent: '+1' },
          ],
          ['link', 'image', 'video', 'code-block'],
          ['clean'],
        ],
        handlers: {
          image: imageHandler,
        },
      },

      clipboard: {
        // toggle to add extra line breaks when pasting HTML:
        matchVisual: false,
      },
    }),
    []
  )
  const quillRef = React.useRef()

  const preview =
    !!form.watch('file') &&
    form.watch('file').length > 0 &&
    URL.createObjectURL(form.watch('file')[0])
  const handleDelete = async () => {
    try {
      const res = await bookApi.deleteBook(item._id)
      setOpen(false)
      await getProducts()
      toast.success('Xóa Sách thành công')
      setCurrentItem({})
    } catch (error) {}
  }
  return (
    <BoxMain
      open={open}
      TransitionComponent={Transition}
      aria-describedby="alert-dialog-slide-description"
      disableEscapeKeyDown={true}
    >
      <ConfirmMsg
        open={openConfirm}
        setOpen={setOpenConfirm}
        title="Bạn muốn xóa sách này không?"
        handleDelete={handleDelete}
      ></ConfirmMsg>
      <Box className="box-container">
        <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
          <IconButton
            onClick={() => {
              setOpen(false)
              setCurrentItem({})
            }}
          >
            X
          </IconButton>
        </Box>
        <form
          className="add-book"
          onReset={() => setOpenConfirm(true)}
          onSubmit={form.handleSubmit(handleSubmit)}
        >
          <Box className="content">
            <div className="left">
              <Box>Tên Sách:</Box>
              <InputField
                form={form}
                name="name"
                variant="outlined"
              ></InputField>
              <Box className="category">
                <Box>
                  <Box>Danh mục:</Box>
                  <SelectField
                    placeholder="Chọn danh mục"
                    arr={listCategory}
                    form={form}
                    name="categoryId"
                    type={3}
                    // setFiled={setIdCate1}
                  ></SelectField>
                </Box>
                <Box>
                  <Box>Tác giả:</Box>
                  <InputField
                    form={form}
                    name="author"
                    variant="outlined"
                  ></InputField>
                </Box>
              </Box>
              <Box className="category">
                <Box>
                  <Box>Công ty phát hành: </Box>
                  <InputField
                    form={form}
                    name="company"
                    variant="outlined"
                  ></InputField>
                </Box>
                <Box>
                  <Box>Nhà xuất bản:</Box>
                  <InputField
                    form={form}
                    name="publisher"
                    variant="outlined"
                  ></InputField>
                </Box>
              </Box>
              <Box className="upload-text">
                <label
                  htmlFor="idImage"
                  style={{ textDecoration: 'underline' }}
                >
                  Upload hình ảnh tại đây:{' '}
                </label>
                {form.formState.errors['file'] && (
                  <span className="error-text">
                    {form.formState.errors['file'].message}
                  </span>
                )}
                <input
                  id="idImage"
                  {...register('file')}
                  hidden
                  type="file"
                  accept="image/png, image/jpeg"
                />
              </Box>
              <Box
                className={`${
                  form.formState.errors['file'] ? 'error' : ''
                }   image`}
              >
                {preview || item?.thumbnail_url ? (
                  <img
                    src={
                      preview ? preview : getImage('books', item?.thumbnail_url)
                    }
                    alt=""
                  />
                ) : (
                  <AddPhotoAlternateIcon />
                )}
              </Box>
            </div>
            <div className="right">
              <Box>Giá gốc:</Box>
              <InputField
                form={form}
                type="number"
                name="original_price"
                variant="outlined"
              ></InputField>
              {item?._id && (
                <>
                  <Box>Số lượng Nhập kho:</Box>
                  <InputField
                    disabled={true}
                    form={form}
                    type="number"
                    name="countInStock"
                    variant="outlined"
                  ></InputField>
                </>
              )}
              <Box>Giảm giá:</Box>
              <SelectField
                form={form}
                name="discount_rate"
                arr={arr}
              />
              <Box>Loại bìa:</Box>
              <SelectField
                form={form}
                name="cover"
                arr={['Bìa cứng', 'Bìa mềm', 'Bìa gập']}
              />
              <Box>Số trang:</Box>
              <InputField
                form={form}
                type="number"
                name="pages"
                variant="outlined"
              ></InputField>
              <Box>Kích thước:</Box>
              <InputField
                form={form}
                name="size"
                variant="outlined"
              ></InputField>
              <Box>Năm xuất bản:</Box>
              <PickerDate
                type="year"
                form={form}
                name="publishingYear"
              />
            </div>
          </Box>
          <Box className="text-editor">
            {form.formState.errors.description && (
              <span>This field is required</span>
            )}
            <ReactQuill
              ref={quillRef}
              modules={modules}
              value={value || item?.description}
              onChange={setValue}
              // formats={formats}
              theme="snow"
            ></ReactQuill>
          </Box>
          <Box className="btn-action">
            <button type="submit">{item?._id ? 'Cập nhập' : 'Thêm'}</button>
            {!!item?._id && (
              <button
                type="reset"
                className="delete"
              >
                Delete
              </button>
            )}
          </Box>
        </form>
      </Box>
    </BoxMain>
  )
}
