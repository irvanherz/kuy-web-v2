import { useDispatch } from "react-redux";
import { linkTripMedias } from "redux/actions/trip";
import MediaItem from "./media-item";
import MediaItemAdd from "./media-item-add";

export default function EditMedia({ trip }){
  const dispatch = useDispatch()
  const handleSelected = ids => {
    console.log(ids);
    dispatch(linkTripMedias(trip.id, ids))
  }

  return (
    <div className='p-4'>
      <div className='p-2'>
        <div className='text-lg font-bold'>Pilih gambar preview</div>
        <p className='text-gray-600'>Siapkan gambar resolusi 16:9, 3:4 atau 1:1. Ukuran berkas yang bisa diupload maksimal 1MB.<br /> Anda dapat mengunggah lebih dari satu gambar, maksimal 10 gambar. Gambar yang diunggah paling pertama akan dijadikan untuk preview utama.</p>
      </div>
      <div className='flex flex-wrap'>
        {trip.trip_media.map(media => (<MediaItem media={media} />))}
        <MediaItemAdd onSelected={handleSelected} />
      </div>
    </div>
  )
}