import { XCircleIcon } from "@heroicons/react/solid"
import { useEffect, useRef } from "react"
import { useDispatch } from "react-redux"
import { hideSnackbar } from "../../helper/snackbar"
import { saveSnackbarSize } from "../../redux/actions/snackbar"
import useComponentSize from "../hooks/use-component-size"

export default function Snackbar({ snackbar, style }) {
  const dispatch = useDispatch()
  const snackbarRef = useRef()
  const snackbarSize = useComponentSize(snackbarRef)

  useEffect(() => {
    dispatch(saveSnackbarSize(snackbar.id, snackbarSize))
  }, [dispatch, snackbar.id, snackbarSize])

  useEffect(() => {
    const timeout = snackbar.timeout ? setTimeout(() => {
      hideSnackbar(snackbar.id)
    }, (snackbar.timeout * 1000)) : null
    return () => timeout ? clearTimeout(timeout) : undefined
  }, [snackbar.id, snackbar.timeout])

  const handleClose = () => {
    hideSnackbar(snackbar.id)
  }

  return (
    <div className='fixed left-1/2 transform -translate-x-1/2 px-2 py-1' ref={snackbarRef} style={{ maxWidth: 500, ...style}} key={snackbar.id}>
      <div className='relative p-3 flex items-center rounded-xl text-white bg-gray-800 bg-opacity-80 backdrop-filter backdrop-blur-sm shadow-lg' style={{ transition: 'top 0.5s'}}>
        <div className='mr-8'>
          <div className='font-bold'>{snackbar.title}</div>
          <div className='font-normal'>{snackbar.description}</div>
        </div>
        <button className='absolute right-3 top-3' onClick={handleClose}><div className='w-5 h-5 text-red-400'><XCircleIcon /></div></button>
      </div>
    </div>
  )
}