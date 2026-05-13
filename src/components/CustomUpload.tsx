import React, { useState, useCallback } from 'react'
import { useField, toast } from '@payloadcms/ui'

const CustomUploadField: React.FC<any> = (props) => {
  const { value, setValue } = useField<string>({ path: props.path })
  const [uploading, setUploading] = useState(false)

  const handleFileSelect = useCallback(async (files: FileList | null) => {
    if (!files || files.length === 0) return

    const file = files[0]
    setUploading(true)

    try {
      // Create form data for direct Cloudinary upload
      const formData = new FormData()
      formData.append('file', file)
      formData.append('upload_preset', process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET || 'default')
      formData.append('folder', 'media')
      formData.append('resource_type', 'auto')

      // Upload directly to Cloudinary
      const response = await fetch(
        `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/upload`,
        {
          method: 'POST',
          body: formData,
        }
      )

      if (!response.ok) {
        throw new Error(`Upload failed: ${response.statusText}`)
      }

      const result = await response.json()

      // Create media document in Payload with Cloudinary data
      const mediaResponse = await fetch('/api/media', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          filename: result.public_id,
          mimeType: `${result.resource_type}/${result.format}`,
          filesize: result.bytes,
          url: result.secure_url,
          alt: file.name,
        }),
      })

      if (!mediaResponse.ok) {
        throw new Error('Failed to create media record')
      }

      const mediaDoc = await mediaResponse.json()
      setValue(mediaDoc.doc.id)

      toast.success('File uploaded successfully')
    } catch (error: any) {
      console.error('Upload error:', error)
      toast.error(`Upload failed: ${error?.message || 'Unknown error'}`)
    } finally {
      setUploading(false)
    }
  }, [setValue])

  return (
    <div>
      <input
        type="file"
        accept="video/*,image/*"
        onChange={(e) => handleFileSelect(e.target.files)}
        disabled={uploading}
        style={{ marginBottom: '1rem' }}
      />
      {uploading && <p>Uploading...</p>}
      {value && <p>File uploaded successfully</p>}
    </div>
  )
}

export default CustomUploadField