import { useEffect, useState } from 'react'

function useDebounce(value, delay, setPage) {
  const [debouncededValue, setDebouncededValue] = useState(value)
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncededValue(value)
      setPage && setPage(0)
    }, delay)
    return () => {
      clearTimeout(handler)
    }
  }, [value, delay])
  return debouncededValue
}

export default useDebounce
