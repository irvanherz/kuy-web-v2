import { useRef } from "react"
import MediaSelector from "../media-selector"

export default function MediaItemAdd({ onSelected }){

  return (
    <div className='p-2 w-1/3 sm:w-1/4 md:w-1/5 lg:w-1/6'>
      <div className='aspect-h-1 aspect-w-1 rounded-md overflow-hidden'>
        <MediaSelector onSelected={onSelected}>
          <button className='bg-gray-200 w-full h-full'>
            <div className='absolute top-1/2 left-0 w-full p-2 transform -translate-y-1/2 text-center'>Add</div>
          </button>
        </MediaSelector>
      </div>
    </div>
  )
}