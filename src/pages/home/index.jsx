import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import CityTripRecommendations from "../../components/city-trip-recommendations"
import TripCard from "./trip-card"
import { hashCode } from "../../helper/hash"
import { fetchTripList } from "../../redux/actions/trip"

const HomePage = () => {
  const dispatch = useDispatch()
  const apiFilters = {  }
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
      <div className='bg-blue-200 p-3'>
        <div className='container mx-auto'>
          <div className='p-3 border shadow-lg rounded bg-green-600 text-white'>Nikmati diskon cashback 10% untuk pemesanan perjalanan sebelum 31 Desember 2021.</div>
        </div>
      </div>
      <div className='p-5 bg-gray-200'>
        <CityTripRecommendations />
      </div>
      <div className='container mx-auto'>
        <div className='flex flex-wrap'>
          {tripListData.map(trip => (
            <TripCard trip={trip} />
          ))}
        </div>
      </div>
    </div>
  )
}

export default HomePage