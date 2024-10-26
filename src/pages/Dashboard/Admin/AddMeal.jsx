


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
