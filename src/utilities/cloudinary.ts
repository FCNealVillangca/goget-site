export const getCloudinaryUrl = (doc: any, options?: { width?: number; height?: number; quality?: string; format?: string }) => {
  if (!doc?.filename) return null

  const { width, height, quality = 'auto', format } = options || {}
  const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME

  let transformations = []

  if (width) transformations.push(`w_${width}`)
  if (height) transformations.push(`h_${height}`)
  if (quality) transformations.push(`q_${quality}`)
  if (format) transformations.push(`f_${format}`)

  const transformationString = transformations.length > 0 ? transformations.join(',') + '/' : ''

  return `https://res.cloudinary.com/${cloudName}/image/upload/${transformationString}media/${doc.filename}`
}

export const getCloudinaryVideoUrl = (doc: any, options?: { quality?: string; format?: string }) => {
  if (!doc?.filename) return null

  const { quality = 'auto', format } = options || {}
  const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME

  let transformations = []
  if (quality) transformations.push(`q_${quality}`)
  if (format) transformations.push(`f_${format}`)

  const transformationString = transformations.length > 0 ? transformations.join(',') + '/' : ''

  return `https://res.cloudinary.com/${cloudName}/video/upload/${transformationString}media/${doc.filename}`
}