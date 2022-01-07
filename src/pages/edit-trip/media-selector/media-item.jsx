import { CheckCircleIcon, CheckIcon } from "@heroicons/react/solid"

export default function MediaItem({ media, selected, onChange }) {
  const handleClick = () => onChange(!selected)
  return (
    <div className='p-2 w-1/3 sm:w-1/4 md:w-1/5 lg:w-1/6 relative'>
      <button className='block w-full h-full relative' onClick={handleClick}>
        <div className='aspect-h-1 aspect-w-1 rounded-md overflow-hidden'>
          <img src={media.meta.md.url} className='w-full h-full object-cover' alt='img' />
        </div>
        {selected
          ? <div className='absolute inset-0 bg-black bg-opacity-25 pointer-events-none flex items-center justify-center rounded-md overflow-hidden'><div className='w-5 h-5 bg-white rounded-full'><CheckCircleIcon /></div></div>
          : null
        }
      </button>
    </div>
  )
}