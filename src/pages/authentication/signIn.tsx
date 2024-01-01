import { Link, useNavigate } from "react-router-dom";
import { UserAuth } from "../../context/authProvider";
import { useState } from "react";
import { FaSpinner } from "react-icons/fa";

export default function SignIn() {
  const { logIn } = UserAuth();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [state, setState] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setMessage("");
    setLoading(true);
    logIn(state.email, state.password)
      .then(() => {
        navigate("/");
      })
      .catch((error: Error) => {
        let i = error.message.indexOf("auth/") + 5;
        let errorMessage = error.message.slice(i, error.message.length - 2);
        setMessage(errorMessage);
      })
      .finally(() => {
        setTimeout(() => {
          setLoading(false);
        }, 500);
      });
  };

  return (
    <div className='w-[500px] mx-auto mt-20 pt-5 h-[550px] bg-gray-300 rounded-3xl border-gray-400 border-4'>
      <div>
        <img src='/logo.png' className='h-[100px] mx-auto' alt='' />
      </div>
      <h1 className='font-bold text-2xl mt-5 text-center'>Sign In</h1>
      <p className='block text-center pt-4 text-red-600'>
        {message ? message : "\u00A0"}
      </p>
      <form className='flex flex-col gap-3 p-5' onSubmit={handleSubmit}>
        <label htmlFor='email' className='-mb-0.5'>
          Email
        </label>
        <input
          name='email'
          onChange={handleChange}
          id='email'
          type='email'
          className='h-[40px] px-4 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
          placeholder='Enter here...'
        />
        <label htmlFor='password' className='-mb-0.5'>
          Password
        </label>
        <input
          name='password'
          onChange={handleChange}
          id='password'
          type='password'
          className='h-[40px] px-4 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
          placeholder='Enter here...'
        />
        <span className='text-gray-500'>
          not a user?{" "}
          <Link to={"/signUp"}>
            <span className='underline text-black/70 font-bold'>Sign Up</span>
          </Link>
        </span>
        <button className='bg-gray-600 text-white h-[50px] py-4 mt-5 rounded  font-bold'>
          {loading ? <FaSpinner className='animate-spin mx-auto' /> : "Sign In"}
        </button>
      </form>
    </div>
  );
}
