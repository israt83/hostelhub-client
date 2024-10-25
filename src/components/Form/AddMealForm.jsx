import { categories } from "../Categories/CategoriesData";
import { TbFidgetSpinner } from "react-icons/tb";

const AddMealForm = ({
  handleSubmit,
  setImagePreview,
  imagePreview,
  imageText,
  handleImage,
  loading,
}) => {
  return (
    <div className="w-full min-h-[calc(100vh-40px)] flex flex-col justify-center items-center text-gray-800 rounded-xl bg-gray-50">
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1  gap-10">
          <div className="space-y-6 mt-7">
            <div className="grid grid-cols-2 space-x-5">
              <div className="space-y-1 text-sm">
                <label htmlFor="title" className="block text-gray-600">
                  Meal Title
                </label>
                <input
                  className="w-full px-4 py-3 text-gray-800 border border-rose-300 focus:outline-rose-500 rounded-md "
                  name="title"
                  id="title"
                  type="text"
                  placeholder="Meal Title"
                  required
                />
              </div>

              <div className="space-y-1 text-sm">
                <label htmlFor="price" className="block text-gray-600">
                  Price
                </label>
                <input
                  className="w-full px-4 py-3 text-gray-800 border border-rose-300 focus:outline-rose-500 rounded-md "
                  name="price"
                  id="price"
                  type="number"
                  placeholder="Price"
                  required
                />
              </div>
            </div>
            <div className="grid grid-cols-2 space-x-5">
              <div className="space-y-1 text-sm">
                <label htmlFor="rating" className="block text-gray-600">
                  Rating
                </label>
                <input
                  className="w-full px-4 py-3 text-gray-800 border border-rose-300 focus:outline-rose-500 rounded-md "
                  name="rating"
                  id="rating"
                  type="number"
                  placeholder="Rating (1-5)"
                  min="1"
                  max="5"
                  required
                />
              </div>
              <div className="space-y-1 text-sm">
                <label htmlFor="postTime" className="block text-gray-600">
                  Post Time
                </label>
                <input
                  className="w-full px-4 py-3 text-gray-800 border border-rose-300 focus:outline-rose-500 rounded-md "
                  name="postTime"
                  id="postTime"
                  type="datetime-local"
                  required
                />
              </div>
            </div>
            <div className="grid grid-cols-2 space-x-5">
              <div className="space-y-1">
                <label htmlFor="ingredients" className="block text-gray-600">
                  Ingredients
                </label>
                <textarea
                  id="ingredients"
                  className="block rounded-md focus:rose-300 w-full  px-4 py-3 text-gray-800  border border-rose-300 focus:outline-rose-500 "
                  name="ingredients"
                  placeholder="List of ingredients"
                ></textarea>
              </div>
              <div className="space-y-1 text-sm mt-8">
                <label htmlFor="category" className="block text-gray-600">
                  Category
                </label>
                <select
                  required
                  className="w-full px-4 py-3 border-rose-300 focus:outline-rose-500 rounded-md"
                  name="category"
                >
                  {categories.map((category) => (
                    <option value={category.label} key={category.label}>
                      {category.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>

          </div>

          <div className="space-y-6">
            <div className="p-4 bg-white w-full m-auto rounded-lg flex justify-center items-center">
              <div className="file_upload px-5 py-3 relative border-4 border-dotted border-gray-300 rounded-lg">
                <div className="flex flex-col w-max mx-auto text-center">
                  <label>
                    <input
                      className="text-sm cursor-pointer w- hidden"
                      type="file"
                      onChange={(e) => handleImage(e.target.files[0])}
                      name="image"
                      id="image"
                      accept="image/*"
                      hidden
                    />
                    <div className="bg-rose-500 text-white border border-gray-300 rounded font-semibold cursor-pointer p-1 px-3 hover:bg-rose-500">
                      {imageText.length > 20
                        ? imageText.split(".")[0].slice(0, 15) +
                          "...." +
                          imageText.split(".")[1]
                        : imageText}
                    </div>
                  </label>
                </div>
              </div>
              <div className="h-16 w-16 object-cover overflow-hidden flex items-center">
                {imagePreview && <img src={imagePreview} />}
              </div>
            </div>
            
            <div className="space-y-1">
              <label htmlFor="description" className="block text-gray-600">
                Description
              </label>
              <textarea
                id="description"
                className="block rounded-md focus:rose-300 w-full  px-4 py-3 text-gray-800  border border-rose-300 focus:outline-rose-500 "
                name="description"
                placeholder="Meal description"
              ></textarea>
            </div>

            <div className="space-y-1 text-sm">
              <label htmlFor="reviews" className="block text-gray-600">
                Reviews
              </label>
              <textarea
                id="reviews"
                className="block rounded-md focus:rose-300 w-full  px-4 py-3 text-gray-800 border border-rose-300 focus:outline-rose-500"
                name="reviews"
                placeholder="Add your reviews"
              ></textarea>
            </div>
          </div>
        </div>

        <button
          disabled={loading}
          type="submit"
          className="w-full p-3 mt-5 text-center font-medium text-white transition duration-200 rounded shadow-md bg-rose-500"
        >
          {loading ? (
            <TbFidgetSpinner className="animate-spin m-auto" />
          ) : (
            "Save & Continue"
          )}
        </button>
      </form>
    </div>
  );
};

export default AddMealForm;

// import { useForm } from "react-hook-form";
// import { TbFidgetSpinner } from "react-icons/tb";
// import { categories } from "../Categories/CategoriesData";

// const AddMealForm = ({
//   handleSubmitMeal,
//   setImagePreview,
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

//   const categories = [
//     { label: "Breakfast", description: "Morning meals" },
//     { label: "Lunch", description: "Midday meals" },
//     { label: "Dinner", description: "Evening meals" },
//   ];

//   return (
//     <div className="w-full min-h-[calc(100vh-40px)] flex flex-col justify-center items-center text-gray-800 rounded-xl bg-gray-50">
//       <form onSubmit={handleSubmit(handleSubmitMeal)}>
//         <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
//           <div className="space-y-6">
//             <div className="space-y-1 text-sm">
//               <label htmlFor="mealTitle" className="block text-gray-600">
//                 Meal Title
//               </label>
//               <input
//                 className="w-full px-4 py-3 text-gray-800 border border-rose-300 focus:outline-rose-500 rounded-md "
//                 name="title"
//                 id="mealTitle"
//                 type="text"
//                 placeholder="Meal Title"
//                 {...register("title", { required: "Meal title is required" })}
//               />
//               {errors.title && (
//                 <span className="text-red-500">{errors.title.message}</span>
//               )}
//             </div>

//             <div className="space-y-1 text-sm">
//               <label htmlFor="adminName" className="block text-gray-600">
//                 Admin/Distributor Name
//               </label>
//               <input
//                 className="w-full px-4 py-3 text-gray-800 border border-rose-300 focus:outline-rose-500 rounded-md "
//                 name="adminName"
//                 id="adminName"
//                 type="text"
//                 placeholder="Admin/Distributor Name"
//                 {...register("adminName", {
//                   required: "Admin name is required",
//                 })}
//               />
//               {errors.adminName && (
//                 <span className="text-red-500">{errors.adminName.message}</span>
//               )}
//             </div>

//             <div className="space-y-1">
//               <label htmlFor="category" className="block text-gray-600">
//                 Category
//               </label>
//               {/* <select
//                 className='w-full px-4 py-3 text-gray-800 border border-rose-300 focus:outline-rose-500 rounded-md'
//                 name='category'
//                 id='category'
//                 {...register('category', { required: 'Category is required' })}
//               >
//                 <option value=''>Select a category</option>
//                 {categories.map(category => (
//                   <option key={category} value={category}>
//                     {category}
//                   </option>
//                 ))}
//               </select> */}
//               <select
//                 className="w-full px-4 py-3 text-gray-800 border border-rose-300 focus:outline-rose-500 rounded-md"
//                 name="category"
//                 id="category"
//                 {...register("category", { required: "Category is required" })}
//               >
//                 <option value="">Select a category</option>
//                 {categories.map((category) => (
//                   <option key={category.label} value={category.label}>
//                     {category.label}{" "}
//                     {/* Only render the label, not the entire object */}
//                   </option>
//                 ))}
//               </select>

//               {errors.category && (
//                 <span className="text-red-500">{errors.category.message}</span>
//               )}
//             </div>

//             <div className="space-y-1">
//               <label htmlFor="ingredients" className="block text-gray-600">
//                 Ingredients
//               </label>
//               <textarea
//                 id="ingredients"
//                 className="block rounded-md focus:rose-300 w-full h-32 px-4 py-3 text-gray-800 border border-rose-300 focus:outline-rose-500"
//                 name="ingredients"
//                 placeholder="List of ingredients"
//                 {...register("ingredients", {
//                   required: "Ingredients are required",
//                 })}
//               ></textarea>
//               {errors.ingredients && (
//                 <span className="text-red-500">
//                   {errors.ingredients.message}
//                 </span>
//               )}
//             </div>

//             <div className="space-y-1">
//               <label htmlFor="description" className="block text-gray-600">
//                 Description
//               </label>
//               <textarea
//                 id="description"
//                 className="block rounded-md focus:rose-300 w-full h-32 px-4 py-3 text-gray-800 border border-rose-300 focus:outline-rose-500"
//                 name="description"
//                 placeholder="Meal description"
//                 {...register("description", {
//                   required: "Description is required",
//                 })}
//               ></textarea>
//               {errors.description && (
//                 <span className="text-red-500">
//                   {errors.description.message}
//                 </span>
//               )}
//             </div>
//           </div>

//           <div className="space-y-6">
//             <div className="p-4 bg-white w-full m-auto rounded-lg flex justify-between items-center">
//               <div className="file_upload px-5 py-3 relative border-4 border-dotted border-gray-300 rounded-lg">
//                 <div className="flex flex-col w-max mx-auto text-center">
//                   <label>
//                     <input
//                       className="text-sm cursor-pointer w-36 hidden"
//                       type="file"
//                       onChange={(e) => handleImage(e.target.files[0])}
//                       name="image"
//                       id="image"
//                       accept="image/*"
//                       {...register("image", { required: "Image is required" })}
//                     />
//                     <div className="bg-rose-500 text-white border border-gray-300 rounded font-semibold cursor-pointer p-1 px-3 hover:bg-rose-500">
//                       {imageText.length > 20
//                         ? imageText.split(".")[0].slice(0, 15) +
//                           "...." +
//                           imageText.split(".")[1]
//                         : imageText}
//                     </div>
//                   </label>
//                 </div>
//               </div>
//               <div className="h-16 w-16 object-cover overflow-hidden flex items-center">
//                 {imagePreview && <img src={imagePreview} />}
//               </div>
//             </div>

//             <div className="space-y-1 text-sm">
//               <label htmlFor="price" className="block text-gray-600">
//                 Price
//               </label>
//               <input
//                 className="w-full px-4 py-3 text-gray-800 border border-rose-300 focus:outline-rose-500 rounded-md"
//                 name="price"
//                 id="price"
//                 type="number"
//                 placeholder="Price"
//                 min="0"
//                 {...register("price", { required: "Price is required" })}
//               />
//               {errors.price && (
//                 <span className="text-red-500">{errors.price.message}</span>
//               )}
//             </div>

//             <div className="space-y-1 text-sm">
//               <label htmlFor="rating" className="block text-gray-600">
//                 Rating
//               </label>
//               <input
//                 className="w-full px-4 py-3 text-gray-800 border border-rose-300 focus:outline-rose-500 rounded-md"
//                 name="rating"
//                 id="rating"
//                 type="number"
//                 placeholder="Rating (1-5)"
//                 min="1"
//                 max="5"
//                 {...register("rating", { required: "Rating is required" })}
//               />
//               {errors.rating && (
//                 <span className="text-red-500">{errors.rating.message}</span>
//               )}
//             </div>

//             <div className="space-y-1 text-sm">
//               <label htmlFor="postTime" className="block text-gray-600">
//                 Post Time
//               </label>
//               <input
//                 className="w-full px-4 py-3 text-gray-800 border border-rose-300 focus:outline-rose-500 rounded-md"
//                 name="postTime"
//                 id="postTime"
//                 type="datetime-local"
//                 {...register("postTime", { required: "Post time is required" })}
//               />
//               {errors.postTime && (
//                 <span className="text-red-500">{errors.postTime.message}</span>
//               )}
//             </div>

//             <div className="space-y-1 text-sm">
//               <label htmlFor="likes" className="block text-gray-600">
//                 Likes
//               </label>
//               <input
//                 className="w-full px-4 py-3 text-gray-800 border border-rose-300 focus:outline-rose-500 rounded-md"
//                 name="likes"
//                 id="likes"
//                 type="number"
//                 placeholder="Number of likes"
//                 {...register("likes")}
//               />
//             </div>

//             <div className="space-y-1 text-sm">
//               <label htmlFor="reviews" className="block text-gray-600">
//                 Reviews
//               </label>
//               <textarea
//                 id="reviews"
//                 className="block rounded-md focus:rose-300 w-full h-32 px-4 py-3 text-gray-800 border border-rose-300 focus:outline-rose-500"
//                 name="reviews"
//                 placeholder="Add your reviews"
//                 {...register("reviews", { required: "Reviews are required" })}
//               ></textarea>
//               {errors.reviews && (
//                 <span className="text-red-500">{errors.reviews.message}</span>
//               )}
//             </div>
//           </div>
//         </div>

//         <button
//           disabled={loading}
//           type="submit"
//           className="w-full p-3 mt-5 text-center font-medium text-white transition duration-200 rounded shadow-md bg-rose-500"
//         >
//           {loading ? (
//             <TbFidgetSpinner className="animate-spin m-auto" />
//           ) : (
//             "Save & Continue"
//           )}
//         </button>
//       </form>
//     </div>
//   );
// };

// export default AddMealForm;
