

// import { useState } from 'react';
// import { useQuery } from '@tanstack/react-query';
// import useAxiosSecure from '../../hooks/useAxiosSecure';
// import Card from "../Home/Card";
// import Heading from "../Shared/Heading";

// const AllMeals = () => {
//   const [category, setCategory] = useState("");
//   const [priceRange, setPriceRange] = useState("");
//   const [search, setSearch] = useState("");
//   const [searchText, setSearchText] = useState("");

//   const axiosSecure = useAxiosSecure();

//   // Fetch meals data using react-query
//   const { data: meals = [], refetch } = useQuery({
//     queryKey: ['all-meals', category, priceRange, search],
//     queryFn: async () => {
//       const queryString = `/all-meals?category=${category}&priceRange=${priceRange}&search=${search}`;
//       const { data } = await axiosSecure.get(queryString);
//       return data;
//     },
//     refetchOnWindowFocus: false,
//   });

//   const handleReset = () => {
//     setCategory("");
//     setPriceRange("");
//     setSearch("");
//     setSearchText("");
//     refetch();
//   };

//   const handleSearch = (e) => {
//     e.preventDefault();
//     setSearch(searchText);
//     refetch();
//   };

 

//   return (
//     <div className="container px-6 py-10 mx-auto min-h-[calc(100vh-306px)] flex flex-col justify-between">
//       <div>
//         {/* Filter by category */}
//         <div className="flex flex-col md:flex-row justify-center items-center gap-5 ">
//           <div>
//             <select
//               onChange={(e) => {
//                 setCategory(e.target.value);
//                 refetch();
//               }}
//               value={category}
//               name="category"
//               id="category"
//               className="border p-4 rounded-lg border-orange-600"
//             >
//               <option value="">Filter By Category</option>
//               <option value="Breakfast">Breakfast</option>
//               <option value="Lunch">Lunch</option>
//               <option value="Dinner">Dinner</option>
//             </select>
//           </div>

//           {/* Filter by price range */}
//           <div>
//             <select
//               onChange={(e) => {
//                 setPriceRange(e.target.value);
//                 refetch();
//               }}
//               value={priceRange}
//               name="price"
//               id="price"
//               className="border p-4 rounded-lg border-orange-600"
//             >
//               <option value="">Filter By Price Range</option>
//               <option value="0-10">Less than $10</option>
//               <option value="10-20">$10 - $20</option>
//               <option value="20-30">$20 - $30</option>
//               <option value="30">More than $30</option>
//             </select>
//           </div>

//           {/* Search functionality */}
//           <form onSubmit={handleSearch}>
//             <div className="flex p-1 overflow-hidden border rounded-lg">
//               <input
//                 className="px-6 py-2 text-gray-700 placeholder-gray-500 bg-white outline-none focus:placeholder-transparent"
//                 type="text"
//                 onChange={(e) => setSearchText(e.target.value)}
//                 value={searchText}
//                 name="search"
//                 placeholder="Enter Meal Title"
//               />
//               <button className="px-1 md:px-4 py-3 text-sm font-medium tracking-wider text-gray-100 uppercase transition-colors duration-300 transform bg-[#FF3811] rounded-md hover:bg-[#FF3811] focus:bg-[#FF3811]">
//                 Search
//               </button>
//             </div>
//           </form>

//           {/* Reset filters */}
//           <button onClick={handleReset} className="btn text-orange-600 font-bold">Reset</button>
//         </div>

//         {/* Display meals */}
//         <div className="">
//           {meals && meals.length > 0 ? (
//             <div className="grid grid-cols-3 mt-12 px-24">
//               {meals.map((meal) => (
//                 <Card key={meal._id} meal={meal} />
//               ))}
//             </div>
//           ) : (
//             <Heading
//               center={true}
//               title="No Meals Available!"
//               subtitle="Try using different filters."
//             />
           
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AllMeals;



// import { useState } from 'react';
// import { useQuery } from '@tanstack/react-query';
// import useAxiosSecure from '../../hooks/useAxiosSecure';
// import Card from "../Home/Card";
// import Heading from "../Shared/Heading";
// import InfiniteScroll from 'react-infinite-scroll-component';

// const AllMeals = () => {
//   const [category, setCategory] = useState("");
//   const [priceRange, setPriceRange] = useState("");
//   const [search, setSearch] = useState("");
//   const [searchText, setSearchText] = useState("");
//   const [page, setPage] = useState(1);
//   const [hasMore, setHasMore] = useState(true);

//   const axiosSecure = useAxiosSecure();

//   const { data: meals = [], refetch } = useQuery({
//     queryKey: ['all-meals', category, priceRange, search, page],
//     queryFn: async () => {
//       const queryString = `/all-meals?category=${category}&priceRange=${priceRange}&search=${search}&page=${page}&limit=data.length`;
//       const { data } = await axiosSecure.get(queryString);
//       return data;
//     },
//     refetchOnWindowFocus: false,
//     keepPreviousData: true, // Keeps previous data while new data is being fetched
//   });

//   const handleReset = () => {
//     setCategory("");
//     setPriceRange("");
//     setSearch("");
//     setSearchText("");
//     setPage(1);
//     setHasMore(true);
//     refetch();
//   };

//   const handleSearch = (e) => {
//     e.preventDefault();
//     setSearch(searchText);
//     setPage(1); // Reset page to 1 on new search
//     setHasMore(true); // Reset hasMore to true on new search
//     refetch();
//   };

//   const fetchMoreData = async () => {
//     const nextPage = page + 1;
//     const queryString = `/all-meals?category=${category}&priceRange=${priceRange}&search=1${search}&page=${nextPage}&limit=data.length`;
//     const { data } = await axiosSecure.get(queryString);
//     if (data.length === 0) {
//       setHasMore(false);
//     } else {
//       setPage(nextPage);
//     }
//   };

//   return (
//     <div className="container px-6 py-10 mx-auto min-h-[calc(100vh-306px)] flex flex-col justify-between">
//       <div>
//         <div className="flex flex-col md:flex-row justify-center items-center gap-5">
//           <div>
//             <select
//               onChange={(e) => {
//                 setCategory(e.target.value);
//                 setPage(1); // Reset page to 1 on filter change
//                 setHasMore(true);
//                 refetch();
//               }}
//               value={category}
//               name="category"
//               id="category"
//               className="border p-4 rounded-lg border-orange-600"
//             >
//               <option value="">Filter By Category</option>
//               <option value="Breakfast">Breakfast</option>
//               <option value="Lunch">Lunch</option>
//               <option value="Dinner">Dinner</option>
//             </select>
//           </div>

//           <div>
//             <select
//               onChange={(e) => {
//                 setPriceRange(e.target.value);
//                 setPage(1); // Reset page to 1 on filter change
//                 setHasMore(true);
//                 refetch();
//               }}
//               value={priceRange}
//               name="price"
//               id="price"
//               className="border p-4 rounded-lg border-orange-600"
//             >
//               <option value="">Filter By Price Range</option>
//               <option value="0-10">Less than $10</option>
//               <option value="10-20">$10 - $20</option>
//               <option value="20-30">$20 - $30</option>
//               <option value="30">More than $30</option>
//             </select>
//           </div>

//           <form onSubmit={handleSearch}>
//             <div className="flex p-1 overflow-hidden border rounded-lg">
//               <input
//                 className="px-6 py-2 text-gray-700 placeholder-gray-500 bg-white outline-none focus:placeholder-transparent"
//                 type="text"
//                 onChange={(e) => setSearchText(e.target.value)}
//                 value={searchText}
//                 name="search"
//                 placeholder="Enter Meal Title"
//               />
//               <button className="px-1 md:px-4 py-3 text-sm font-medium tracking-wider text-gray-100 uppercase transition-colors duration-300 transform bg-[#FF3811] rounded-md hover:bg-[#FF3811] focus:bg-[#FF3811]">
//                 Search
//               </button>
//             </div>
//           </form>

//           <button onClick={handleReset} className="btn text-orange-600 font-bold">Reset</button>
//         </div>

//         <InfiniteScroll
//           dataLength={meals.length}
//           next={fetchMoreData}
//           hasMore={hasMore}
//           loader={<h4>Loading...</h4>}
//           endMessage={<p>No more meals to show</p>}
//         >
//           <div className="grid grid-cols-3 mt-12 px-24">
//             {meals.map((meal) => (
//               <Card key={meal._id} meal={meal} />
//             ))}
//           </div>
//         </InfiniteScroll>
//       </div>
//     </div>
//   );
// };

// export default AllMeals;


import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import Card from "../Home/Card";
import InfiniteScroll from 'react-infinite-scroll-component';

const AllMeals = () => {
  const [category, setCategory] = useState("");
  const [priceRange, setPriceRange] = useState("");
  const [search, setSearch] = useState("");
  const [searchText, setSearchText] = useState("");
  const [page, setPage] = useState(1);
  const [meals, setMeals] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const limit = 3; // Fixed limit for items per page

  const axiosSecure = useAxiosSecure();

  const fetchMeals = async (pageParam = page) => {
    const queryString = `/all-meals?category=${category}&priceRange=${priceRange}&search=${search}&page=${pageParam}&limit=${limit}`;
    const { data } = await axiosSecure.get(queryString);
    return data;
  };

  const { refetch } = useQuery({
    queryKey: ['all-meals', category, priceRange, search],
    queryFn: async () => {
      const initialData = await fetchMeals(1);
      setMeals(initialData); // Set initial meals when the page loads or filters change
      return initialData;
    },
    refetchOnWindowFocus: false,
    keepPreviousData: true,
  });

  const handleReset = () => {
    setCategory("");
    setPriceRange("");
    setSearch("");
    setSearchText("");
    setPage(1);
    setHasMore(true);
    refetch();
  };

  const handleSearch = (e) => {
    e.preventDefault();
    setSearch(searchText);
    setPage(1); // Reset page to 1 on new search
    setHasMore(true); // Reset hasMore to true on new search
    refetch();
  };

  const fetchMoreData = async () => {
    const nextPage = page + 1;
    const newMeals = await fetchMeals(nextPage);

    if (newMeals.length === 0) {
      setHasMore(false); // No more data to load
    } else {
      setMeals([...meals, ...newMeals]); // Append new meals to the existing ones
      setPage(nextPage); // Increment the page number
    }
  };

  return (
    <div className="container px-6 py-10 mx-auto min-h-[calc(100vh-306px)] flex flex-col justify-between">
      <div>
        <div className="flex flex-col md:flex-row justify-center items-center gap-5">
          <div>
            <select
              onChange={(e) => {
                setCategory(e.target.value);
                setPage(1); // Reset page to 1 on filter change
                setHasMore(true);
                refetch();
              }}
              value={category}
              name="category"
              id="category"
              className="border p-4 rounded-lg border-orange-600"
            >
              <option value="">Filter By Category</option>
              <option value="Breakfast">Breakfast</option>
              <option value="Lunch">Lunch</option>
              <option value="Dinner">Dinner</option>
            </select>
          </div>

          <div>
            <select
              onChange={(e) => {
                setPriceRange(e.target.value);
                setPage(1); // Reset page to 1 on filter change
                setHasMore(true);
                refetch();
              }}
              value={priceRange}
              name="price"
              id="price"
              className="border p-4 rounded-lg border-orange-600"
            >
              <option value="">Filter By Price Range</option>
              <option value="0-10">Less than $10</option>
              <option value="10-20">$10 - $20</option>
              <option value="20-30">$20 - $30</option>
              <option value="30">More than $30</option>
            </select>
          </div>

          <form onSubmit={handleSearch}>
            <div className="flex p-1 overflow-hidden border rounded-lg">
              <input
                className="px-6 py-2 text-gray-700 placeholder-gray-500 bg-white outline-none focus:placeholder-transparent"
                type="text"
                onChange={(e) => setSearchText(e.target.value)}
                value={searchText}
                name="search"
                placeholder="Enter Meal Title"
              />
              <button className="px-1 md:px-4 py-3 text-sm font-medium tracking-wider text-gray-100 uppercase transition-colors duration-300 transform bg-[#FF3811] rounded-md hover:bg-[#FF3811] focus:bg-[#FF3811]">
                Search
              </button>
            </div>
          </form>

          <button onClick={handleReset} className="btn text-orange-600 font-bold">Reset</button>
        </div>

        <InfiniteScroll
          dataLength={meals.length}
          next={fetchMoreData}
          hasMore={hasMore}
          loader={
            <h4 className='text-center py-10 font-bold'>
              <span className="loading loading-spinner loading-lg">Loading more meals...</span>
            </h4>
          }
          endMessage={<p className='text-center py-10 '>No more meals to show</p>}
        >
          <div className="grid grid-cols-3 mt-12 px-24">
            {meals.map((meal) => (
              <Card key={meal._id} meal={meal} />
            ))}
          </div>
        </InfiniteScroll>
      </div>
    </div>
  );
};

export default AllMeals;
