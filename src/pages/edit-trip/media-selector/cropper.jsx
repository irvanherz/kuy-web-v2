import { useState, useCallback } from 'react'
// import Slider from '@material-ui/core/Slider'
import ReactEasyCrop from 'react-easy-crop'
import classNames from 'classnames'
import Button from '../../../components/button'
import getCroppedImg from './libcropper'
import Modal from 'components/modal'

export default function Cropper({ image, onChange, className }){

  const [crop, setCrop] = useState({ x: 0, y: 0 })
  const [zoom, setZoom] = useState(1)
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null)

  const onCropComplete = useCallback(async (croppedArea, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels)
  }, [])

  const handleCrop = async () => {
    const img = await getCroppedImg(image, croppedAreaPixels, 0, false, false)
    onChange(img)
  }

  return (
    <Modal
      visible
      title='Potong Gambar'
    >
      <div className="relative aspect-w-1 aspect-h-1">
        <ReactEasyCrop
          image={image}
          crop={crop}
          zoom={1}
          aspect={4 / 3}
          onCropChange={setCrop}
          onCropComplete={onCropComplete}
          onZoomChange={setZoom}
        />
      </div>
      <div className="controls">
        <Button onClick={handleCrop}>Upload Gambar</Button>
      </div>
    </Modal>

  )
}