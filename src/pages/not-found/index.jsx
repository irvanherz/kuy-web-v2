import { HomeIcon } from "@heroicons/react/solid"
import { Link } from "react-router-dom"

const NotFound = () => {
  return (
    <div>
      <div className='container mx-auto'>
        <div className='p-5 text-center'>
          <img alt='404' src={`${process.env.PUBLIC_URL}/assets/images/404.svg`} className='w-60 h-60 mx-auto' />
          <div className='max-w-full sm:max-w-1/2'>
            <div className='text-xl font-extrabold'>Aduh, sepertinya Anda tersesat. Kami tidak bisa menemukan yang Anda cari.</div>
            <div>Santai saja, ada banyak hal yang bisa Anda temukan di halaman Beranda kami :)</div>
            <div className='mt-5'>
              <Link to={`/`}>
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" ><HomeIcon className='w-5 h-5 inline' /> Selamatkan Saya</button>
              </Link>
            </div>
          </div>
          
        </div>
      </div>
    </div>
  )
}

export default NotFound