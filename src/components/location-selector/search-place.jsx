import { useCallback, useEffect, useState } from 'react'
import { Listbox, Menu } from '@headlessui/react'
import Input from '../input'
import { useDispatch, useSelector } from 'react-redux'
import { debounce } from 'lodash'
import { hashCode } from '../../helper/hash'
import { tomtomSearchPoi } from '../../redux/actions/tomtom'
import SearchResult from './search-result'

export default function SearchPlace({ map, onSelect }) {
  const dispatch = useDispatch()
  const [showResult, setShowResult] = useState(false)
  const [query, setQuery] = useState('')
  const [apiParams, setApiParams] = useState({})
  const searchStatus = useSelector(state => state.tomtom.poi.queryByHash[apiParams.hash]?.status || 'idle')
  const searchData = useSelector(state => {
    const dataIds = state.tomtom.poi.queryByHash[apiParams.hash]?.dataIds || []
    return dataIds.map(dataId => state.tomtom.poi.dataById[dataId])
  })


  // eslint-disable-next-line react-hooks/exhaustive-deps
  // const updateQuery = useCallback(debounce(, 2000), [])

  const handleChange = e => setQuery(e.target.value)
  const handleSearch = e => {
    if (query) {
      const center = map ? map.getCenter() || { lat: -6.200000, lng: 106.816666 } : { lat: -6.200000, lng: 106.816666 }
      const filters = { lat: center.lat, lon: center.lng, language: 'id-ID', radius: 100000 }
      const hash = hashCode({ query, filters })
      setApiParams({
        query,
        filters,
        hash,
      })
      dispatch(tomtomSearchPoi(query, filters, hash))
    }
  }
  const handleFocus = () => setShowResult(true)
  const handleBlur = () => setShowResult(false)

  return (
    <div className='flex flex-col h-full min-h-inherit'>
      <Input value={query} onChange={handleChange} onFocus={handleFocus} onBlur={handleBlur} onPressEnter={handleSearch} />
      <div className='overflow-y-auto min-h-0 divide-y min-h-inherit flex flex-col' style={{ flex: '1 1 0'}}>
        <SearchResult data={searchData} onSelect={onSelect} />
      </div>
    </div>
  )
}