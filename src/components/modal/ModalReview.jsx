import * as React from 'react'
import Dialog from '@mui/material/Dialog'

import { Box, Rating, styled, Typography, Zoom } from '@mui/material'
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined'
import { useDispatch } from 'react-redux'
import StarBorderOutlinedIcon from '@mui/icons-material/StarBorderOutlined'
import CameraAltOutlinedIcon from '@mui/icons-material/CameraAltOutlined'
import { getImage } from '@/utils/common'
import reviewApi from '@/api/axiosReview'
import { toast } from 'react-toastify'
import { createNotifyAdmin } from '@/redux/notifySlice'
import { unwrapResult } from '@reduxjs/toolkit'
import { useSocket } from '@/contexts/socketContext'
import notifyApi from '@/api/axiosNotify'
const Transition = React.forwardRef(function Transition(props, ref) {
  return (
    <Zoom
      timeout={500}
      ref={ref}
      {...props}
    />
  )
})
const ModalStyled = styled(Dialog)(({ theme }) => ({
  '.MuiDialog-container': {
    alignItems: 'center',
    '.MuiDialog-paper': {
      minWidth: '605px',
      [theme.breakpoints.down(678)]: {
        minWidth: '400px',
      },
      [theme.breakpoints.down(443)]: {
        minWidth: '350px',
      },
      color: theme.palette.black.main,
      borderRadius: '0.25rem',
      '.list-write': {
        overflow: 'hidden',
        overflowY: 'scroll',
        padding: '0 1rem',
        fontSize: '0.875rem',
        width: '100%',
        height: '450px',
      },
      '.modal-title': {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: '2rem',
        '.image': {
          display: 'flex',
          paddingRight: '2rem',
          alignItems: 'center',
          gap: '.5rem',
          img: {
            width: '40px',
            height: '40px',
            objectFit: 'cover',
          },
        },
      },
      '.write-review__heading': {
        display: 'flex',
        justifyContent: 'center',
        fontSize: '1.125rem',
        marginBottom: '0.75rem',
      },
      '.write-review__star': {
        display: 'flex',
        justifyContent: 'center',
        span: {
          fontSize: '3.5rem',
        },
      },
      textarea: {
        border: `1px solid ${theme.palette.white2.main}`,
        resize: 'none',
        padding: '0.75rem',
        margin: '1rem 0',
        width: '100%',
      },
      '.write-review__action': {
        display: 'flex',
        gap: '1.25rem',
        marginTop: '1rem',
        '.btn': {
          width: '50%',
          fontSize: '.875rem',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '36px',
          svg: {
            fontSize: '.875rem',
          },
          border: 'none',
          borderRadius: '.25rem',
          '&.btn-image': {
            border: `1px solid ${theme.palette.second.main}`,
            backgroundColor: theme.palette.background.main,
            color: theme.palette.second.main,
          },
          '&.btn-write': {
            '&.disabled': {
              pointerEvents: 'none',
              cursor: 'not-allowed',
            },
            color: theme.palette.background.main,
            backgroundColor: theme.palette.second.main,
            border: `1px solid ${theme.palette.background.main}`,
          },
        },
      },
      '.show-image': {
        display: 'flex',
        gap: '.5rem',
        cursor: 'pointer',
        '.image-item': {
          img: {
            height: '100%',
            objectFit: 'cover',
          },
          position: 'relative',
          width: '3rem',
          height: '3rem',
          '&:hover': {
            '.overlay': {
              backgroundColor: 'rgba(36, 36, 36, 0.7)',
              opacity: 1,
            },
          },
          '.overlay': {
            position: 'absolute',
            transition: 'all .5s linear',
            opacity: 0,
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            '.icon': {
              width: '1rem',
              height: '1rem',
              background: theme.palette.background.main,
              borderRadius: '50%',
              textAlign: 'center',
              lineHeight: '1rem',
            },
          },
        },
      },
    },
  },
}))

const labels = {
  1: 'Rất không hài long',
  2: 'Không hài lòng',
  3: 'Bình thường',
  4: 'Hài lòng',
  5: 'Rất hài lòng',
}

const ReviewItem = ({ product, handleClose }) => {
  const dispatch = useDispatch()
  const [value, setValue] = React.useState(0)
  const [hover, setHover] = React.useState(-1)
  const [text, setText] = React.useState('')
  const [listImage, setListImage] = React.useState([])
  const inputRef = React.useRef()
  const { socket } = useSocket()
  const handleWriteReview = async () => {
    try {
      const review = await reviewApi.addReview(
        product.book,
        text,
        value,
        listImage
      )
      const notify = await notifyApi.add({
        text: `Người dùng vừa đánh giá sản phẩm ${product.name} !!`,
        url: `/${product.book}`,
      })

      socket && socket.emit('orderAdminNotify', notify.data.data)
      handleClose()
      toast.success('Viết đánh giá thành công', {
        position: 'top-center',
      })
    } catch (error) {
      console.log(error.message)
      toast.error(error.message, {
        position: 'top-center',
      })
    }
  }
  return (
    <Box sx={{ padding: '1rem 0 2rem', borderBottom: '1px solid #808089' }}>
      <Box className="modal-title">
        <Box className="image">
          <img
            src={getImage('books', product.image)}
            alt=""
          />
          {product.name}
        </Box>
      </Box>
      <Box className="write-review__heading">
        {hover === -1 && !value
          ? 'Vui lòng đánh giá'
          : labels[hover !== -1 ? hover : value]}
      </Box>
      <Box className="write-review__star">
        <Rating
          name="hover-feedback"
          value={value}
          precision={1}
          //   getLabelText={getLabelText}
          onChange={(event, newValue) => {
            setValue(newValue)
          }}
          onChangeActive={(event, newHover) => {
            if (newHover === -1) {
              setHover(-1)
            } else {
              setHover(newHover)
            }
          }}
          emptyIcon={<StarBorderOutlinedIcon fontSize="inherit" />}
        />
      </Box>
      <textarea
        rows={8}
        placeholder="Hãy chia sẻ cảm nhận, đánh giá của bạn về sản phẩm nhé"
        value={text}
        onChange={(e) => setText(e.target.value)}
      ></textarea>
      <Box className="show-image">
        {listImage.length > 0 &&
          listImage.map((item, i) => (
            <Box
              className="image-item"
              key={i}
              onClick={() =>
                setListImage((pre) => [...pre].filter((item, idx) => idx !== i))
              }
            >
              <img
                src={URL.createObjectURL(item)}
                alt=""
              ></img>
              <Box className="overlay">
                <Box className="icon">x</Box>
              </Box>
            </Box>
          ))}
      </Box>
      <Box className="write-review__action">
        <button
          className="btn btn-image"
          onClick={() => inputRef.current.click()}
        >
          <input
            hidden
            ref={inputRef}
            type="file"
            accept="image/*"
            onChange={(e) =>
              setListImage((prev) => [...prev, e.target.files[0]])
            }
          ></input>
          <CameraAltOutlinedIcon />
          Thêm ảnh
        </button>
        <button
          className={`btn btn-write ${value ? '' : 'disabled'}`}
          onClick={() => handleWriteReview()}
        >
          Gửi đánh giá
        </button>
      </Box>
    </Box>
  )
}
const ModalReview = ({ open, setOpen, list }) => {
  const handleClose = () => setOpen(false)
  return (
    <ModalStyled
      className="hai"
      TransitionComponent={Transition}
      open={open}
      aria-describedby="alert-dialog-slide-description"
    >
      <Box
        sx={{
          textAlign: 'right',
        }}
      >
        <CloseOutlinedIcon
          sx={{ cursor: 'pointer' }}
          onClick={handleClose}
        />
      </Box>
      <Box className="list-write">
        {list.length > 0 &&
          list.map((item) => (
            <Box key={item._id}>
              <ReviewItem
                product={item}
                handleClose={handleClose}
              />
            </Box>
          ))}
      </Box>
    </ModalStyled>
  )
}

export default ModalReview
