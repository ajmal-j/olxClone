import { useParams } from "react-router-dom";
import "./index.css";
import { useCallback, useContext, useEffect, useMemo, useState } from "react";
import { ProductContext } from "../../context/productContext";
import { UserAuth } from "../../context/authProvider";
const View = () => {
  const { id } = useParams();
  const [seller, setSeller] = useState<any>();
  const { view, setView } = useContext(ProductContext);
  const { getDetails, getProduct } = UserAuth();

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
    }
  }, [id, view, getProductMemoized, getDetailsMemoized]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);
  return (
    <div className='viewParentDiv'>
      <div className='imageShowDiv'>
        <img src={view.imageUrl} alt='' />
      </div>
      <div className='rightSection'>
        <div className='productDetails'>
          <p>&#x20B9; {view.price}</p>
          <span> {view.name}</span>
          <p>{view.category}</p>
          <span>{view.createAt}</span>
        </div>
        <div className='contactDetails'>
          <p>Seller details</p>
          <p>{seller?.name}</p>
          <p>{seller?.contact}</p>
        </div>
      </div>
    </div>
  );
};
export default View;
