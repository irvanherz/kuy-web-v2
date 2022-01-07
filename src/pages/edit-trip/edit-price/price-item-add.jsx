import { PlusCircleIcon } from "@heroicons/react/solid";
import AddPriceModal from "./add-price-modal";

export default function PriceItemAdd({ trip }){
  return (
    <div className='w-full md:w-1/2 lg:w-1/3 p-2'>
      <AddPriceModal trip={trip}>
        <button className='block w-full border rounded-t-md shadow-md p-2 text-center bg-green-50'>
          <div className='text-green-700 text-xl font-bold'><PlusCircleIcon className='w-5 h-5 inline' /></div>
          <div className='font-bold text'>Tambah</div>
          <div className='text-sm'>Tambah opsi harga untuk pembeli</div>
        </button>
      </AddPriceModal>
    </div>
  )
}