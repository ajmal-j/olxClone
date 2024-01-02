import { useNavigate, useParams } from "react-router-dom";
import { useCallback, useContext, useEffect, useMemo, useState } from "react";
import { ProductContext } from "../../context/productContext";
import { UserAuth } from "../../context/authProvider";
import "./index.css";
import {
  FaPhone,
  FaSpinner,
  FaTrashAlt,
  FaUser,
  FaUserCheck,
} from "react-icons/fa";
import Card from "../card";

const View = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [seller, setSeller] = useState<any>();
  const [loading, setLoading] = useState<boolean>(false);
  const { view, setView } = useContext(ProductContext);
  const { getDetails, getProduct, deleteProduct, user } = UserAuth();
  const getProductMemoized = useMemo(() => getProduct, []);
  const getDetailsMemoized = useMemo(() => getDetails, []);
  const fetchData = useCallback(async () => {
    if (!view) return;
    try {
      // @ts-ignore
      const productData = await getProductMemoized(id);
      if (!productData) navigate("/");
      setView(productData);
      const sellerData = await getDetailsMemoized(productData?.userId);
      setSeller(sellerData);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  }, [id, view, getProductMemoized, getDetailsMemoized]);

  useEffect(() => {
    setLoading(true);
    fetchData();
  }, [id]);

  return (
    <>
      {loading && !Object.keys(view).length ? (
        <FaSpinner className='animate-spin text-2xl mx-auto mt-5' />
      ) : (
        <>
          <div className='viewParentDiv'>
            <div className='imageShowDiv'>
              <img
                className='rounded-xl object-cover w-full h-full'
                src={view?.imageUrl}
                alt=''
              />
            </div>
            <span className='block pt-[3rem] text-center text-2xl capitalize'>
              {view?.name}
            </span>
            <div className='rightSection container mx-auto'>
              <div className='productDetails childElement'>
                <p>&#x20B9; {view?.price}</p>
                <p>{view?.category}</p>
                <span>{view?.createAt}</span>
                <button className='buttonClass block bg-[rgba(0,47,52,1)] w-full text-white py-3 mt-2 rounded-lg'>
                  Make offer
                </button>
              </div>
              <div className='contactDetails childElement'>
                <p className='sellerDetails'>Seller details</p>
                <p className='flex gap-3 items-center'>
                  <FaUserCheck className='text-black/80' /> {seller?.name}
                </p>
                <p className='flex gap-3 items-center'>
                  {" "}
                  <FaPhone className='text-black/80' /> {seller?.contact}
                </p>
                {user && id && view?.userId === user?.uid && (
                  <button className='cursor-default flex w-full items-end justify-end text-red-600 pt-3'>
                    <FaTrashAlt
                      className='cursor-pointer'
                      onClick={() => {
                        deleteProduct(id);
                        navigate("/");
                      }}
                    />
                  </button>
                )}
              </div>
            </div>
            <div className='container mx-auto border p-4 rounded-xl'>
              <h1 className='font-bold pb-3 underline'>Product Detail's</h1>
              <span>{view?.description}</span>
            </div>
          </div>
        </>
      )}
      <div className='mt-5 border-t-[1px] border-t-gray-300 pt-5'>
        <div className='container mx-auto'>
          <h1 className='text-2xl font-thin mb-3 '>Related Product's</h1>
          <Card />
        </div>
      </div>
    </>
  );
};
export default View;
