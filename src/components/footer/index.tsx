export default function Footer() {
  return (
    <div className='mt-auto pt-20'>
      <img src='/phone-app.webp' className='object-contain ml-5' alt='' />
      <footer className='flex gap-3 w-full justify-between items-top flex-wrap bg-gray-200 p-4 border-t-[1px] border-t-gray-300'>
        <div className=''>
          <h3 className='font-bold underline pb-3 text-black/80'>
            POPULAR LOCATIONS
          </h3>
          <ul className='text-black/60 cursor-pointer'>
            <li>Kolkata</li>
            <li>Mumbai</li>
            <li>Chennai</li>
            <li>Pune</li>
          </ul>
        </div>

        <div className=''>
          <h3 className='font-bold underline pb-3 text-black/80'>
            TRENDING LOCATIONS
          </h3>
          <ul className='text-black/60 cursor-pointer'>
            <li>Bhubaneshwar</li>
            <li>Hyderabad</li>
            <li>Chandigarh</li>
            <li>Nashik</li>
          </ul>
        </div>

        <div className=''>
          <h3 className='font-bold underline pb-3 text-black/80'>ABOUT US</h3>
          <ul className='text-black/60 cursor-pointer'>
            <li>Contact Us</li>
            <li>OLX</li>
            <li>Help</li>
            <li>Sitemap</li>
            <li>Legal & Privacy information</li>
            <li>Vulnerability Disclosure Program</li>
          </ul>
        </div>
      </footer>
      <div className='bg-[rgba(0,47,52,1)]'>
        <span className='block text-center text-white/70 text-sm py-5'>
          @2023 | All Right's Reserved
        </span>
      </div>
    </div>
  );
}
