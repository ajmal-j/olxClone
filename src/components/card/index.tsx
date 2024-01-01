import { FaHeart } from "react-icons/fa";
import "./index.css";
import { useNavigate } from "react-router-dom";

export default function Card() {
  const navigate = useNavigate();
  const navigateFunction = (e: React.MouseEvent<HTMLDivElement>) => {
    const id = e.currentTarget.dataset.id;
    if (id) navigate(`/view/${id}`);
  };
  return (
    <div className='cards'>
      {[1, 2, 3, 4, 5, 6].map((val, i) => {
        return (
          <div
            onClick={navigateFunction}
            key={i}
            data-id={"" + i}
            className='card border border-black/20 rounded'
          >
            <div className='favorite'>
              <FaHeart></FaHeart>
            </div>
            <div className='image'>
              <img src='/image.jpeg' alt='' />
            </div>
            <div className='content'>
              <p className='rate'>&#x20B9; 250000</p>
              <span className='category'>Properties</span>
              <p className='name'> HOUSE</p>
            </div>
            <div className='date'>
              <span>30/12/2023</span>
            </div>
          </div>
        );
      })}
    </div>
  );
}
