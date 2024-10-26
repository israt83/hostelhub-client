



import Container from "../Container";
import { AiOutlineBell, AiOutlineMenu } from "react-icons/ai";
import { useState } from "react";
import { Link } from "react-router-dom";
import useAuth from "../../../hooks/useAuth";
import avatarImg from "../../../assets/images/placeholder.jpg";
import logo from "../../../assets/images/logo.png";


const Navbar = () => {

  const { user, logOut } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false); 



  return (
    <div className="fixed w-full bg-white z-10 shadow-sm">
      <div className="py-4 border-b-[1px]">
        <Container>
          <div className="flex flex-row items-center justify-between gap-3 md:gap-0">
            {/* Logo */}
            <Link to="/">
              <div className="flex">
                <img
                  src={logo}
                  alt="logo"
                  width="180"
                  height="150"
                />
                <p className="-ml-12 mt-3 text-xl sm:text-2xl text-black uppercase">
                  <span className="text-3xl sm:text-4xl text-orange-600">H</span>ostel
                  <span className="text-3xl sm:text-4xl text-orange-600">H</span>ub
                </p>
              </div>
            </Link>

            {/* Centered Navigation Links */}
            <div className="hidden sm:flex flex-1 justify-center">
              <Link
                to="/"
                className="mx-2 sm:mx-4 text-sm font-semibold hover:underline"
              >
                Home
              </Link>
              <Link
                to="/meals"
                className="mx-2 sm:mx-4 text-sm font-semibold hover:underline"
              >
                Meals
              </Link>
              <Link
                to="/upcoming-meals"
                className="mx-2 sm:mx-4 text-sm font-semibold hover:underline"
              >
                Upcoming Meals
              </Link>
            </div>

            {/* Right Side */}
            <div className="relative flex items-center gap-3">
              {/* Notification Icon */}
              <div className="hidden sm:block cursor-pointer">
                <div className="flex">
                  <AiOutlineBell size={24} />
                  <sup className="text-lg">+0</sup>
                </div>
              </div>

            

              {/* Menu Icon for small screens */}
              <div className="block sm:hidden cursor-pointer">
                <AiOutlineMenu size={24} onClick={() => setIsMenuOpen(!isMenuOpen)} />
              </div>

              {/* Avatar for larger screens */}
              <div
                onClick={() => setIsOpen(!isOpen)}
                className="p-4 sm:py-1 sm:px-2 flex flex-row items-center gap-2 rounded-full cursor-pointer hover:shadow-md transition"
              >
                <p> {user ? "" : "Join Us"} </p>
                <div className="hidden sm:block">
                  {/* Avatar */}
                  <img
                    className=" object-cover rounded-full h-10 w-10 border-2 border-white"
                    referrerPolicy="no-referrer"
                    src={user && user.photoURL ? user.photoURL : avatarImg}
                    alt="profile"
                    height="40"
                    width="40"
                  />
                </div>
              </div>

              {isOpen && (
                <div className="absolute rounded-xl shadow-md w-[40vw] md:w-[10vw] bg-white overflow-hidden right-0 top-12 text-sm">
                  <div className="flex flex-col cursor-pointer">
                    {user ? (
                      <>
                        <Link className="block px-4 py-3 hover:bg-neutral-100 transition font-semibold">
                          {user.displayName || "User Name Not Found"}
                        </Link>
                        <Link
                          to="/dashboard/profile"
                          className="block px-4 py-3 hover:bg-neutral-100 transition font-semibold"
                        >
                          Dashboard
                        </Link>
                        <div
                          onClick={logOut}
                          className="px-4 py-3 hover:bg-neutral-100 transition font-semibold cursor-pointer"
                        >
                          Logout
                        </div>
                      </>
                    ) : (
                      <>
                        <Link
                          to="/login"
                          className="px-4 py-3 hover:bg-neutral-100 transition font-semibold"
                        >
                          Login
                        </Link>
                        <Link
                          to="/signup"
                          className="px-4 py-3 hover:bg-neutral-100 transition font-semibold"
                        >
                          Sign Up
                        </Link>
                      </>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Dropdown Menu for Small Screens */}
          {isMenuOpen && (
            <div className="block sm:hidden mt-4">
              <Link
                to="/"
                className="block  py-1 hover:bg-neutral-100 transition font-medium"
              >
                Home
              </Link>
              <Link
                to="/meals"
                className="block  py-1 hover:bg-neutral-100 transition font-medium"
              >
                Meals
              </Link>
              <Link
                to="/upcoming-meals"
                className="block  py-1 hover:bg-neutral-100 transition font-medium"
              >
                Upcoming Meals
              </Link>
              {user ? (
                <>
                  <Link
                    to="/dashboard/profile"
                    className="block  py-1 hover:bg-neutral-100 transition font-medium"
                  >
                    Dashboard
                  </Link>
                  <div
                    onClick={logOut}
                    className="block  py-1 hover:bg-neutral-100 transition font-medium cursor-pointer"
                  >
                    Logout
                  </div>
                </>
              ) : (
                <>
                  <Link
                    to="/login"
                    className="block  py-1 hover:bg-neutral-100 transition font-medium"
                  >
                    Login
                  </Link>
                  <Link
                    to="/signup"
                    className="block  py-1 hover:bg-neutral-100 transition font-medium"
                  >
                    Sign Up
                  </Link>
                </>
              )}
            </div>
          )}
        </Container>
      </div>
    </div>
  );
};

export default Navbar;
