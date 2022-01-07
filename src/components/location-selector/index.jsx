import { XCircleIcon } from "@heroicons/react/solid";
import { useRef, useState } from "react";
import Button from "../button";
import Modal from "../modal";
import Maps from "./maps";
import SearchPlace from "./search-place";

export default function LocationSelector({ value, onChange }) {
  const [showPicker, setShowPicker] = useState(false)
  const [selectedPoi, setSelectedPoi] = useState()
  const [map, setMap] = useState()
  const mapsRef = useRef()

  const computedValue = 0

  const handleSelect = () => setShowPicker(true)
  const handleEdit = () => setShowPicker(true)
  const handleCancelSelectPlace = () => setShowPicker(false)

  const handleSelected = data => {
    setSelectedPoi(data)
    map.setCenter(data.position)
  }

  return (
    <div>
      {computedValue
        ? (
          <div className='relative border rounded-md flex p-3 w-min' style={{ minWidth: 300 }}>
            <div className='space-y-3'>
              <div>
                <div className='font-bold'>Depan Rumah Sakit</div>
                <div className='text-sm line-clamp-3'>Jalan Abdul saleh Agung Gang 4 no. 302, Kel Lowokwaru, Kota Malang, Jawa Timur</div>
              </div>
              <div>
                <Button className='w-full' onClick={handleSelect}>Ganti Lokasi</Button>
              </div>
            </div>
            <button title="Hapus Lokasi" className='p-2 absolute -top-4 -right-4'><XCircleIcon className='w-6 h-6 text-red-500' /></button>
          </div>
        )
        : (
          <div className='border rounded-md flex p-3 w-min' style={{ minWidth: 300 }}>
            <div className='space-y-3'>
              <div>
                <div className='font-bold'>Lokasi belum terpilih</div>
                <div className='text-sm text-gray-700'>Pilih lokasi dengan peta, untuk memudahkan pelanggan Anda menemukan lokasi tujuan.</div>
              </div>
              <div>
                <Button className='w-full' onClick={handleSelect}>Pilih Lokasi</Button>
              </div>
            </div>
          </div>
        )
      }
      <Modal
        maxWidth={900}
        visible={showPicker}
        onVisibleChange={setShowPicker}
        actions={[
          <Button variant='secondary' onClick={handleCancelSelectPlace}>Batal</Button>,
          <Button>Pilih Lokasi</Button>,
        ]}
      >
        <div className='flex flex-col md:flex-row md:space-x-3'>
          <div className='w-full md:w-6/12 lg:w-3/12' style={{ minHeight: 500 }}>
            <SearchPlace map={map} onSelect={handleSelected} />
          </div>
          <div className="w-full md:w-6/12 lg:w-9/12">
            <Maps ref={mapsRef} onLoad={map => setMap(map)} selectedPoi={selectedPoi} />
          </div>
        </div>
      </Modal>
    </div>
  )
}