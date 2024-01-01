import Card from "../card";

export default function Main() {
  return (
    <div className='container mx-auto mt-5 pl-2 pe-2 pb-5'>
      <span className='text-2xl mb-[40px] border-transparent border-b inline-block border-b-black'>Fresh recommendations</span>
      <div className='flex justify-center'>
        <Card />
      </div>
    </div>
  );
}
