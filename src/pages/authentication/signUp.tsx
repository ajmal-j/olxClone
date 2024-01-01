import { useState } from "react";
import { Link } from "react-router-dom";
import { UserAuth } from "../../context/authProvider";
import { FaSpinner } from "react-icons/fa";

export default function SignUp() {
  const { signUp } = UserAuth();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [state, setState] = useState({
    name: "",
    email: "",
    password: "",
    contact: "",
  });
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
    signUp(state.email, state.password)
      .then((result: any) => {
        try {
          result.user.updateProfile({ displayName: state.name });
        } catch (error) {
          console.log(error);
        }
        console.log("loggedIn");
      })
      .catch((error: Error) => {
        let i = error.message.indexOf("auth/") + 5;
        let errorMessage = error.message.slice(i, error.message.length - 2);
        setMessage(errorMessage);
      })
      .finally(() => {
        setLoading(false);
      });
  };
  return (
    <div className='w-[500px] mx-auto mt-20 pt-5 pb-5` bg-gray-300 rounded-lg border-gray-400 border-4'>
      <div>
        <img src='/logo.png' className='h-[100px] mx-auto' alt='' />
      </div>
      <h1 className='font-bold text-2xl mt-5 text-center'>Sign Up</h1>
      <p className='block text-center pt-4 text-red-600'>
        {message ? message : "\u00A0"}
      </p>
      <form className='flex flex-col gap-3 p-5' onSubmit={handleSubmit}>
        <label htmlFor='name' className='-mb-0.5 '>
          Name
        </label>
        <input
          name='name'
          onChange={handleChange}
          id='name'
          type='text'
          placeholder='Enter your full name.'
          className='border rounded h-[40px] px-4 appearance-none'
        />
        <label htmlFor='contact' className='-mb-0.5 '>
          Contact
        </label>
        <input
          name='contact'
          onChange={handleChange}
          id='contact'
          type='number'
          placeholder='+91-'
          className='border rounded h-[40px] px-4 appearance-none'
        />
        <label htmlFor='email' className='-mb-0.5'>
          Email
        </label>
        <input
          name='email'
          onChange={handleChange}
          id='email'
          type='email'
          className='border rounded h-[40px] px-4'
          placeholder='Enter here.'
        />
        <label htmlFor='password' className='-mb-0.5'>
          Password
        </label>
        <input
          name='password'
          onChange={handleChange}
          id='password'
          type='password'
          className='border rounded h-[40px] px-4'
          placeholder='Enter here.'
        />
        <span className='text-gray-500'>
          existing user?{" "}
          <Link to={"/signIn"}>
            <span className='underline text-black/70 font-bold'>Sign In</span>
          </Link>
        </span>
        <button className='bg-gray-600 text-white h-[50px] mt-5 rounded  font-bold mb-5'>
          {loading ? <FaSpinner className='animate-spin mx-auto' /> : "Sign Up"}
        </button>
      </form>
    </div>
  );
}
