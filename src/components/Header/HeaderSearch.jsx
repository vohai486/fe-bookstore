import { Box, Paper, styled, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import SearchIcon from '@mui/icons-material/Search'
import useDebounce from '@/hooks/useDebounce'
import bookApi from '@/api/axiosBook'
import { getImage } from '@/utils/common'
import { Navigate, useNavigate } from 'react-router-dom'
const BoxWrapper = styled(Box)(({ theme }) => ({
  color: theme.palette.third.main,
  position: 'relative',
  flex: 1,
  '.input-search': {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    border: '1px solid rgb(221, 221, 227)',
    fontSize: '14px',
    borderRadius: '8px',
    paddingLeft: '1rem',
    input: {
      flex: 1,
      height: '20px',
      border: 'none',
      '&:focus': {
        border: 'none',
      },
    },
    button: {
      borderTopRightRadius: '8px',
      borderBottomRightRadius: '8px',
      width: '92px',
      height: '38px',
      border: 'none',
      background: 'unset',
      color: theme.palette.blue.main,
      '&:hover': {
        backgroundColor: 'rgba(10, 104, 255, 0.2)',
      },
      '&:active': {
        backgroundColor: 'rgba(10, 104, 255, 0.4)',
      },
    },
  },
  '.search-result': {
    marginTop: '.5rem',
    position: 'absolute',
    width: '100%',
    zIndex: 3,
    padding: '.5rem 0',
    '.search-item': {
      cursor: 'pointer',
      display: 'flex',
      padding: '.5rem 1rem',
      gap: '1rem',
      '&:hover': {
        boxShadow: 'rgba(0, 0, 0, 0.35) 0px 5px 15px',
      },
      '.search-image': {
        width: '40px',
        height: '40px',
        img: {
          width: '100%',
          height: '100%',
          objectFit: 'cover',
        },
      },
      '.search-name': {
        paddingLeft: '.5rem',
        backgroundColor: theme.palette.background2.main,
        flex: 1,
      },
    },
  },
}))
const HeaderSearch = () => {
  const [listSearchResult, setListSearchResult] = useState([])
  const [search, setSearch] = useState('')
  const debounced = useDebounce(search, 500)

  useEffect(() => {
    if (debounced?.trim().length === 0) {
      setListSearchResult([])
      return
    }
    ;(async () => {
      try {
        const res = await bookApi.searchBook({
          q: encodeURIComponent(debounced.length === 0 ? '' : debounced),
        })
        setListSearchResult(res.data.data)
      } catch (error) {
        setListSearchResult([])
      }
    })()
  }, [debounced])
  const navigate = useNavigate()
  return (
    <BoxWrapper>
      <Box className="input-search">
        <SearchIcon />
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Bạn tìm gì hôm nay?"
        ></input>
        <button>Tìm kiếm</button>
      </Box>
      {listSearchResult.length > 0 && (
        <Paper
          elevation={5}
          className="search-result"
        >
          {listSearchResult.map((item) => (
            <Box
              key={item._id}
              className="search-item"
              onClick={() => {
                setSearch('')
                setListSearchResult([])
                navigate(`/${item._id}`)
              }}
            >
              <Box className="search-image">
                <img
                  src={getImage('books', item.thumbnail_url)}
                  alt=""
                />
              </Box>
              <Box className="search-name">{item.name}</Box>
            </Box>
          ))}
        </Paper>
      )}
    </BoxWrapper>
  )
}

export default HeaderSearch
