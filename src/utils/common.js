import { STATIC_HOST } from '@/constants/common'

export function sortListFilter(arr, filterBy, param = '') {
  if (arr.length === 0) return []
  return arr.sort((a, b) => {
    if (!!param) {
      a['params'] = param
      b['params'] = param
    }

    // let a = { ...a, params: param };
    // let b = { ...b, params: param };
    // a.params = param;
    // b.params = param;
    const prev = filterBy.toString().split(',').includes(a._id.toString())
    const next = filterBy.toString().split(',').includes(b._id.toString())
    const nameA = a.name.toUpperCase()
    const nameB = b.name.toUpperCase()

    if (prev && !next) {
      a.isChecked = true
      b.isChecked = false
      return -1
    } else if (!prev && next) {
      b.isChecked = true
      a.isChecked = false
      return 1
    } else {
      if (!prev && !next) {
        b.isChecked = false
        a.isChecked = false
      } else {
        b.isChecked = true
        a.isChecked = true
      }
      return nameA > nameB ? 1 : nameA < nameB ? -1 : 0
    }
  })
}

export function handleFilterView(filterViews, value, param = '') {
  const views = [...filterViews, ...value]
  if (value.length === 0) {
    const result = views.filter((item) => item.params !== param)
    return [...result]
  } else {
    const result = views.reduce((newArr, currentItem) => {
      const exits = newArr.findIndex(
        (item) => item._id.toString() === currentItem._id.toString()
      )
      if (exits < 0 && currentItem.isChecked) {
        newArr.push(currentItem)
      }
      return newArr
    }, [])
    return [...result]
  }
}

export function formatPriceVND(price) {
  if (!price) return

  return new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
  }).format(price)
}

export function formatPrice(price) {
  if (!price) return 0
  return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')
}

export function getImage(folder, url) {
  return `${STATIC_HOST}/img/${folder}/${url}`
}
export function handleSpecificAddress(
  street,
  ward = 'P Bến Nghé',
  district = 'Q1',
  city = 'Hồ Chí Minh'
) {
  return `${street ? street : ''} ${ward}, ${district}, ${city}`
}
export function timeSince(date) {
  if (!date) return {}
  // current Time - date
  const now = new Date()
  const yourDate = new Date(date)
  const seconds = Math.floor((now.getTime() - yourDate.getTime()) / 1000) // in ra số giây

  let timer = seconds / 31536000 // 0.00002342
  if (timer > 1) {
    return {
      value: Math.floor(timer),
      unit: 'năm',
    }
  }
  timer = seconds / 2678400 // 0.0023424
  if (timer > 1) {
    return {
      value: Math.floor(timer),
      unit: 'tháng',
    }
  }
  timer = seconds / 604800 // 0.023423
  if (timer > 1) {
    return {
      value: Math.floor(timer),
      unit: 'tuần',
    }
  }
  timer = seconds / 86400 // 0.9
  if (timer > 1) {
    return {
      value: Math.floor(timer),
      unit: 'ngày',
    }
  }
  timer = seconds / 3600 // 1.333
  if (timer > 1) {
    return {
      value: Math.floor(timer),
      unit: 'giờ',
    }
  }
  timer = seconds / 60
  if (timer > 1) {
    return {
      value: Math.floor(timer),
      unit: 'phút',
    }
  }
  timer = seconds
  if (timer > 1) {
    return {
      value: 'vừa xong',
      unit: '',
    }
  }
  return {
    value: 'Vừa xong',
    unit: '',
  }
}

export function ratingReview(rating) {
  if (rating === 5) {
    return 'Cực kì hài lòng'
  }
  if (rating === 4) {
    return 'Hài lòng'
  }
  if (rating === 3) {
    return 'Bình Thường'
  }
  if (rating === 2) {
    return 'Không hài lòng'
  }
  return 'Rất không hài lòng'
}

export function formatDate(d) {
  return (
    [d.getMonth() + 1, d.getDate(), d.getFullYear()].join('/') +
    ' ' +
    [d.getHours(), d.getMinutes(), d.getSeconds()].join(':')
  )
}
export const removeSpecialCharacter = (str) =>
  str.replace(
    /!|@|%|\^|\*|\(|\)|\+|\=|\<|\>|\?|\/|,|\.|\:|\;|\'|\"|\&|\#|\[|\]|~|\$|_|`|-|{|}|\||\\/g,
    ''
  )
export const generateNameId = (name, id) => {
  return removeSpecialCharacter(name).replace(/\s/g, '-') + `-i-${id}`
}

export const getIdFromNameId = (nameId) => {
  const arr = nameId.split('-i-')
  return arr[arr.length - 1]
}
