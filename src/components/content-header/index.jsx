import { ArrowLeftIcon, PlusIcon } from "@heroicons/react/solid"
import { useMemo } from "react"
import { Link, useNavigate } from "react-router-dom"

const ContentHeader = ({ title, subtitle, actions }) => {
  const navigate = useNavigate()
  const handleBack = () => navigate(-1)

  const renderedActions = useMemo(() => {
    const actionElements = Array.isArray(actions)
      ? actions
      : [actions]
    return actions
      ? actionElements.map(action => (
        <div className='m-2'>
          {action}
        </div>
      ))
      : null
  }, [actions])
  return (
    <div className='bg-blue-500'>
      <div className='container relative mx-auto'>
        <div className='flex items-center'>
          <div className='p-3 flex-none'>
            <button onClick={handleBack}>
              <ArrowLeftIcon className='h-7 w-7 text-white' />
            </button>
          </div>
          <div className='p-5 flex-1'>
            <h2 className='text-2xl text-white font-black'>{title}</h2>
            <p className=' text-white font-black'>{subtitle}</p>
          </div>
          <div className='p-5 self-center'>
            {renderedActions}
          </div>
        </div>
      </div>
    </div>
  )
}

export default ContentHeader