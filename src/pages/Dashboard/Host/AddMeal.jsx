// import { useState } from 'react'
// import AddRoomForm from '../../../components/Form/AddRoomForm'
// import useAuth from '../../../hooks/useAuth'
// import { imageUpload } from '../../../api/utils'
// import { Helmet } from 'react-helmet-async'
// import { useMutation } from '@tanstack/react-query'
// import useAxiosSecure from '../../../hooks/useAxiosSecure'
// import toast from 'react-hot-toast'
// import { useNavigate } from 'react-router-dom'

// const AddRoom = () => {
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
//       <AddRoomForm
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

// export default AddRoom
