import { XCircleIcon } from "@heroicons/react/solid";
import { useDispatch } from "react-redux";
import { unlinkTripMedias } from "redux/actions/trip";

export default function MediaItem({ media }){
  const dispatch = useDispatch()
  const handleUnlink = () => {
    dispatch(unlinkTripMedias(media.trip_id, media.id))
  }
  return (
    <div className='p-2 w-1/3 sm:w-1/4 md:w-1/5 lg:w-1/6'>
      <div className='relative'>
        <div className='aspect-h-1 aspect-w-1 rounded-md overflow-hidden'>
          <img src={media?.media?.meta?.sm?.url} className='w-full h-full object-cover' alt='img'/>
        </div>
        <div className='rounded-full absolute -top-2 -right-2 bg-white w-5 h-5'>
          <button onClick={handleUnlink} className=''><XCircleIcon className='w-5 h-5 text-red-400' /></button>
        </div>
      </div>
    </div>
  )
}