import { Link } from "react-router-dom";

export default function OrganizerItem({ organizer }){
  return (
    <div className='m-5 shadow-sm border rounded bg-gray-100 flex flex-col sm:flex-row'>
      <div className='p-5 flex-1'>
        <h3 className='text-xl font-bold'>{organizer.name}</h3>
        <div>{organizer.description}</div>
        <div className='pt-1'>
          <div className='font-semibold'>Alamat:</div>
          <div className='text-sm text-gray-600'>{organizer.address}</div>
        </div>
        <div className='pt-1'>
          <div className='font-semibold'>User pengelola:</div>
          <div className='text-sm text-gray-600'>Anda (Pemilik)</div>
          <div className='text-sm text-gray-600'>Santoso</div>
        </div>
      </div>
      <div className='flex-none border-t sm:border-t-0 sm:border-l bg-gray-200 hover:bg-gray-300'>
        <Link to={`/organizers/${organizer.id}/trips`} className='flex flex-col justify-center p-5 h-full text-center text-blue-600 font-bold'>
          Kelola Perjalanan
        </Link>
      </div>
    </div>
  )
}