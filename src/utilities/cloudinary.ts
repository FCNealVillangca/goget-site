export const getCloudinaryUrl = (doc: any, options?: { width?: number; height?: number; quality?: string; format?: string }) => {
  if (!doc?.url) return null

  // If we have the direct URL, use it (for images)
  if (doc.url && (!doc.mimeType || doc.mimeType?.startsWith('image/'))) {
    return doc.url
  }

  // Fallback to constructing URL from filename if needed
  if (doc.filename) {
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

  return null
}

export const getCloudinaryVideoUrl = (doc: any, options?: { quality?: string; format?: string }) => {
  if (!doc?.url) return null

  // If we have the direct URL, use it (for videos)
  if (doc.url && doc.mimeType?.startsWith('video/')) {
    return doc.url
  }

  // Fallback to constructing URL from filename if needed
  if (doc.filename) {
    const { quality = 'auto', format } = options || {}
    const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME

    let transformations = []
    if (quality) transformations.push(`q_${quality}`)
    if (format) transformations.push(`f_${format}`)

    const transformationString = transformations.length > 0 ? transformations.join(',') + '/' : ''

    return `https://res.cloudinary.com/${cloudName}/video/upload/${transformationString}media/${doc.filename}`
  }

  return null
}