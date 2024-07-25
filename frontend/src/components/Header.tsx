import { Link } from "react-router-dom";
import { useAppContext } from "../contexts/AppContext";
import PopupMenu from "./PopupMenu";
import { BsCart, BsShop } from "react-icons/bs";
import { useState } from "react";
import { BiSearch } from "react-icons/bi";

const Header = () => {
  const { isLoggedIn } = useAppContext();
  const [showNav, setShowNav] = useState(false);

  return (<>
    <header className="pb-6 bg-white lg:pb-0">
      <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8 ">
        <nav className="flex items-center justify-between h-16 lg:h-20 bg-white border-b border-gray-200">
          <div className="flex-shrink-0">
            <Link to="/" title="" className="flex items-center">
              <img className="w-auto h-8 lg:h-10" src="hamaraBharatLogo.jpg" alt="Hamara Bharat Logo" />
              <span className="ml-2 text-xl md:text-xl lg:text-3xl font-semibold">
                Hamara <span className="text-orange-600">Bh</span><span className="text-blue-900">ar</span><span className="text-green-600">at</span>
              </span>
            </Link>
          </div>
          <div className="flex-grow mx-4 lg:mx-8 hidden lg:flex items-center rounded-md bg-slate-100">
            <BiSearch className="text-2xl ml-2" />
            <input
              type="text"
              placeholder="Search products..."
              className="w-full p-2 text-base rounded-md bg-transparent focus:outline-none focus:ring-0 focus:border-0 "
            />
      </div>

      <div className="flex items-center">
        {!isLoggedIn ? (
          <div className="flex items-center space-x-6 ">
            <Link to="/" className=" hidden lg:flex text-2xl gap-1 items-center text-black transition duration-200 rounded-full hover:text-blue-600 focus:text-blue-600">
              <BsShop /><span className="text-lg"> Become a Seller</span>
            </Link>
            <Link className="text-base font-medium text-black transition duration-200 hover:text-blue-600 hidden lg:block " to="/register">Sign up</Link>
            <Link className="text-base font-medium text-black transition duration-200 landscape:hover:text-blue-600 portrait:bg-blue-600 portrait:text-white rounded portrait:px-4 portrait:py-2 " to="/sign-in">Sign in</Link>
          </div>
        ) : (
          <div className="flex items-center space-x-6">
            <Link to="/" className="text-2xl hidden lg:flex gap-1 items-center text-black transition duration-200 rounded-full hover:text-blue-600 focus:text-blue-600">
              <BsShop /><span className="text-lg"> Become a Seller</span>
            </Link>
            {isLoggedIn && <Link to="/" className="text-2xl flex gap-1 items-center text-black transition duration-200 rounded-full hover:text-blue-600 focus:text-blue-600">
              <BsCart /><span className="text-lg hidden lg:block"> Cart</span>
            </Link>}
            <PopupMenu isLoggedIn={isLoggedIn} />
          </div>
        )}
        <button
          type="button"
          className="inline-flex p-2 text-black transition duration-200 rounded-md lg:hidden focus:bg-gray-100 hover:bg-gray-100"
          onClick={() => setShowNav(!showNav)}
        >
          {showNav ? (
            <svg className="w-6 h-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg className="w-6 h-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 8h16M4 16h16" />
            </svg>
          )}
        </button>
      </div>
    </nav>
    {showNav && (
      <nav className="pt-4 pb-6 bg-white border border-gray-200 rounded-md shadow-md lg:hidden">
        <div className="flow-root">
          <div className="flex flex-col px-6 -my-2 space-y-1">
            <Link to="/" title="" className="inline-flex py-2 text-base font-medium text-black transition duration-200 hover:text-blue-600">Sign Up</Link>
          </div>
        </div>
        <div className="px-6 mt-6">
          <Link to="/" title="" className="inline-flex justify-center px-4 py-3 text-base font-semibold text-white transition duration-200 bg-blue-600 border border-transparent rounded-md hover:bg-blue-700 focus:bg-blue-700" role="button">Become a Seller</Link>
        </div>
      </nav>
    )}
  </div >
    </header >

  <div className=" mx-4 flex lg:mx-8 lg:hidden items-center rounded-md bg-slate-100">
    <BiSearch className="text-2xl ml-2" />
    <input
      type="text"
      placeholder="Search products..."
      className="w-full p-2 text-base rounded-md bg-transparent focus:outline-none focus:ring-0 focus:border-0 "
    />
  </div>


    </>
  );
};

export default Header;
