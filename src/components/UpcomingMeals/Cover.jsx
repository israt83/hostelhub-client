import { Parallax } from 'react-parallax';

const Cover = () => {
    return (
        <Parallax
            blur={{ min: -50, max: 50 }}
            bgImage='https://img.freepik.com/free-photo/top-view-table-full-delicious-food-composition_23-2149141350.jpg?w=900&t=st=1726231455~exp=1726232055~hmac=79b8c56ca1b8ccdb50958ae56fc192d89e213862c9e06c17d5bb7ff03629ebea'
            bgImageAlt="the menu"
            strength={-200}
        >
            <div className="hero h-[500px]">
                <div className="hero-overlay bg-opacity-60"></div>
                <div className="hero-content text-center text-neutral-content">
                    <div className="text-white mt-40">
                        <h1 className="mb-5 text-5xl font-bold uppercase">Explore Upcoming Meals</h1>
                        <p className="mb-5"> Discover the exciting range of meals coming soon to our dining options! <br /> Only premium users (Silver, Gold, Platinum) can interact by  giving a like to each meal. From breakfast to dinner, get a sneak peek <br /> into the delicious offerings and prepare to savor new flavors.</p>

                    </div>
                </div>
            </div>
        </Parallax>

    );
};

export default Cover;