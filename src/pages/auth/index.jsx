import { Tab } from "@headlessui/react";
import { useEffect, useMemo } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import Login from "./login";
import Register from "./register";

const TABS = [
  {
    id: 'login',
    title: 'Masuk',
    content: <Login />
  },
  {
    id: 'register',
    title: 'Daftar',
    content: <Register />
  }
]

export default function Auth() {
  const navigate = useNavigate()
  const params = useParams()
  const authStatus = useSelector(state => state.auth.status)
  const authType = params.authType
  const tabIndex = useMemo(() => {
    return TABS.findIndex(tab => tab.id === authType)
  }, [authType])

  const handleChangeTab = index => {
    navigate(`/auth/${TABS[index].id}`, { replace: true })
  }

  useEffect(() => {
    if (authStatus === 'authenticated') navigate('/', { replace: true })
  }, [authStatus, navigate])

  return (
    <div className='relative min-h-inherit bg-gray-200'>
      <div className='w-full p-5 m-auto min-h-inherit flex flex-col justify-center' style={{ maxWidth: 600 }}>
        <div className='w-full rounded-lg overflow-hidden bg-gray-50 border shadow-2xl'>
          <div className='flex'>
            <div className='flex-0 sm:flex-1 relative'>
              <img className='absolute left-0 top-0 w-full h-full object-cover' src='https://images.pexels.com/photos/1906879/pexels-photo-1906879.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500' alt='Auth'/>
            </div>
            <div className='flex-1'>
              <Tab.Group onChange={handleChangeTab} manual defaultIndex={tabIndex}>
                <Tab.List className='flex whitespace-nowrap bg-gray-200 bg-opacity-50 px-5'>
                  {TABS.map(tab => (
                    <Tab
                      style={{ marginBottom: -1 }}
                      className={({ selected }) => (
                        selected
                          ? 'p-3 text-blue-600 font-bold border-b-2 border-blue-600'
                          : 'p-3 text-gray-800 font-bold'
                      )}
                    >
                      {tab.title}
                    </Tab>
                  ))}
                </Tab.List>
                <Tab.Panels>
                  {TABS.map(tab => (
                    <Tab.Panel className='p-5'>{tab.content}</Tab.Panel>
                  ))}
                </Tab.Panels>
              </Tab.Group>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}