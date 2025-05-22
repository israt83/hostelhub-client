

const Slide = ({ image, text }) => {
  return (
    <div
      className='w-full bg-center bg-cover h-[38rem]'
      style={{
        backgroundImage: `url(${image})`,
      }}
    >
      <div className='flex items-center justify-center w-full h-full bg-gray-900/70'>
        <div className='text-center'>
          <p className='text-4xl font-bold text-white my-5'>Welcome to Your Home Away from Home</p>
          <p className=' text-white lg:text-xl'>
          Experience comfort, community, and convenience. <br /> Discover the perfect place to live, learn, and thrive.
          </p>
          
           {/* Search Input and Button */}
           <div className='flex justify-center mt-5'>
            <input
              type='text'
              placeholder='Search your hostel...'
              className='px-4 py-2 rounded-l-full text-black outline-none w-70'
            />
            <button className='bg-orange-700 text-white px-6 py-2 rounded-r-full'>
              Search
            </button>
          </div>
          
        </div>
      </div>
    </div>
  )
}

export default Slide
