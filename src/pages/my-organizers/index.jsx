import { ChevronRightIcon, PlusIcon } from "@heroicons/react/solid"
import { useEffect } from "react"
import { useSelector } from "react-redux"
import { useDispatch } from "react-redux"
import { Link } from "react-router-dom"
import ContentHeader from "../../components/content-header"
import { hashCode } from "../../helper/hash"
import { fetchOrganizerList } from "../../redux/actions/organizer"
import OrganizerItem from "./organizer-item"

const MyOrganizers = () => {
  const dispatch = useDispatch()
  const apiFilters = { user_id: 1 }
  const apiFiltersHash = hashCode(apiFilters)

  const listStatus = useSelector(state => state.organizer.queryByHash[apiFiltersHash]?.status || 'idle')
  const listData = useSelector(state => {
    const dataIds = state.organizer.queryByHash[apiFiltersHash]?.dataIds || []
    return dataIds.map(dataId => state.organizer.dataById[dataId])
  })

  useEffect(() => { 
    dispatch(fetchOrganizerList(apiFilters, apiFiltersHash))
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [apiFiltersHash])

  return (
    <div>
      <ContentHeader
        title="Akun Pengelola Perjalanan Saya"
        subtitle="Berikut ini adalah akun pengelola perjalanan yang Anda buat dan/atau kelola."
        actions={
          <Link to={`/organizers/create`}>
            <button className="bg-white text-blue-700 hover:bg-blue-400 hover:text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit"><PlusIcon className='w-5 h-5 inline' /> Buat Baru</button>
          </Link>
        }
      />
      <div className='container mx-auto m-5'>
        {listData.map(org => (
          <OrganizerItem organizer={org} />
        ))}
      </div>
    </div>
  )
}

export default MyOrganizers