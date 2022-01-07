import { CalendarIcon, ClockIcon, MapIcon } from "@heroicons/react/solid";
import { Link } from "react-router-dom";

export default function TripCard() {
  return (
    <div className='xs:w-full sm:w-1/2 md:w-1/3 lg:w-1/4 p-2'>
      <div className="rounded overflow-hidden shadow-md border">
        <Link to={`/trips/1`} className='block relative aspect-w-16 aspect-h-9'>
          <img className="absolute top-0 left-0 w-full h-full object-cover" src="https://tailwindcss.com/img/card-top.jpg" alt="Sunset in the mountains" />
        </Link>
        <Link to={`/trips/1`} className="block p-4">
          <div className="font-bold text-xl">The Coldest Sunset</div>
          <div className="font-bold text-lg mb-2 text-green-600">Rp50.000</div>
          <p className="text-grey-darker text-base line-clamp-2">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatibus quia, nulla! Maiores et perferendis eaque, exercitationem praesentium nihil.
          </p>
        </Link>
        <Link to={`/trips/1`} className='block text-sm p-4 border-t'>
          <div className='flex items-center text-gray-700'><MapIcon className='w-5 h-5 mr-2' /> <span><b>4 destinasi</b> melalui <b>2 kota</b></span></div>
          <div className='flex items-center text-gray-700'><ClockIcon className='w-5 h-5 mr-2' /> <span><b>2 hari</b> perjalanan</span></div>
          <div className='flex items-center text-gray-700'><CalendarIcon className='w-5 h-5 mr-2' /> <span>Jadwal <b>sesuai kesepakatan</b></span></div>
        </Link>
        <Link className="flex items-center bg-gray-100 border-t p-3" to={`/trips/1`}>
          <img className='w-10 h-10 mr-3' src='https://i.pravatar.cc/300' alt='John Doe'/>
          <div className=''>
            <div className='font-bold'>John Doe</div>
            <div>Lorem ipsum</div>
          </div>
        </Link>
      </div>
    </div>
  )
}
