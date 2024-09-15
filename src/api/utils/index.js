

import axios from 'axios'

// Image upload function with enhanced logging
export const imageUpload = async (image) => {
  const formData = new FormData()
  formData.append('image', image)

  try {
    const { data } = await axios.post(
      `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMGBB_API_KEY}`,
      formData
    )

    // Log the response to inspect the structure
    console.log('Image upload response:', data)

    // Check if the response contains the display_url, otherwise throw an error
    if (data.success && data.data.display_url) {
      return data.data.display_url
    } else {
      throw new Error('Failed to get image URL from imgbb response')
    }
  } catch (error) {
    console.error('Error uploading image:', error)
    throw new Error('Image upload failed')
  }
}

