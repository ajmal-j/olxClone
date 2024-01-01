import { Link } from "react-router-dom";

export default function SignIn() {
  return (
    <div className='w-[500px] mx-auto mt-20 pt-5 h-[550px] bg-gray-300 rounded-lg border-gray-400 border-4'>
      <div>
        <img src='/logo.png' className='h-[100px] mx-auto' alt='' />
      </div>
      <h1 className='font-bold text-2xl mt-5 text-center'>Sign In</h1>
      <form className='flex flex-col gap-3 p-5'>
        <label htmlFor='email' className='-mb-0.5'>
          Email
        </label>
        <input
          id='email'
          type='text'
          className='border rounded h-[40px] px-4'
          placeholder='Enter here...'
        />
        <label htmlFor='password' className='-mb-0.5'>
          Password
        </label>
        <input
          id='password'
          type='text'
          className='border rounded h-[40px] px-4'
          placeholder='Enter here...'
        />
        <span className='text-gray-500'>
          not a user?{" "}
          <Link to={"/signUp"}>
            <span className='underline text-black/70 font-bold'>Sign Up</span>
          </Link>
        </span>
        <button className='bg-gray-600 text-white  py-4 mt-5 rounded  font-bold'>
          Sign in
        </button>
      </form>
    </div>
  );
}
