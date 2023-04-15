import { useEffect, useRef, useState } from 'react'

export default function useAccordion() {
  const [show, setShow] = useState(false)
  const nodeRef = useRef(null)
  useEffect(() => {
    const handleClick = (e) => {
      if (nodeRef.current && nodeRef.current.contains(e.target)) {
        // e.target.contains(nodeRef.current) ||
        setShow((show) => !show)
      }
    }
    document.addEventListener('click', handleClick)
    return () => {
      document.removeEventListener('click', handleClick)
    }
  }, [])
  return {
    show,
    setShow,
    nodeRef,
  }
}
