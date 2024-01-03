import { Link, useNavigate } from "react-router-dom";
import { UserAuth } from "../../context/authProvider";
import { useState } from "react";
import { FaSpinner } from "react-icons/fa";
import InputWithLabel from "../../components/input";
import toast from "react-hot-toast";

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
        toast.success("Signed In");
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
    <div className='max-w-[500px] w-full mx-auto mt-20 pt-5 h-min bg-gray-100 rounded-[50px] pb-[20px] border-gray-300 border-4'>
      <div>
        <img src='/olx-logo.svg' className='h-[150px] mx-auto' alt='' />
      </div>
      <h1 className='text-3xl mt-5 text-center'>Sign In</h1>
      <p className='block text-center pt-3 text-red-600'>
        {message ? message : "\u00A0"}
      </p>
      <form className='flex flex-col gap-3 p-5' onSubmit={handleSubmit}>
        <InputWithLabel
          name='email'
          onChange={handleChange}
          label='email'
          id='email'
          type='email'
          placeholder='Enter here...'
        />
        <InputWithLabel
          name='password'
          onChange={handleChange}
          id='password'
          type='password'
          label='password'
          placeholder='Enter here...'
        />
        <span className='text-gray-500 mt-3 ms-2'>
          not a user?{" "}
          <Link to={"/signUp"}>
            <span className='underline text-black/70 font-bold'>Sign Up</span>
          </Link>
        </span>
        <button className='bg-gray-600 text-white h-[50px] py-4 mt-3 rounded-full  font-bold'>
          {loading ? <FaSpinner className='animate-spin mx-auto' /> : "Sign In"}
        </button>
      </form>
    </div>
  );
}
