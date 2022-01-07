import { MapIcon, ClockIcon } from '@heroicons/react/solid'
import Button from 'components/button'
import { useHref, useLocation, useNavigate, useParams } from 'react-router-dom'
import MediaCarousel from './media-carousel'
import Markdown from 'markdown-to-jsx';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { fetchTripDetails } from 'redux/actions/trip';
import TripBookingModal from './trip-booking-modal';
const TripDetails = () => {
  const dispatch = useDispatch()
  const params = useParams()
  const tripId = params.tripId
  const tripData = useSelector(state => state.trip.dataById[tripId])
  const tripStatus = useSelector(state => state.trip.queryById[tripId]?.status || 'idle')
  const navigate = useNavigate()

  const trip = tripData

  useEffect(() => {
    if (tripStatus === 'idle') dispatch(fetchTripDetails(tripId))
  }, [dispatch, tripId, tripStatus])

  const handleAskOrganizer = () => {
    navigate('/chats')
  }

  const handleBooking = () => {
    
  }

  return (
    <div className='container mx-auto flex flex-wrap p-3 space-y-4 md:space-y-0'>
      <div className='w-full md:w-1/2 md:pr-4'>
        <div className="md:sticky space-y-4 md:top-[64px]">
          <div>
            <MediaCarousel />
          </div>
          <div className='flex divide-x text-center'>
            <div className='flex-1 p-2'>
              <div className='text-xs text-gray-500'>Harga</div>
              <div className='font-bold text-green-600'>Rp200.000</div>
            </div>
            <div className='flex-1 p-2'>
              <div className='text-xs text-gray-500'>Lama Perjalanan</div>
              <div className='font-bold text-green-600'>4 HARI</div>
            </div>
            <div className='flex-1 p-2'>
              <div className='text-xs text-gray-500'>Destinasi</div>
              <div className='font-bold text-green-600'>10 Tempat Melalui 2 Kota</div>
            </div>
          </div>
          <div className='flex w-full'>
            <div className='p-2 flex-1'>
              <TripBookingModal>
                <Button onClick={handleBooking} className='w-full'>BOOKING SEKARANG</Button>
              </TripBookingModal>
            </div>
            <div className='p-2 flex-1'>
              <Button onClick={handleAskOrganizer} className='w-full' variant='secondary'>Tanya Penjual</Button>
            </div>
          </div>
        </div>
      </div>
      <div className='w-full md:w-1/2 space-y-4'>
        <div className='p-5 border rounded-md shadow-sm bg-gray-50'>
          <h3 className='font-bold text-xl pb-3'>{trip.title}</h3>
          <div>{<Markdown>{trip.description}</Markdown>}</div>
          <div>Jadwal Selanjutnya: 10 Januari 2021 (3 hari lagi)</div>
        </div>
        <div className='p-5 border rounded-md shadow-sm bg-gray-50'>
          <h3 className='font-bold text-xl pb-3'>Schedule</h3>
          <div>
            <div>Jadwal Selanjutnya: 10 Januari 2021 (3 hari lagi)</div>
            <div>Jadwal Lain:</div>
          </div>
        </div>
        <div className='p-5 border rounded-md shadow-sm bg-gray-50'>
          <h3 className='font-bold text-xl pb-3'>Itinerary</h3>
          <div>
            By Request
          </div>
        </div>
        <div className='p-5 border rounded-md shadow-sm bg-gray-50'>
          <h3 className='font-bold text-xl pb-3'>Includes</h3>
          <div>
            By Request
          </div>
        </div>
      </div>
    </div>
  )
}

export default TripDetails