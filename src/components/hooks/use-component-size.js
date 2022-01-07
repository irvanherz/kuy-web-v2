import { useCallback, useLayoutEffect, useState } from 'react'

function getSize(el) {
  return el
    ? {
      width: el.offsetWidth,
      height: el.offsetHeight
    }
    : {
      width: 0,
      height: 0
    }
}

export default function useComponentSize(ref) {
  const [size, setSize] = useState(getSize(ref ? ref.current : {}))

  const handleResize = useCallback(() => {
    if (ref.current) setSize(getSize(ref.current))
  }, [ref])

  useLayoutEffect(() => {
    const targetComponent = ref.current
    if (!targetComponent) return
    handleResize()

    if (typeof ResizeObserver === 'function') {
      var resizeObserver = new ResizeObserver(() => handleResize())
      resizeObserver.observe(targetComponent)
      return () => resizeObserver.disconnect(targetComponent)
    } else {
      window.addEventListener('resize', handleResize)
      return () => window.removeEventListener('resize', handleResize)
    }
  },
    [handleResize, ref]
  )

  return size
}