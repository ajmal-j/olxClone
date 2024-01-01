import { useState } from "react";
import "./index.css";
import { UserAuth } from "../../context/authProvider";
import { FaSpinner } from "react-icons/fa";
import { v4 } from "uuid";
import { useNavigate } from "react-router-dom";

type Create = {
  name: string;
  category: string;
  price: number;
};

export default function Create() {
  const { user, uploadImage, setProduct } = UserAuth();
  const [image, setImage] = useState<null | Blob>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [state, setState] = useState<Create>({
    name: "",
    category: "",
    price: 0,
  });
  const navigate = useNavigate();
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setState((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const handleSubmit = async (e: React.FormEvent) => {
    setLoading(true);
    try {
      e.preventDefault();
      const { category, name, price } = state;
      7;
      let url = "";
      let none = !name
        ? "name"
        : !category
        ? "category"
        : !price
        ? "price"
        : null;
      if (none) return alert("Enter " + none);
      if (image) url = await uploadImage(image);
      else return alert("select a image");
      setProduct(v4(), user.uid, name, category, price, url);
      navigate("/");
    } catch (error) {
      console.log("uploading docs : ", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='flex flex-col justify-center py-12 sm:px-6 lg:px-8'>
      <div className='mt-8 sm:mx-auto sm:w-full sm:max-w-md'>
        <div className='bg-gray-200 py-20 px-4 shadow sm:rounded-lg sm:px-10'>
          <h1 className='text-3xl font-bold pb-5 text-black/60'>Add Product</h1>
          <form onSubmit={handleSubmit}>
            <div>
              <label
                className='block text-sm font-medium text-gray-700'
                htmlFor='name'
              >
                Name
              </label>
              <div className='mt-1'>
                <input
                  onChange={handleChange}
                  className='appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
                  autoComplete='name'
                  type='text'
                  name='name'
                  id='name'
                />
              </div>
            </div>

            <div className='mt-6'>
              <label
                className='block text-sm font-medium text-gray-700'
                htmlFor='category'
              >
                Category
              </label>
              <div className='mt-1'>
                <input
                  onChange={handleChange}
                  className='appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
                  autoComplete='category'
                  type='text'
                  name='category'
                  id='category'
                />
              </div>
            </div>
            <div className='mt-6'>
              <label
                className='block text-sm font-medium text-gray-700'
                htmlFor='price'
              >
                Price
              </label>
              <div className='mt-1'>
                <input
                  onChange={handleChange}
                  className='appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
                  autoComplete='current-price'
                  type='number'
                  name='price'
                  id='price'
                />
              </div>
            </div>
            <div className='my-7'>
              <label className='custum-file-upload' htmlFor='file'>
                {image ? (
                  <img
                    src={image ? URL.createObjectURL(image) : ""}
                    alt=''
                    className='h-[200px] z-10'
                  />
                ) : (
                  <div className='icon'>
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      fill=''
                      viewBox='0 0 24 24'
                    >
                      <g strokeWidth='0' id='SVGRepo_bgCarrier'></g>
                      <g
                        strokeLinejoin='round'
                        strokeLinecap='round'
                        id='SVGRepo_tracerCarrier'
                      ></g>
                      <g id='SVGRepo_iconCarrier'>
                        {" "}
                        <path
                          fill=''
                          d='M10 1C9.73478 1 9.48043 1.10536 9.29289 1.29289L3.29289 7.29289C3.10536 7.48043 3 7.73478 3 8V20C3 21.6569 4.34315 23 6 23H7C7.55228 23 8 22.5523 8 22C8 21.4477 7.55228 21 7 21H6C5.44772 21 5 20.5523 5 20V9H10C10.5523 9 11 8.55228 11 8V3H18C18.5523 3 19 3.44772 19 4V9C19 9.55228 19.4477 10 20 10C20.5523 10 21 9.55228 21 9V4C21 2.34315 19.6569 1 18 1H10ZM9 7H6.41421L9 4.41421V7ZM14 15.5C14 14.1193 15.1193 13 16.5 13C17.8807 13 19 14.1193 19 15.5V16V17H20C21.1046 17 22 17.8954 22 19C22 20.1046 21.1046 21 20 21H13C11.8954 21 11 20.1046 11 19C11 17.8954 11.8954 17 13 17H14V16V15.5ZM16.5 11C14.142 11 12.2076 12.8136 12.0156 15.122C10.2825 15.5606 9 17.1305 9 19C9 21.2091 10.7909 23 13 23H20C22.2091 23 24 21.2091 24 19C24 17.1305 22.7175 15.5606 20.9844 15.122C20.7924 12.8136 18.858 11 16.5 11Z'
                          clipRule='evenodd'
                          fillRule='evenodd'
                        ></path>{" "}
                      </g>
                    </svg>
                  </div>
                )}
                <div className='text'>
                  <span>Click to upload image</span>
                </div>
                <input
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    // @ts-ignore
                    setImage(e.target.files[0])
                  }
                  type='file'
                  id='file'
                />
              </label>
            </div>
            <div className='mt-6'>
              <button
                className='group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm  items-center font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 h-[40px]'
                type='submit'
              >
                {loading ? <FaSpinner className='animate-spin' /> : "Add"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
