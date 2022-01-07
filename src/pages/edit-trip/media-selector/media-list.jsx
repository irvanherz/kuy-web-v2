import { hashCode } from "helper/hash";
import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchMediaList } from "redux/actions/media";
import MediaItem from "./media-item";
import MediaItemAdd from "./media-item-add";

export default function MediaList({ selected, onSelectedChange }) {
  const dispatch = useDispatch()
  const currentUser = useSelector(state => state.auth.profile.data)
  const apiFilters = { user_id: currentUser.id }
  const apiFiltersHash = hashCode(apiFilters)
  const mediaListStatus = useSelector(state => state.media.queryByHash[apiFiltersHash]?.status || 'idle')
  const mediaListData = useSelector(state => {
    const dataIds = state.media.queryByHash[apiFiltersHash]?.dataIds || []
    return dataIds.map(dataId => state.media.dataById[dataId])
  })

  const [internalSelected, setInternalSelected] = useState()
  const computedSelected = useMemo(() => {
    const v = (selected === undefined ? internalSelected : selected) || []
    return v.reduce((a, c) => ({...a, [c]: true}), {})

  }, [selected, internalSelected])

  const reloadMedia = async () => {
    return await dispatch(fetchMediaList(apiFilters, apiFiltersHash))
  }

  useEffect(() => {
    reloadMedia()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [apiFiltersHash])

  const triggerChangeSelected = newSelected => {
    if (selected === undefined) setInternalSelected(newSelected)
    onSelectedChange && onSelectedChange(newSelected)
  }

  const handleChangeSelected = (id, sel) => {
    const newComputedSelected = { ...computedSelected, [id]: sel }
    const v = Object.keys(newComputedSelected).reduce((a, k) => {
      if (newComputedSelected[k]) a.push(k)
      return a
    }, [])
    triggerChangeSelected(v)
  }

  const handleAfterUploaded = async data => {
    await reloadMedia()
    handleChangeSelected(data.id, true)
  }

  return (
    <div className='flex flex-wrap p-2'>
      <MediaItemAdd afterUploaded={handleAfterUploaded}/>
      {mediaListData.map(media => (
        <MediaItem
          media={media}
          selected={computedSelected[media.id] || false}
          onChange={sel => handleChangeSelected(media.id, sel)}
        />))}
    </div>
  )
}