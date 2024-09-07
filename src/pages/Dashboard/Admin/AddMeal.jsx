// import { useState } from 'react'

// import useAuth from '../../../hooks/useAuth'
// import { imageUpload } from '../../../api/utils'
// import { Helmet } from 'react-helmet-async'
// import { useMutation } from '@tanstack/react-query'
// import useAxiosSecure from '../../../hooks/useAxiosSecure'
// import toast from 'react-hot-toast'
// import { useNavigate } from 'react-router-dom'
// import AddMealForm from '../../../components/Form/AddMealForm'

// const AddMeal = () => {
//   const navigate = useNavigate()
//   const axiosSecure = useAxiosSecure()
//   const [loading, setLoading] = useState(false)
//   const { user } = useAuth()
//   const [imagePreview, setImagePreview] = useState()
//   const [imageText, setImageText] = useState('Upload Image')
//   // const [dates, setDates] = useState({
//   //   startDate: new Date(),
//   //   endDate: new Date(),
//   //   key: 'selection',
//   // })

//   // //Date range handler
//   // const handleDates = item => {
//   //   setDates(item.selection)
//   // }

//   const { mutateAsync } = useMutation({
//     mutationFn: async mealData => {
//       const { data } = await axiosSecure.post(`/meal`, mealData)
//       return data
//     },
//     onSuccess: () => {
//       console.log('Data Saved Successfully')
//       toast.success('Meal Added Successfully!')
//       navigate('/dashboard/my-listings')
//       setLoading(false)
//     },
//   })

//   //   Form handler
//   const handleSubmit = async e => {
//     e.preventDefault()
//     setLoading(true)
//     const form = e.target
   
//     const category = form.category.value
//     const title = form.title.value
   
//     const ingredients = form.ingredients.value
//     // const guests = form.total_guest.value
//     const price = form.price.value
//     const description = form.description.value
//     const rating = form.rating.value
//     const postTime = form.postTime.value
//     const likes = form.likes.value
//     const reviews = form.reviews.value
//     const image = form.image.files[0]

//     const admin = {
//       name: user?.displayName,
//       image: user?.photoURL,
//       email: user?.email,
//     }

//     try {
//       const image_url = await imageUpload(image)
//       const mealData = {
//         ingredients,
//         price,
//         rating, 
//         postTime,
//         likes,
//         reviews,
//         category,
//         title,
       
//         admin,
//         description,
//         image: image_url,
//       }
//       console.table(mealData)

//       //   Post request to server
//       await mutateAsync(mealData)
//     } catch (err) {
//       console.log(err)
//       toast.error(err.message)
//       setLoading(false)
//     }
//   }

//   //   handle image change
//   const handleImage = image => {
//     setImagePreview(URL.createObjectURL(image))
//     setImageText(image.name)
//   }

//   return (
//     <>
//       <Helmet>
//         <title>Add Room | Dashboard</title>
//       </Helmet>

//       {/* Form */}
//       <AddMealForm
//         // dates={dates}
//         // handleDates={handleDates}
//         handleSubmit={handleSubmit}
//         setImagePreview={setImagePreview}
//         imagePreview={imagePreview}
//         handleImage={handleImage}
//         imageText={imageText}
//         loading={loading}
//       />
//     </>
//   )
// }

// export default AddMeal

import { useState } from 'react'
import useAuth from '../../../hooks/useAuth'

import { Helmet } from 'react-helmet-async'
import { useMutation } from '@tanstack/react-query'
import useAxiosSecure from '../../../hooks/useAxiosSecure'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
import AddMealForm from '../../../components/Form/AddMealForm'
import { imageUpload } from '../../../api/utils'
import { linkWithCredential } from 'firebase/auth'

const AddMeal = () => {
  const navigate = useNavigate()
  const axiosSecure = useAxiosSecure()
  const [loading, setLoading] = useState(false)
  const { user } = useAuth()
  const [imagePreview, setImagePreview] = useState(null)
  const [imageText, setImageText] = useState('Upload Image')

  const { mutateAsync } = useMutation({
    mutationFn: async (mealData) => {
      return await axiosSecure.post('/meals', mealData)
     
    },
    onSuccess: () => {
      toast.success('Meal added successfully!')
      navigate('/dashboard/meals')
    },
    onError: (error) => {
      console.error('Error:', error)
      toast.error('Failed to add the meal. Please try again.')
    },
  })

  const handleImage = (imageFile) => {
    if (imageFile) {
      const reader = new FileReader()
      reader.onload = () => {
        setImagePreview(reader.result)
        setImageText(imageFile.name)
      }
      reader.readAsDataURL(imageFile)
    }
  }

const handleSubmitMeal = async (data) => {
    try {
      setLoading(true)
  
      // Image Upload Logic
      if (data.image && data.image.length > 0) {
        const imageUrl = await imageUpload(data.image[0]) // Upload the image and get the URL
  
        const mealData = {
          ...data,
          image: imageUrl, // Use the uploaded image URL directly
          admin: {
            name: user.displayName,
            email: user.email,
          },
        }
  
        // Send meal data to the backend
        await mutateAsync(mealData)
      } else {
        throw new Error('No image provided for upload.')
      }
    } catch (err) {
      console.error('Error adding meal:', err.message) // Log only the error message
      toast.error('Something went wrong while adding the meal!')
    } finally {
      setLoading(false)
    }
  }
  
  
  return (
    <>
      <Helmet>
        <title>Add Meal - Hostel Management</title>
      </Helmet>
      <AddMealForm
        handleSubmitMeal={handleSubmitMeal}
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
