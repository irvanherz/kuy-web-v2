import { Link } from "react-router-dom"

const Footer = () => {
  return (
    <div className='bg-gray-800'>
      <div className='container mx-auto p-5'>
        <div className='flex'>
          <div className='flex-1'>
            <div className='font-black text-lg text-white pb-5'>Tentang</div>
            <div className='column-count-1 sm:column-count-2'>
              <Link to='#' className='block text-sm text-gray-200 focus:text-gray-300 mb-2'>Tentang</Link>
              <Link to='#' className='block text-sm text-gray-200 focus:text-gray-300 mb-2'>Bantuan</Link>
              <Link to='#' className='block text-sm text-gray-200 focus:text-gray-300 mb-2'>Jadi Mitra</Link>
              <Link to='#' className='block text-sm text-gray-200 focus:text-gray-300 mb-2'>Kontak Kami</Link>
              <Link to='#' className='block text-sm text-gray-200 focus:text-gray-300 mb-2'>Jadi Pengelola</Link>
            </div>
          </div>
          <div className='flex-1'>
            <div className='font-black text-lg text-white pb-5'>Lainnya</div>
            <div className='column-count-1 sm:column-count-2'>
              <Link to='#' className='block text-sm text-gray-200 focus:text-gray-300 mb-2'>Syarat dan Ketentuan</Link>
              <Link to='#' className='block text-sm text-gray-200 focus:text-gray-300 mb-2'>Kebiajakan Privasi</Link>
              <Link to='#' className='block text-sm text-gray-200 focus:text-gray-300 mb-2'>Press Kit</Link>
              <Link to='#' className='block text-sm text-gray-200 focus:text-gray-300 mb-2'>Pengembang</Link>
              <Link to='#' className='block text-sm text-gray-200 focus:text-gray-300 mb-2'>Survey</Link>
            </div>
          </div>
          <div className='flex-1'>

          </div>
        </div>
      </div>
    </div>
  )
}

export default Footer