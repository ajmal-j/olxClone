import { useParams } from "react-router-dom";
import { useCallback, useContext, useEffect, useMemo, useState } from "react";
import { ProductContext } from "../../context/productContext";
import { UserAuth } from "../../context/authProvider";
import "./index.css";
import { FaSpinner, FaTrashAlt } from "react-icons/fa";

const View = () => {
  const { id } = useParams();
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
  }, []);

  return (
    <>
      {loading && !Object.keys(view).length ? (
        <FaSpinner className='animate-spin text-2xl mx-auto mt-5' />
      ) : (
        <>
          <span className='block pt-[3rem] text-center font-bold text-2xl underline capitalize'>
            {" "}
            {view.name}
          </span>
          <div className='viewParentDiv'>
            <div className='imageShowDiv'>
              <img className='rounded-xl' src={view.imageUrl} alt='' />
            </div>
            <div className='rightSection'>
              <div className='productDetails'>
                <p>&#x20B9; {view.price}</p>
                <p>{view.category}</p>
                <span>{view.createAt}</span>
              </div>
              <div className='contactDetails'>
                <p className='sellerDetails'>Seller details</p>
                <p>{seller?.name}</p>
                <p>{seller?.contact}</p>
                {user && id && view.userId === user?.uid && (
                  <button
                    onClick={() => deleteProduct(id)}
                    className='flex w-full items-end justify-end text-red-600 pt-3'
                  >
                    <FaTrashAlt />
                  </button>
                )}
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};
export default View;
