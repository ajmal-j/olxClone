import { FiLogOut, FiSearch } from "react-icons/fi";
import { FaPlus } from "react-icons/fa";
import { FaChevronDown } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { UserAuth } from "../../context/authProvider";

export default function Header() {
  const { user, getDetails, logOut } = UserAuth();
  const [currentUser, setCurrentUser] = useState<any>();
  useEffect(() => {
    const fetchData = async () => {
      try {
        if(!user.uid) return
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
      <div className='w-full z-10 bg-white fixed top-0 left-0 right-0 h-[83px] border-b-[3px]'></div>
      <div className='bg-black/5  fixed left-0 right-0 top-0 h-[75px] pb-3 z-30'>
        <div className='flex container mx-auto justify-evenly gap-1 pt-3 items-center'>
          <Link to={"/"}>
            <img src='/logo.png' alt='company logo' className='w-[60px] ' />
          </Link>
          <div className='relative'>
            <input
              type='text'
              placeholder='India'
              className='px-2 pl-10 hidden sm:block border-2 border-black rounded h-[55px]'
            />
            <FiSearch className='hidden sm:block absolute left-2 top-[1.1rem] text-xl' />
            <FiSearch className='sm:hidden  text-xl' />
            <FaChevronDown className='hidden sm:block absolute right-3 top-[1.1rem] text-xl' />
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
            <div className='relative hover:shadow-xl rounded-full shadow-black flex justify-center items-center'>
              <img src='/sell.svg' className='' alt='' />
              <button className='flex items-center gap-2 font-bold absolute'>
                <FaPlus /> SELL
              </button>
            </div>
          </Link>
        </div>
      </div>
    </>
  );
}
