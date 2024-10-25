

// import { useState } from 'react'
// import useAuth from '../../../hooks/useAuth'

// import { Helmet } from 'react-helmet-async'
// import { useMutation } from '@tanstack/react-query'
// import useAxiosSecure from '../../../hooks/useAxiosSecure'
// import toast from 'react-hot-toast'
// import { useNavigate } from 'react-router-dom'
// import AddMealForm from '../../../components/Form/AddMealForm'
// import { imageUpload } from '../../../api/utils'
// import { linkWithCredential } from 'firebase/auth'

// const AddMeal = () => {
//   const navigate = useNavigate()
//   const axiosSecure = useAxiosSecure()
//   const [loading, setLoading] = useState(false)
//   const { user } = useAuth()
//   const [imagePreview, setImagePreview] = useState(null)
//   const [imageText, setImageText] = useState('Upload Image')

//   const { mutateAsync } = useMutation({
//     mutationFn: async (mealData) => {
//       return await axiosSecure.post('/meals', mealData)
     
//     },
//     onSuccess: () => {
//       toast.success('Meal added successfully!')
//       navigate('/dashboard/meals')
//     },
//     onError: (error) => {
//       console.error('Error:', error)
//       toast.error('Failed to add the meal. Please try again.')
//     },
//   })

//   const handleImage = (imageFile) => {
//     if (imageFile) {
//       const reader = new FileReader()
//       reader.onload = () => {
//         setImagePreview(reader.result)
//         setImageText(imageFile.name)
//       }
//       reader.readAsDataURL(imageFile)
//     }
//   }

// const handleSubmitMeal = async (data) => {
//     try {
//       setLoading(true)
  
//       // Image Upload Logic
//       if (data.image && data.image.length > 0) {
//         const imageUrl = await imageUpload(data.image[0]) // Upload the image and get the URL
  
//         const mealData = {
//           ...data,
//           image: imageUrl, // Use the uploaded image URL directly
//           admin: {
//             name: user.displayName,
//             email: user.email,
//           },
//         }
  
//         // Send meal data to the backend
//         await mutateAsync(mealData)
//       } else {
//         throw new Error('No image provided for upload.')
//       }
//     } catch (err) {
//       console.error('Error adding meal:', err.message) // Log only the error message
//       toast.error('Something went wrong while adding the meal!')
//     } finally {
//       setLoading(false)
//     }
//   }
  
  
//   return (
//     <>
//       <Helmet>
//         <title>Add Meal - Hostel Management</title>
//       </Helmet>
//       <AddMealForm
//         handleSubmitMeal={handleSubmitMeal}
//         setImagePreview={setImagePreview}
//         imagePreview={imagePreview}
//         imageText={imageText}
//         handleImage={handleImage}
//         loading={loading}
//       />
//     </>
//   )
// }

// export default AddMeal


import { useState } from 'react'
import useAuth from '../../../hooks/useAuth'
import { imageUpload } from '../../../api/utils'
import { Helmet } from 'react-helmet-async'
import { useMutation } from '@tanstack/react-query'
import useAxiosSecure from '../../../hooks/useAxiosSecure'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
import AddMealForm from '../../../components/Form/AddMealForm'

const AddMeal = () => {
  const navigate = useNavigate()
  const axiosSecure = useAxiosSecure()
  const { user } = useAuth()
  const [loading, setLoading] = useState(false)
  const [imagePreview, setImagePreview] = useState()
  const [imageText, setImageText] = useState('Upload Image')

  const { mutateAsync } = useMutation({
    mutationFn: async mealData => {
      const { data } = await axiosSecure.post(`/meals`, mealData)
      return data
    },
    onSuccess: () => {
      toast.success('Meal Added Successfully!')
      navigate('/dashboard/all-meal')
      setLoading(false)
    },
  })

  const handleSubmit = async e => {
    e.preventDefault()
    setLoading(true)
    const form = e.target
    const title = form.title.value
 
    const description = form.description.value
    const ingredients = form.ingredients.value
    const postTime = form.postTime.value
    const rating = form.rating.value
    const price = form.price.value
    const image = form.image.files[0]
    const reviews = form.reviews.value
    const category = form.category.value

    const mealData = {
      title,
      
      description,
      ingredients,
      postTime,
      rating,
      reviews,
      price,
      category,
      adminEmail: user?.email,
      adminName: user?.displayName,
    }

    try {
      const imageUrl = await imageUpload(image)
      mealData.image = imageUrl
      await mutateAsync(mealData)
    } catch (err) {
      toast.error('Error adding meal!')
      setLoading(false)
    }
  }

  const handleImage = image => {
    setImagePreview(URL.createObjectURL(image))
    setImageText(image.name)
  }

  return (
    <>
      <Helmet>
        <title>Add Meal | Dashboard</title>
      </Helmet>
      <h2 className="text-2xl font-semibold leading-tight my-3">Add Meal</h2>
      <AddMealForm
        handleSubmit={handleSubmit}
        setImagePreview={setImagePreview}
        imagePreview={imagePreview}
        imageText={imageText}
        handleImage={handleImage}
        loading={loading}
      />
    </>
  )
}

export default AddMeal
