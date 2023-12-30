import { FiSearch } from "react-icons/fi";
import { FaPlus } from "react-icons/fa";

export default function Header() {
  return (
    <div className='bg-black/5 h-[75px] pb-3'>
      <div className='flex container mx-auto justify-evenly fixed left-0 right-0 top-0   items-center'>
        <img src='/logo.png' alt='' className='w-[70px]' />
        <div className='relative'>
          <input
            type='text'
            placeholder='India'
            className='px-2 pl-10 border-2 border-black rounded h-[55px]'
          />
          <FiSearch className='absolute left-2 top-[1.1rem] text-xl' />
        </div>
        <div className='font-bold text-green-950'>ENGLISH</div>
        <button className='font-bold text-green-950 border-b-black border-2 border-transparent'>
          Login
        </button>
        <button className='flex items-center gap-2 font-bold bg-white px-5 py-3 rounded-full border-4 border-black/70'>
          <FaPlus /> SELL
        </button>
      </div>
    </div>
  );
}
