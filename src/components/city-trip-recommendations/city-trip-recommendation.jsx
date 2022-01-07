import { Link } from "react-router-dom";

export default function CityTripRecommendation() {
  return (
    <div className='p-3'>
      <div className='rounded border bg-gray-100 overflow-hidden'>
        <div className='relative' style={{ paddingTop: '30%' }}>
          <img className='absolute object-cover top-0 left-0 w-full h-full bg-gray-500' src='https://asset.kompas.com/crops/dyeYv-qSaVNRpBwKszGr6AzqHN0=/0x0:0x0/780x390/data/photo/2021/04/02/6066e4449725a.jpg' alt='Bandung' />
          <div className='absolute flex items-center top-0 left-0 w-full h-full backdrop-filter backdrop-blur-sm'>
            <div className='text-center flex-1 text-white font-bold text-xl'>Bandung</div>
          </div>
        </div>
        <div className='divide-y'>
          <Link className='block p-3 overflow-hidden overflow-ellipsis' to='/trips/1'>KucingaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaS</Link>
          <Link className='block p-3 overflow-hidden overflow-ellipsis' to='/trips/1'>KucingaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaS</Link>
          <Link className='block p-3 overflow-hidden overflow-ellipsis' to='/trips/1'>KucingaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaS</Link>
        </div>
      </div>
    </div>
  )
}