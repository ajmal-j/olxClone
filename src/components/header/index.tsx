import { FiLogOut, FiSearch } from "react-icons/fi";
import { FaPlus } from "react-icons/fa";
import { FaChevronDown } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { UserAuth } from "../../context/authProvider";

export default function Header() {
  const { user, getDetails, logOut } = UserAuth();
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState<any>();
  const navigateFunction = () => {
    navigate("/");
  };
  useEffect(() => {
    if (!user?.uid) return;
    const fetchData = async () => {
      try {
        const result = await getDetails(user.uid);
        setCurrentUser(result);
      } catch (error) {
        console.error("Error fetching user details:", error);
      }
    };
    fetchData();
  }, [user]);
  return (
    <>
      <div className='w-full bg-white fixed top-0 left-0 right-0 h-[83px] border-b-[3px]'></div>
      <div className='bg-black/5  fixed left-0 right-0 top-0 h-[75px] pb-3 '>
        <div className='flex container mx-auto justify-evenly  pt-3 items-center'>
          <img
            src='/logo.png'
            onClick={navigateFunction}
            alt='company logo'
            className='w-[60px] '
          />
          <div className='relative'>
            <input
              type='text'
              placeholder='India'
              className='px-2 pl-10 border-2 border-black rounded h-[55px]'
            />
            <FiSearch className='absolute left-2 top-[1.1rem] text-xl' />
            <FaChevronDown className='absolute right-3 top-[1.1rem] text-xl' />
          </div>
          <div className='font-bold text-green-950'>ENGLISH</div>
          {currentUser ? (
            <>
              <button className='font-bold text-green-950 border-black border-b-2 hover:border-b-transparent'>
                {currentUser?.name}
              </button>
              <button
                className='text-red-600 font-bold cursor-pointer'
                title='logout'
                onClick={() => logOut(setCurrentUser)}
              >
                <FiLogOut />
              </button>
            </>
          ) : (
            <>
              <Link to={"/signIn"}>
                <button className='font-bold text-green-950 border-black border-b-2 hover:border-b-transparent'>
                  Login
                </button>
              </Link>
            </>
          )}
          <Link to={"/createProduct"}>
            <button className='flex items-center gap-2 font-bold bg-white px-5 py-2 rounded-full border-4 border-black/70 hover:bg-black/10'>
              <FaPlus /> SELL
            </button>
          </Link>
        </div>
      </div>
    </>
  );
}
