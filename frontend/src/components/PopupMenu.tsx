import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";
import SignOutButton from "./SignOutButton";
import { useAppContext } from "../contexts/AppContext";

interface Props {
  isLoggedIn: boolean;
}
// const ADMIN_USER_ID = import.meta.env.ADMIN_USER_ID || '660c46ed2d49645fcbacc6be';

const PopupMenu = ({ isLoggedIn }: Props) => {
  const {
  isAdmin
  } = useAppContext();
  // const isAdmin = (userId === ADMIN_USER_ID)

  const [isOpen, setIsOpen] = useState(false);
  useEffect(() => {
    document.addEventListener("click", handleDocumentClick); // Add event listener on mount
    return () => {
      document.removeEventListener("click", handleDocumentClick); // Remove event listener on unmount
    };
  }, []);
  const togglePopup = () => {
    setIsOpen(!isOpen);
  };
  const handleDocumentClick = (event: MouseEvent) => {
    const target = event.target as HTMLElement;
    if (!target.closest(".popup-profile")) {
      setIsOpen(false);
    }
  };

  return (
    <div className="relative inline-block popup-profile">
      <button
        onClick={togglePopup}
        className="flex gap-2 items-center  text-3xl  px-2 lg:py-2 rounded-full hover:text-blue-700"
      >
        <FaUserCircle />

      </button>
      {isOpen && (
        <div className="absolute right-0 z-[999] mt-2 bg-white border border-gray-300 rounded-lg shadow-lg min-w-max">
          {isLoggedIn?(
            <ul className="divide-y divide-gray-200">
            <li
              onClick={() => {
                setIsOpen(false);
              }}
            >
              <Link
                to="/profile"
                className="block py-2 px-4 portrait:py-1 portrait:px-2 portrait:text-sm text-base font-medium poppins hover:bg-gray-100"
              >
                Profile
              </Link>
            </li>
            {isAdmin && <li
              onClick={() => {
                setIsOpen(false);
              }}
            >
              <Link
                to="/admin"
                className="block py-2 px-4 portrait:py-1 portrait:px-2 portrait:text-sm text-base font-medium poppins hover:bg-gray-100"
              >
                Admin
              </Link>
            </li>}
            <li
              onClick={() => {
                setIsOpen(false);
              }}
            >
              <SignOutButton />
            </li>
          </ul>):(
            <ul className="divide-y divide-gray-200">
            <li
              onClick={() => {
                setIsOpen(false);
              }}
            >
              <Link
                to="/sign-in"
                className="block py-2 px-4 hover:bg-gray-100"
              >
                Sign in
              </Link>
            </li>
            <li
              onClick={() => {
                setIsOpen(false);
              }}
            >
              <Link
                to="/register"
                className="block py-2 px-4 hover:bg-gray-100"
              >
                Register
              </Link>
            </li>
          </ul>
          )}
        </div>
      )}
    </div>
  );
};

export default PopupMenu;
