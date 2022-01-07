export const DEFAULT_EMPTY_IMAGE = `${process.env.PUBLIC_URL}/assets/images/empty-image.svg`
export const DEFAULT_EMPTY_PHOTO = `${process.env.PUBLIC_URL}/assets/images/empty-photo.svg`

export const handleImageError = e => {
  e.target.src = DEFAULT_EMPTY_IMAGE
}

export const handlePhotoError = e => {
  e.target.src = DEFAULT_EMPTY_PHOTO
}