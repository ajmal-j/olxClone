import { FaHeart } from "react-icons/fa";
import "./index.css";
import { useNavigate } from "react-router-dom";
import { useCallback, useEffect, useMemo, useState } from "react";
import { UserAuth } from "../../context/authProvider";
// import { ProductContext } from "../../context/productContext";
import { FiLoader } from "react-icons/fi";

export default function Card() {
  const [products, setProducts] = useState<[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();
  const { getAllData } = UserAuth();
  // const { setView } = useContext(ProductContext);
  const navigateFunction = (e: React.MouseEvent<HTMLDivElement>) => {
    const id = e.currentTarget.dataset.id;
    if (id) navigate(`/view/${id}`);
  };

  const getAllDataMemoized = useMemo(() => getAllData, []);

  const fetchData = useCallback(async () => {
    try {
      const data = await getAllDataMemoized();
      setProducts(data);
    } finally {
      setLoading(false);
    }
  }, [getAllDataMemoized]);

  useEffect(() => {
    setLoading(true);
    fetchData();
  }, [fetchData]);

  if (!products.length && !loading) return <span>No products</span>;
  return (
    <div className='cards'>
      {loading && !products.length && (
        <FiLoader className='animate-spin text-3xl' />
      )}
      {products.map(({ category, createAt, id, imageUrl, name, price }, i) => {
        return (
          <div
            // onClick={() => {
            //   setView(products[i]);
            //   navigate("/view");
            // }}
            onClick={navigateFunction}
            key={id}
            data-id={id}
            className='card border border-black/20 rounded'
          >
            <div className='favorite'>
              <FaHeart></FaHeart>
            </div>
            <div className='image'>
              <img src={imageUrl} alt='' loading='lazy' />
            </div>
            <div className='content'>
              <p className='rate'>&#x20B9; {price}</p>
              <span className='category'>{category}</span>
              <p className='name'> {name}</p>
            </div>
            <div className='date'>
              <span>{createAt}</span>
            </div>
          </div>
        );
      })}
    </div>
  );
}
