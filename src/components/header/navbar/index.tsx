import { useState } from "react";
import { FaChevronDown } from "react-icons/fa";
export default function Navbar() {
  const [openWindow, toggleOpen] = useState<boolean>(false);
  return (
    <div className=' border-b-[3px] mt-[83px] py-2'>
      <div className='flex relative items-center container mx-auto '>
        <span
          onClick={() => toggleOpen(!openWindow)}
          className='cursor-pointer font-bold flex items-center gap-3 ps-3'
        >
          ALL CATEGORIES{" "}
          {openWindow ? (
            <FaChevronDown
              className='transition-transform duration-150'
              style={{ transform: "rotate(360deg)" }}
            />
          ) : (
            <FaChevronDown
              className='transition-transform duration-150'
              style={{ transform: "rotate(180deg)" }}
            />
          )}
        </span>
        <div
          className={`absolute top-10 border border-gray-300 left-auto bg-white p-5 ${
            openWindow ? "block" : "hidden"
          }`}
        >
          <ul className='flex flex-wrap gap-5'>
            <li>
              <u>
                <strong>Cars</strong>
              </u>
              <ul>
                <li>For Sale: Houses & Apartments</li>
                <li>For Rent: Houses & Apartments</li>
                <li>Lands & Plots</li>
                <li>For Rent: Shops & Offices</li>
                <li>For Sale: Shops & Offices</li>
                <li>PG & Guest Houses</li>
              </ul>
            </li>

            <li>
              <u>
                <strong>Mobiles</strong>
              </u>
              <ul>
                <li>Mobile Phones</li>
                <li>Accessories</li>
                <li>Tablets</li>
              </ul>
            </li>

            <li>
              <u>
                <strong>Jobs</strong>
              </u>
              <ul>
                <li>Data entry & Back office</li>
                <li>Sales & Marketing</li>
                <li>BPO & Telecaller</li>
                <li>Driver</li>
                <li>Office Assistant</li>
                <li>Delivery & Collection</li>
                <li>Teacher</li>
                <li>Cook</li>
              </ul>
            </li>

            <li>
              <u>
                <strong>Bikes</strong>
              </u>
              <ul>
                <li>Motorcycles</li>
                <li>Scooters</li>
                <li>Spare Parts</li>
                <li>Bicycles</li>
              </ul>
            </li>

            <li>
              <u>
                <strong>Electronics & Appliances</strong>
              </u>
              <ul>
                <li>TVs, Video - Audio</li>
                <li>Kitchen & Other Appliances</li>
                <li>Computers & Laptops</li>
                <li>Cameras & Lenses</li>
                <li>Games & Entertainment</li>
                <li>Fridges</li>
                <li>Computer Accessories</li>
                <li>Hard Disks, Printers & Monitors</li>
                <li>ACs</li>
                <li>Washing Machines</li>
              </ul>
            </li>

            <li>
              <u>
                <strong>Commercial Vehicles & Spares</strong>
              </u>
              <ul>
                <li>Commercial & Other Vehicles</li>
                <li>Spare Parts</li>
              </ul>
            </li>

            <li>
              <u>
                <strong>Furniture</strong>
              </u>
              <ul>
                <li>Sofa & Dining</li>
                <li>Beds & Wardrobes</li>
                <li>Home Decor & Garden</li>
                <li>Kids Furniture</li>
                <li>Other Household Items</li>
              </ul>
            </li>

            <li>
              <u>
                <strong>Fashion</strong>
              </u>
              <ul>
                <li>Men</li>
                <li>Women</li>
                <li>Kids</li>
              </ul>
            </li>

            <li>
              <u>
                <strong>Books, Sports & Hobbies</strong>
              </u>
              <ul>
                <li>Books</li>
                <li>Gym & Fitness</li>
                <li>Musical Instruments</li>
                <li>Sports Equipment</li>
                <li>Other Hobbies</li>
              </ul>
            </li>

            <li>
              <u>
                <strong>Pets</strong>
              </u>
              <ul>
                <li>Fishes & Aquarium</li>
                <li>Pet Food & Accessories</li>
                <li>Dogs</li>
                <li>Other Pets</li>
              </ul>
            </li>

            <li>
              <u>
                <strong>Services</strong>
              </u>
              <ul>
                <li>Education & Classes</li>
                <li>Tours & Travel</li>
                <li>Electronics Repair & Services</li>
                <li>Health & Beauty</li>
                <li>Home Renovation & Repair</li>
                <li>Cleaning & Pest Control</li>
                <li>Legal & Documentation Services</li>
                <li>Packers & Movers</li>
                <li>Other Services</li>
              </ul>
            </li>
          </ul>
        </div>
        <div className='ps-[30px] flex flex-1 justify-around whitespace-nowrap overflow-ellipsis gap-2 sm:justify-between'>
          <span className='overflow-ellipsis cursor-pointer'>Cars</span>
          <span className='overflow-ellipsis hidden sm:block cursor-pointer'>
            Motorcycle
          </span>
          <span className='overflow-ellipsis hidden sm:block cursor-pointer'>
            Mobile Phone
          </span>
          <span className='overflow-ellipsis hidden sm:block cursor-pointer'>
            Scooter
          </span>
          <span className='overflow-ellipsis cursor-pointer'>
            Commercial & Others
          </span>
        </div>
      </div>
    </div>
  );
}
