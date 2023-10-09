import Link from "next/link";

export default function Home() {
  return (
    <div className='w-screen h-screen flex justify-center items-center'>
      <Link href={`/board`}>
        <h2 className='font-bold text-3xl text-black-500 group-hover:text-gray-50'>
          Go to board
        </h2>
      </Link>
    </div>
  );
}
