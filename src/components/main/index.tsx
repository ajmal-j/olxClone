import Card from "../card";

export default function Main() {
  return (
    <div className='container mx-auto mt-5 pl-2 pe-2 pb-5'>
      <h1 className='text-2xl mb-[35px]'>Fresh recommendations</h1>
      <div className='flex justify-center'>
        <Card />
      </div>
    </div>
  );
}
