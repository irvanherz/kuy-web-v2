import { Menu, Transition } from '@headlessui/react'
import { Fragment, useEffect, useRef, useState } from 'react'
import { CalendarIcon, CurrencyDollarIcon, KeyIcon, LogoutIcon, MailIcon, PencilIcon, UserCircleIcon, UserIcon } from '@heroicons/react/solid'
import { Link } from 'react-router-dom'
import { getAuth, signOut } from 'firebase/auth'
const MENU_ITEMS = [
  [
    {
      id: 1,
      icon: UserIcon,
      title: 'Profil Saya',
      link: '/users/me',
    },
  ],
  [
    {
      id: 2,
      icon: MailIcon,
      title: 'Kotak Pesan',
      link: '/chats',
    },
    {
      id: 3,
      icon: CalendarIcon,
      title: 'Perjalanan Saya',
      link: '/trips',
    },
  ],
]
export default function ProfileMenu({ children, className }) {
  const handleLogout = async () => {
    const auth = getAuth()
    await signOut(auth)
  }

  return (
    <Menu as='div' className='relative flex'>
      <Menu.Button as='button'>
        <UserCircleIcon className='w-6 h-6' />
      </Menu.Button>
      <Menu.Items className="absolute z-30 right-0 w-56 mt-2 origin-top-right bg-white divide-y divide-gray-100 rounded-md shadow-lg focus:outline-none">
        {MENU_ITEMS.map(menuItemGroup => (
          <div className="px-1 py-1 ">
            {menuItemGroup.map(({ title, icon: IconComponent, link }) => (
              <Menu.Item>
                {({ active }) => (
                  <Link
                    to={link}
                    className={`${active ? 'bg-gray-100 text-gray-900' : 'text-gray-900'} group flex rounded-md items-center w-full px-2 py-2 text-sm`}
                  >
                    <IconComponent className="w-5 h-5 mr-2" />{title}
                  </Link>
                )}
              </Menu.Item>
            ))}
          </div>
        ))}
        <div className="px-1 py-1">
          <Menu.Item>
            {({ active }) => (
              <button onClick={handleLogout} className={`${active ? 'bg-red-100 text-red-800' : 'text-red-800'} group flex rounded-md items-center w-full px-2 py-2 text-sm`}>
                <LogoutIcon className="w-5 h-5 mr-2" />Logout
              </button>
            )}
          </Menu.Item>
        </div>
      </Menu.Items>

    </Menu>

  )
}