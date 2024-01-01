import { FaChevronDown } from "react-icons/fa";
export default function Navbar() {
  return (
    <div className=' border-b-[3px] mt-[83px] py-2'>
      <div className='flex items-center container mx-auto '>
        <span className='font-bold flex items-center gap-3'>
          ALL CATEGORIES <FaChevronDown />
        </span>
        <div className='ps-[30px] flex flex-1 justify-between whitespace-nowrap overflow-ellipsis'>
          <span className='overflow-ellipsis'>Cars</span>
          <span className='overflow-ellipsis'>Motorcycle</span>
          <span className='overflow-ellipsis'>Mobile Phone</span>
          <span className='overflow-ellipsis'>Scooter</span>
          <span className='overflow-ellipsis'>Commercial & Others</span>
        </div>
      </div>
    </div>
  );
}
