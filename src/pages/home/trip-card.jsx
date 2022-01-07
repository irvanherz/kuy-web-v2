import { CalendarIcon, ClockIcon, LocationMarkerIcon, MapIcon } from "@heroicons/react/solid";
import { DEFAULT_EMPTY_IMAGE, DEFAULT_EMPTY_PHOTO, handleImageError, handlePhotoError } from "config/image";
import { useMemo } from "react";
import { Link } from "react-router-dom";
import moment from 'moment-timezone'

export default function TripCard({ trip }) {
  const renderedDuration = useMemo(() => {
    const dur = moment.duration(trip.plan.total_duration)
    if (dur.asMinutes() < 60) return `${dur.minutes()} menit`
    else if (dur.asHours() <= 24) {
      const h = dur.hours()
      const m = dur.minutes()
      return `${h} jam ${m ? `${m} menit` : ''}`
    }
    else {
      const d = Math.floor(dur.asDays())
      const h = dur.hours()
      return `${d} hari ${h ? `${h} jam` : ''}`
    }
  }, [trip])

  const renderedPrice = useMemo(() => {
    const formatter = new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    });
    if (!trip.price.num_prices) {
      return "Chat Harga"
    } else if (trip.price.num_prices === 1) {
      return trip.from ? formatter.format(trip.from) : 'Gratis'
    } else {
      const from = trip.price.from ? formatter.format(trip.price.from) : 'Gratis'
      const to = trip.price.to ? formatter.format(trip.price.to) : 'Gratis'
      return `${from} - ${to}`
    }
  }, [trip])

  const selectedMedia = trip.trip_media[0]
  return (
    <div className='xs:w-full sm:w-1/2 md:w-1/3 lg:w-1/4 p-2'>
      <div className="rounded overflow-hidden shadow-md border">
        <Link to={`/trips/${trip.id}`} className='block relative aspect-w-16 aspect-h-9'>
          <img className="absolute top-0 left-0 w-full h-full object-cover" src={selectedMedia?.media?.meta?.md?.url || DEFAULT_EMPTY_IMAGE} onError={handleImageError} alt="Sunset in the mountains" />
        </Link>
        <Link to={`/trips/${trip.id}`} className="block p-4">
          <div className="font-bold">{trip.title}</div>
          <div className="font-black text-green-600">{renderedPrice}</div>
          {/* <p className="text-grey-darker text-base line-clamp-2">{markdownToTxt(trip.description)}<br /><br /></p> */}
        </Link>
        <Link to={`/trips/${trip.id}`} className='block text-sm p-4 border-t'>
          <div className='flex items-center text-sm'><LocationMarkerIcon className='w-5 h-5 mr-2 text-gray-600' /> <span className='text-gray-500'><b>4 destinasi</b> melalui <b>2 kota</b></span></div>
          <div className='flex items-center text-sm'><ClockIcon className='w-5 h-5 mr-2 text-gray-600' /> <span className='text-gray-500'>{renderedDuration}</span></div>
          <div className='flex items-center text-sm'><CalendarIcon className='w-5 h-5 mr-2 text-gray-600' /> <span className='text-gray-500'>Jadwal <b>sesuai kesepakatan</b></span></div>
        </Link>
        <Link className="flex items-center bg-gray-100 border-t p-3" to={`/organizers/${trip.organizer_id}`}>
          <img className='w-10 h-10 mr-3 rounded-md shadow-sm' src={DEFAULT_EMPTY_PHOTO} onError={handlePhotoError} alt='John Doe' />
          <div className=''>
            <div className='text-sm font-bold text-gray-700'>{trip.organizer?.name || <i>Organizer</i>}</div>
            <div className='text-xs text-gray-500'>Agen Pengelola Perjalanan</div>
          </div>
        </Link>
      </div>
    </div>
  )
}
