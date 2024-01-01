import { useParams } from "react-router-dom";
import "./index.css";
const View = () => {
  const { id } = useParams();
  return (
    <div className='viewParentDiv'>
      <div className='imageShowDiv'>
        <img src='/image.jpeg' alt='' />
      </div>
      <div className='rightSection'>
        <div className='productDetails'>
          <p>&#x20B9; 250000 {id && id}</p>
          <span>HOME</span>
          <p>Property</p>
          <span>Saturday Dec 30 2023</span>
        </div>
        <div className='contactDetails'>
          <p>Seller details</p>
          <p>No name</p>
          <p>1234567890</p>
        </div>
      </div>
    </div>
  );
};
export default View;
