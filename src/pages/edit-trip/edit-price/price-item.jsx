import { XCircleIcon } from "@heroicons/react/solid";
import Button from "components/button";
import Modal from "components/modal";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteTripPrice } from "redux/actions/trip";

export default function PriceItem({ price }){
  const dispatch = useDispatch()
  const mutationStatus = useSelector(state => state.trip.mutationById[price.trip_id]?.status || 'idle')
  const [showConfirm, setShowConfirm] = useState(false)
  
  const handleConfirmDelete = () => {
    setShowConfirm(true)
  }

  const handleCancelDelete = () => setShowConfirm(false)

  const handleContinueDelete = async () => {
    console.log(price);
    await dispatch(deleteTripPrice(price.trip_id, price.id))
    setShowConfirm(false)
  }

  return (
    <div className='w-full md:w-1/2 lg:w-1/3 p-2'>
      <div className="relative">
        <div className='border rounded-t-md shadow-md p-2'>
          <div className='text-green-700 text-xl font-bold'>Rp200.000</div>
          <div className='font-bold text'>{price.title}</div>
          <div className='text-sm'>{price.description}</div>
        </div>
        <div className='rounded-full absolute -top-2 -right-2 bg-white w-5 h-5 shadow-sm'>
          <button onClick={handleConfirmDelete} className=''><XCircleIcon className='w-5 h-5 text-red-400' /></button>
        </div>
        <Modal
          visible={showConfirm}
          title="Konfirmasi"
          description="Apakah Anda yakin ingin menghapus varian harga ini?"
          actions={[
            <Button disabled={mutationStatus === 'loading'} variant='secondary' onClick={handleCancelDelete}>Cancel</Button>,
            <Button loading={mutationStatus === 'loading'} variant='danger' onClick={handleContinueDelete}>Hapus</Button>,
          ]}
        >

        </Modal>
      </div>
    </div>
  )
}