

// import { useForm } from "react-hook-form";
// import { TbFidgetSpinner } from "react-icons/tb";
// import { categories } from "../Categories/CategoriesData";

// const AddMealForm = ({
//   handleSubmitMeal,
//   imagePreview,
//   imageText,
//   handleImage,
//   loading,
// }) => {
//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//   } = useForm();

//   return (
//     <div className="w-full min-h-[calc(100vh-40px)] flex flex-col justify-center items-center text-gray-800 rounded-xl bg-gray-50">
//       <form onSubmit={handleSubmit(handleSubmitMeal)}>
//         <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
//           <div className="space-y-6">
//             {/* Title */}
//             <div className="space-y-1 text-sm">
//               <label htmlFor="title" className="block text-gray-600">
//                 Title
//               </label>
//               <input
//                 {...register("title", { required: "Title is required" })}
//                 className="w-full px-4 py-3 text-gray-800 border border-rose-300 focus:outline-rose-500 rounded-md"
//                 type="text"
//                 placeholder="Meal Title"
//               />
//               {errors.title && (
//                 <p className="text-red-500">{errors.title.message}</p>
//               )}
//             </div>

//             {/* Category */}
//             <div className="space-y-1 text-sm">
//               <label htmlFor="category" className="block text-gray-600">
//                 Category
//               </label>
//               <select
//                 {...register("category", { required: "Category is required" })}
//                 className="w-full px-4 py-3 border-rose-300 focus:outline-rose-500 rounded-md"
//               >
//                 {categories.map((category) => (
//                   <option value={category.label} key={category.label}>
//                     {category.label}
//                   </option>
//                 ))}
//               </select>
//               {errors.category && (
//                 <p className="text-red-500">{errors.category.message}</p>
//               )}
//             </div>

//             {/* Image Upload */}
//             {/* <div className="space-y-1 text-sm">
//               <label htmlFor="image" className="block text-gray-600">Upload Image</label>
//               <input
//                 type="file"
//                 accept="image/*"
//                 onChange={(e) => handleImage(e.target.files[0])}
//               />
//               <p>{imageText}</p>
//               {imagePreview && <img src={imagePreview} alt="Image Preview" className="mt-2" />}
//               {errors.image && <p className="text-red-500">{errors.image.message}</p>}
//             </div> */}
//             {/* Image Upload */}
//             <div className="space-y-1 text-sm">
//               <label htmlFor="image" className="block text-gray-600">
//                 Upload Image
//               </label>
//               <input
//                 type="file"
//                 accept="image/*"
//                 {...register("image", { required: "Image is required" })} // Register the image input field
//                 onChange={(e) => handleImage(e.target.files[0])} // Capture the image file
//               />
//               <p>{imageText}</p>
//               {imagePreview && (
//                 <img src={imagePreview} alt="Image Preview" className="mt-2" />
//               )}
//               {errors.image && (
//                 <p className="text-red-500">{errors.image.message}</p>
//               )}
//             </div>

//             {/* Ingredients */}
//             <div className="space-y-1 text-sm">
//               <label htmlFor="ingredients" className="block text-gray-600">
//                 Ingredients
//               </label>
//               <textarea
//                 {...register("ingredients", {
//                   required: "Ingredients are required",
//                 })}
//                 className="w-full h-24 px-4 py-3 text-gray-800 border border-rose-300 focus:outline-rose-500 rounded-md"
//                 placeholder="List of Ingredients"
//               ></textarea>
//               {errors.ingredients && (
//                 <p className="text-red-500">{errors.ingredients.message}</p>
//               )}
//             </div>

//             {/* Price */}
//             <div className="space-y-1 text-sm">
//               <label htmlFor="price" className="block text-gray-600">
//                 Price
//               </label>
//               <input
//                 {...register("price", { required: "Price is required" })}
//                 type="number"
//                 className="w-full px-4 py-3 text-gray-800 border border-rose-300 focus:outline-rose-500 rounded-md"
//                 placeholder="Meal Price"
//               />
//               {errors.price && (
//                 <p className="text-red-500">{errors.price.message}</p>
//               )}
//             </div>
//           </div>

//           <div className="space-y-6">
//             {/* Rating */}
//             <div className="space-y-1 text-sm">
//               <label htmlFor="rating" className="block text-gray-600">
//                 Rating (1-5)
//               </label>
//               <input
//                 {...register("rating", {
//                   required: "Rating is required",
//                   min: 1,
//                   max: 5,
//                 })}
//                 type="number"
//                 className="w-full px-4 py-3 text-gray-800 border border-rose-300 focus:outline-rose-500 rounded-md"
//                 placeholder="Meal Rating (1-5)"
//               />
//               {errors.rating && (
//                 <p className="text-red-500">{errors.rating.message}</p>
//               )}
//             </div>

//             {/* Post Time */}
//             <div className="space-y-1 text-sm">
//               <label htmlFor="postTime" className="block text-gray-600">
//                 Post Time
//               </label>
//               <input
//                 {...register("postTime", { required: "Post time is required" })}
//                 type="datetime-local"
//                 className="w-full px-4 py-3 text-gray-800 border border-rose-300 focus:outline-rose-500 rounded-md"
//               />
//               {errors.postTime && (
//                 <p className="text-red-500">{errors.postTime.message}</p>
//               )}
//             </div>

//             {/* Likes */}
//             <div className="space-y-1 text-sm">
//               <label htmlFor="likes" className="block text-gray-600">
//                 Likes
//               </label>
//               <input
//                 {...register("likes", {
//                   required: "Number of likes is required",
//                 })}
//                 type="number"
//                 className="w-full px-4 py-3 text-gray-800 border border-rose-300 focus:outline-rose-500 rounded-md"
//                 placeholder="Number of likes"
//               />
//               {errors.likes && (
//                 <p className="text-red-500">{errors.likes.message}</p>
//               )}
//             </div>

//             {/* Reviews */}
//             <div className="space-y-1 text-sm">
//               <label htmlFor="reviews" className="block text-gray-600">
//                 Reviews
//               </label>
//               <input
//                 {...register("reviews", {
//                   required: "Number of reviews is required",
//                 })}
//                 type="number"
//                 className="w-full px-4 py-3 text-gray-800 border border-rose-300 focus:outline-rose-500 rounded-md"
//                 placeholder="Number of reviews"
//               />
//               {errors.reviews && (
//                 <p className="text-red-500">{errors.reviews.message}</p>
//               )}
//             </div>

//             {/* Submit Button */}
//             <button
//               type="submit"
//               className="w-full px-4 py-3 mt-4 font-semibold text-white bg-rose-500 rounded-md hover:bg-rose-600"
//               disabled={loading}
//             >
//               {loading ? (
//                 <TbFidgetSpinner className="animate-spin" />
//               ) : (
//                 "Add Meal"
//               )}
//             </button>
//           </div>
//         </div>
//       </form>
//     </div>
//   );
// };

// export default AddMealForm;

import { categories } from '../Categories/CategoriesData'
import { TbFidgetSpinner } from 'react-icons/tb'

const AddMealForm = ({
  handleSubmit,
  setImagePreview,
  imagePreview,
  imageText,
  handleImage,
  loading,
}) => {
  return (
    <div className='w-full min-h-[calc(100vh-40px)] flex flex-col justify-center items-center text-gray-800 rounded-xl bg-gray-50'>
      <form onSubmit={handleSubmit}>
        <div className='grid grid-cols-1 lg:grid-cols-2 gap-10'>
          <div className='space-y-6'>
            <div className='space-y-1 text-sm'>
              <label htmlFor='mealTitle' className='block text-gray-600'>
                Meal Title
              </label>
              <input
                className='w-full px-4 py-3 text-gray-800 border border-rose-300 focus:outline-rose-500 rounded-md '
                name='mealTitle'
                id='mealTitle'
                type='text'
                placeholder='Meal Title'
                required
              />
            </div>

            <div className='space-y-1 text-sm'>
              <label htmlFor='adminName' className='block text-gray-600'>
                Admin/Distributor Name
              </label>
              <input
                className='w-full px-4 py-3 text-gray-800 border border-rose-300 focus:outline-rose-500 rounded-md '
                name='adminName'
                id='adminName'
                type='text'
                placeholder='Admin/Distributor Name'
                required
              />
            </div>

            <div className='space-y-1'>
              <label htmlFor='ingredients' className='block text-gray-600'>
                Ingredients
              </label>
              <textarea
                id='ingredients'
                className='block rounded-md focus:rose-300 w-full h-32 px-4 py-3 text-gray-800  border border-rose-300 focus:outline-rose-500 '
                name='ingredients'
                placeholder='List of ingredients'
              ></textarea>
            </div>

            <div className='space-y-1'>
              <label htmlFor='description' className='block text-gray-600'>
                Description
              </label>
              <textarea
                id='description'
                className='block rounded-md focus:rose-300 w-full h-32 px-4 py-3 text-gray-800  border border-rose-300 focus:outline-rose-500 '
                name='description'
                placeholder='Meal description'
              ></textarea>
            </div>
          </div>

          <div className='space-y-6'>
            <div className='p-4 bg-white w-full m-auto rounded-lg flex justify-between items-center'>
              <div className='file_upload px-5 py-3 relative border-4 border-dotted border-gray-300 rounded-lg'>
                <div className='flex flex-col w-max mx-auto text-center'>
                  <label>
                    <input
                      className='text-sm cursor-pointer w-36 hidden'
                      type='file'
                      onChange={e => handleImage(e.target.files[0])}
                      name='image'
                      id='image'
                      accept='image/*'
                      hidden
                    />
                    <div className='bg-rose-500 text-white border border-gray-300 rounded font-semibold cursor-pointer p-1 px-3 hover:bg-rose-500'>
                      {imageText.length > 20
                        ? imageText.split('.')[0].slice(0, 15) + '....' + imageText.split('.')[1]
                        : imageText}
                    </div>
                  </label>
                </div>
              </div>
              <div className='h-16 w-16 object-cover overflow-hidden flex items-center'>
                {imagePreview && <img src={imagePreview} />}
              </div>
            </div>

            <div className='space-y-1 text-sm'>
              <label htmlFor='rating' className='block text-gray-600'>
                Rating
              </label>
              <input
                className='w-full px-4 py-3 text-gray-800 border border-rose-300 focus:outline-rose-500 rounded-md '
                name='rating'
                id='rating'
                type='number'
                placeholder='Rating (1-5)'
                min='1'
                max='5'
                required
              />
            </div>

            <div className='space-y-1 text-sm'>
              <label htmlFor='postTime' className='block text-gray-600'>
                Post Time
              </label>
              <input
                className='w-full px-4 py-3 text-gray-800 border border-rose-300 focus:outline-rose-500 rounded-md '
                name='postTime'
                id='postTime'
                type='datetime-local'
                required
              />
            </div>

            <div className='flex justify-between items-center gap-4'>
              <button
                type='button'
                className='w-full p-3 mt-5 font-medium text-white transition duration-200 rounded bg-rose-500'
              >
                Like Meal
              </button>
              <button
                type='button'
                className='w-full p-3 mt-5 font-medium text-white transition duration-200 rounded bg-blue-500'
              >
                Request Meal
              </button>
            </div>

            <div className='space-y-1 text-sm'>
              <label htmlFor='reviews' className='block text-gray-600'>
                Reviews
              </label>
              <textarea
                id='reviews'
                className='block rounded-md focus:rose-300 w-full h-32 px-4 py-3 text-gray-800 border border-rose-300 focus:outline-rose-500'
                name='reviews'
                placeholder='Add your reviews'
              ></textarea>
            </div>
          </div>
        </div>

        <button
          disabled={loading}
          type='submit'
          className='w-full p-3 mt-5 text-center font-medium text-white transition duration-200 rounded shadow-md bg-rose-500'
        >
          {loading ? <TbFidgetSpinner className='animate-spin m-auto' /> : 'Save & Continue'}
        </button>
      </form>
    </div>
  )
}

export default AddMealForm
