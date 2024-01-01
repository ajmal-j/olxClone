import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserAuth } from "../../context/authProvider";
import { FaSpinner } from "react-icons/fa";
import InputWithLabel from "../../components/input";
import toast from "react-hot-toast";

export default function SignUp() {
  const { signUp, setDetails } = UserAuth();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [state, setState] = useState({
    name: "",
    email: "",
    password: "",
    contact: "",
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
    signUp(state.email, state.password)
      .then((result) => {
        setDetails(result.user.uid, state.email, state.contact, state.name)
          .then(() => {
            toast.success('Signed Up')
            navigate("/");
          })
          .catch((error) => {
            console.log(error);
          });
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
    <div className='w-[500px] mx-auto mt-10 pt-3 h-min bg-gray-100 rounded-[50px] pb-[20px] border-gray-300 border-4 mb-5'>
      <div>
        <img src='/olx-logo.svg' className='h-[150px] mx-auto' alt='' />
      </div>
      <h1 className='font-bold text-2xl mt-5 text-center'>Sign Up</h1>
      <p className='block text-center pt-4 text-red-600'>
        {message ? message : "\u00A0"}
      </p>
      <form className='flex flex-col gap-3 p-5' onSubmit={handleSubmit}>
        <InputWithLabel
          name='name'
          onChange={handleChange}
          id='name'
          type='text'
          placeholder='Enter your full name.'
          label='name'
        />

        <InputWithLabel
          name='contact'
          onChange={handleChange}
          id='contact'
          type='number'
          placeholder='+91-'
          label='contact'
        />

        <InputWithLabel
          name='email'
          onChange={handleChange}
          id='email'
          type='email'
          label='email'
          placeholder='Enter here.'
        />

        <InputWithLabel
          name='password'
          onChange={handleChange}
          id='password'
          type='password'
          label='password'
          placeholder='Enter here.'
        />
        <span className='text-gray-500 mt-4 ms-2'>
          existing user?{" "}
          <Link to={"/signIn"}>
            <span className='underline text-black/70 font-bold'>Sign In</span>
          </Link>
        </span>
        <button className='bg-gray-600 text-white h-[50px] mt-2 rounded-full  font-bold mb-5'>
          {loading ? <FaSpinner className='animate-spin mx-auto' /> : "Sign Up"}
        </button>
      </form>
    </div>
  );
}
