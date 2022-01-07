import { ArrowLeftIcon, ChevronRightIcon, PlusIcon } from "@heroicons/react/solid"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Link, useParams } from "react-router-dom"
import ContentHeader from "../../components/content-header"
import TripList from "../../components/trip-list"
import { hashCode } from "../../helper/hash"
import { fetchTripList } from "../../redux/actions/trip"

const OrganizerTrips = () => {
  const dispatch = useDispatch()
  const params = useParams()
  const { organizerId} = params
  const apiFilters = { organizer_id: organizerId }
  const apiFiltersHash = hashCode(apiFilters)
  const tripListData = useSelector(state => {
    const dataIds = state.trip.queryByHash[apiFiltersHash]?.dataIds || []
    return dataIds.map(dataId => state.trip.dataById[dataId])
  })
  const tripListStatus = useSelector(state => state.trip.queryByHash[apiFiltersHash]?.status || 'idle')

  useEffect(() => {
    dispatch(fetchTripList(apiFilters, apiFiltersHash))
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [apiFiltersHash])

  return (
    <div>
      <ContentHeader 
        title="Kelola Perjalanan"
        subtitle="Berikut ini adalah daftar perjalanan yang dimiliki oleh akun pengelola perjalanan terkait."
        actions={
          <Link to={`/organizers/${organizerId}/trips/create`}>
            <button className="bg-white text-blue-700 hover:bg-blue-400 hover:text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit"><PlusIcon className='w-5 h-5 inline' /> Buat Perjalanan Baru</button>
          </Link>
        }
      />
      <div className='container mx-auto m-5'>
        <TripList trips={tripListData} />
      </div>
    </div>
  )
}

export default OrganizerTrips