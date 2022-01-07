import { SearchIcon, UserCircleIcon } from "@heroicons/react/solid"
import { useSelector } from "react-redux"
import { Link } from "react-router-dom"
import ProfileMenu from "./profile-menu"

const Navbar = () => {
  const authStatus = useSelector(state => state.auth.status)
  return (
    <div className='w-full'>
      <section className="container relative mx-auto">
        <nav className="flex items-center justify-between">
          <div className="flex-none">
            <Link className="" to="/">
              <img src={`${process.env.PUBLIC_URL}/assets/images/logo-light-text.svg`} alt="Liburanaja" className='hidden w-40 sm:block' />
              <img src={`${process.env.PUBLIC_URL}/assets/images/logo-light-iconic.svg`} alt="Liburanaja" className='block w-10 sm:hidden' />
            </Link>
          </div>
          <div className="px-5 xl:px-12 flex-1">
            <div className="flex items-center bg-white bg-opacity-30 shadow rounded">
              <input type="search" className='flex-1 border-0 px-4 py-2 bg-transparent outline-none' placeholder="Cari perjalanan" />
              <SearchIcon className='w-4 h-4 m-3' />
            </div>
          </div>
          <div className="flex space-x-5 items-center">
            <div>
              <Link to='/organizers/mine' className="font-black hover:text-gray-200" href="#">Pengelola Perjalanan</Link>
            </div>
            {authStatus === 'authenticated'
              ? <ProfileMenu />
              : <div>
                <Link to='/auth/login' className="font-black hover:text-gray-200" href="#">LOGIN</Link>
              </div>
            }
          </div>
        </nav>
      </section>
    </div>
  )
}

export default Navbar