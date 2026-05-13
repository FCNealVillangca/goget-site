'use client'

import React, { useState, useCallback } from 'react'
import { useForm, toast } from '@payloadcms/ui'

const CustomUploadField: React.FC<any> = ({ name, path, value, setValue, field }) => {
  console.log('🎬 CustomUploadField mounted with props:', { name, path, value: !!value, field: !!field })

  const { dispatchFields } = useForm()
  const [uploading, setUploading] = useState(false)

  const handleFileSelect = useCallback(async (files: FileList | null) => {
    if (!files || files.length === 0) return

    const file = files[0]
    setUploading(true)

    try {
      console.log('🎬 Starting Cloudinary upload for:', file.name, 'Size:', file.size, 'Type:', file.type)

      const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME
      const uploadPreset = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET || 'media_upload'

      console.log('📡 Cloudinary config:', { cloudName, uploadPreset })

      // Upload directly to Cloudinary from client
      const formData = new FormData()
      formData.append('file', file)
      formData.append('upload_preset', uploadPreset)
      formData.append('folder', 'media')
      formData.append('resource_type', 'auto')

      console.log('📤 Sending to Cloudinary URL:', `https://api.cloudinary.com/v1_1/${cloudName}/upload`)

      const response = await fetch(
        `https://api.cloudinary.com/v1_1/${cloudName}/upload`,
        {
          method: 'POST',
          body: formData,
        }
      )

      console.log('📥 Cloudinary response status:', response.status)

      if (!response.ok) {
        const errorText = await response.text()
        console.error('❌ Cloudinary upload failed:', {
          status: response.status,
          statusText: response.statusText,
          error: errorText,
          headers: Object.fromEntries(response.headers.entries())
        })

        // If preset not found, suggest creating it
        if (response.status === 400 && errorText.includes('Upload preset not found')) {
          console.error('🚨 SOLUTION: Create upload preset "media_upload" in Cloudinary dashboard!')
          console.error('   Go to: https://cloudinary.com/console/settings/upload')
          console.error('   Name: media_upload, Mode: Unsigned')
        }

        throw new Error(`Cloudinary upload failed: ${response.status} ${errorText}`)
      }

      const cloudinaryResult = await response.json()
      console.log('✅ Cloudinary upload success:', {
        public_id: cloudinaryResult.public_id,
        secure_url: cloudinaryResult.secure_url,
        format: cloudinaryResult.format,
        bytes: cloudinaryResult.bytes
      })

      // Update the Media fields with Cloudinary result
      console.log('📝 Updating Media fields with Cloudinary result...')
      dispatchFields({ type: 'UPDATE', path: 'filename', value: cloudinaryResult.public_id })
      dispatchFields({ type: 'UPDATE', path: 'url', value: cloudinaryResult.secure_url })
      dispatchFields({ type: 'UPDATE', path: 'filesize', value: cloudinaryResult.bytes })

      // Set mimeType based on format
      let mimeType = 'application/octet-stream'
      if (cloudinaryResult.format === 'mp4') mimeType = 'video/mp4'
      else if (cloudinaryResult.format === 'jpg' || cloudinaryResult.format === 'jpeg') mimeType = 'image/jpeg'
      else if (cloudinaryResult.format === 'png') mimeType = 'image/png'
      else if (cloudinaryResult.format === 'gif') mimeType = 'image/gif'
      dispatchFields({ type: 'UPDATE', path: 'mimeType', value: mimeType })

      console.log('✅ Media fields updated')

      toast.success('File uploaded successfully')
    } catch (error: any) {
      console.error('Upload error:', error)
      toast.error(`Upload failed: ${error?.message || 'Unknown error'}`)
    } finally {
      setUploading(false)
    }
  }, [dispatchFields])

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