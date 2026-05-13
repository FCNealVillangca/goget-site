'use client'

import React, { useState, useCallback } from 'react'
import { useField, toast } from '@payloadcms/ui'

const CustomUploadField: React.FC<any> = (props) => {
  const [uploading, setUploading] = useState(false)

  const handleFileSelect = useCallback(async (files: FileList | null) => {
    if (!files || files.length === 0) return

    const file = files[0]
    setUploading(true)

    try {
      // Upload directly to Cloudinary from client
      const formData = new FormData()
      formData.append('file', file)
      formData.append('upload_preset', process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET || 'media_upload')
      formData.append('folder', 'media')
      formData.append('resource_type', 'auto')

      const response = await fetch(
        `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/upload`,
        {
          method: 'POST',
          body: formData,
        }
      )

      if (!response.ok) {
        throw new Error(`Cloudinary upload failed: ${response.statusText}`)
      }

      const cloudinaryResult = await response.json()

      // Update the filename field with Cloudinary public_id
      // Payload will handle the rest since this is an upload collection
      if (props.onChange) {
        props.onChange(cloudinaryResult.public_id)
      }

      // Also update other fields if they exist in the form
      if (props.form) {
        if (props.form.setFieldValue && typeof props.form.setFieldValue === 'function') {
          props.form.setFieldValue('filesize', cloudinaryResult.bytes)
          props.form.setFieldValue('mimeType', `${cloudinaryResult.resource_type}/${cloudinaryResult.format}`)
        }
      }

      toast.success('File uploaded successfully')
    } catch (error: any) {
      console.error('Upload error:', error)
      toast.error(`Upload failed: ${error?.message || 'Unknown error'}`)
    } finally {
      setUploading(false)
    }
  }, [props])

  return (
    <div>
      <input
        type="file"
        accept="video/*,image/*,audio/*"
        onChange={(e) => handleFileSelect(e.target.files)}
        disabled={uploading}
        style={{ marginBottom: '1rem' }}
      />
      {uploading && <p>Uploading directly to Cloudinary...</p>}
    </div>
  )
}

export default CustomUploadField