import { useRef, useState } from "react"
import { useDispatch } from "react-redux"
import { createMedia } from "redux/actions/media"
import Cropper from "./cropper"

export default function MediaItemAdd({ afterUploaded }) {
  const dispatch = useDispatch()
  const fileInputRef = useRef()
  const [img, setImg] = useState(null)

  const handleClick = () => fileInputRef.current.click()

  const handleFileChanged = e => {
    const files = e.target.files || []
    if(!files.length) return
    setImg(URL.createObjectURL(files[0]))
  }

  const handleCropped = async data => {
    try {
      setImg(null)
      console.log('cropped');
      const fd = new FormData()
      fd.append('type', 'image')
      fd.append('file', data)
      const uploaded = await dispatch(createMedia(fd))
      if (uploaded) afterUploaded(uploaded)
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className='p-2 w-1/3 sm:w-1/4 md:w-1/5 lg:w-1/6'>
      <div className='aspect-h-1 aspect-w-1 rounded-md overflow-hidden'>
        <button className='bg-gray-200 w-full h-full' onClick={handleClick}>
          <div className='absolute top-1/2 left-0 w-full p-2 transform -translate-y-1/2 text-center'>Add</div>
        </button>
        {img
          ? <Cropper image={img} onChange={handleCropped} />
          : null
        }
        <input type='file' accept=".png,.jpg,.jpeg" className='hidden' ref={fileInputRef} onChange={handleFileChanged} />
      </div>
    </div>
  )
}