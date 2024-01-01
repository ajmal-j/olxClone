type Input = {
  placeholder: string;
  label: string;
  onChange:any;
  id: string;
  type: string;
  name: string;
};

export default function InputWithLabel({
  id,
  name,
  label,
  onChange,
  placeholder,
  type,
}: Input) {
  return (
    <>
      <label htmlFor='email' className='-mb-0.5'>
        {label}
      </label>
      <input
        name={name}
        onChange={onChange}
        id={id}
        type={type}
        className='h-[40px] px-4 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
        placeholder={placeholder}
      />
    </>
  );
}
