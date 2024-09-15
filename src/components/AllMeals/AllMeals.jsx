


import { useState, useEffect } from 'react';
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
  const [totalMeals, setTotalMeals] = useState(0); // Track total available meals
  

  const axiosSecure = useAxiosSecure();

  const fetchMeals = async (pageParam = page) => {
    const queryString = `/all-meals?category=${category}&priceRange=${priceRange}&search=${search}&page=${pageParam}`;
    const { data } = await axiosSecure.get(queryString);

    if (data && Array.isArray(data.meals)) {
      return { meals: data.meals, totalMeals: data.totalMeals };
    } else {
      console.error('API response is not in the expected format:', data);
      return { meals: [], totalMeals: 0 };
    }
  };

  const { refetch } = useQuery({
    queryKey: ['all-meals', category, priceRange, search],
    queryFn: async () => {
      const { meals: initialMeals, totalMeals: totalMealsCount } = await fetchMeals(1);
      setMeals(initialMeals); // Set initial meals on load or filters change
      setTotalMeals(totalMealsCount); // Store total number of meals
      setPage(1); // Reset page to 1
      setHasMore(initialMeals.length < totalMealsCount); // Set hasMore based on availability
      return initialMeals;
    },
    refetchOnWindowFocus: false,
    keepPreviousData: true,
  });

  useEffect(() => {
    refetch(); // Refetch meals on filters/search change
  }, [category, priceRange, search]);

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
    setPage(1); // Reset to the first page on new search
    setHasMore(true); // Reset hasMore
    refetch();
  };

  const fetchMoreData = async () => {
    const nextPage = page + 1;
    const { meals: newMeals, totalMeals: totalMealsCount } = await fetchMeals(nextPage);

    if (Array.isArray(newMeals) && newMeals.length > 0) {
      setMeals((prevMeals) => [...prevMeals, ...newMeals]);
      setPage(nextPage);
      if (meals.length + newMeals.length >= totalMealsCount) {
        setHasMore(false); // Stop fetching if all meals are loaded
      }
    } else {
      setHasMore(false);
      console.error('API response for fetchMoreData is not an array:', newMeals);
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
                setPage(1);
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
                setPage(1);
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
