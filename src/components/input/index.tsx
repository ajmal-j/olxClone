import { FiSearch } from "react-icons/fi";

type Input = {
  placeholder: string;
  icon?: boolean;
  className: string;
};

export default function Input({ className, placeholder, icon }: Input) {
  return (
    <div className='relative'>
      <input type='text' placeholder={placeholder} className={className} />
      {icon && <FiSearch className='absolute left-2 top-[1.1rem] text-xl' />}
    </div>
  );
}
