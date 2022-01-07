import PriceItem from "./price-item";
import PriceItemAdd from "./price-item-add";

export default function EditPrice( { trip }) {
  const prices = trip?.trip_price || []
  return (
    <div className='p-4 space-y-4'>
      <div>
        <div className='p-2'>
          <div className='text-lg font-bold'>Jenis Harga</div>
          <p className='text-gray-600'>
            <b>Fixed Rate:</b> Harga ditentukan Anda sebagai penjual jasa. Pembeli tidak bisa melakukan penawaran.<br />
            <b>Negotiable:</b> Anda dapat menentukan harga atapun tidak sama sekali. Jika opsi ini dipilih, pembeli hanya bisa melakukan pembelian melalui chat. Transaksi pembelian dimulai setelah kedua belah pihak sepakat.
          </p>
        </div>
        Opts
      </div>
      <div>
        <div className='p-2'>
          <div className='text-lg font-bold'>Tentukan Harga Jual</div>
          <p className='text-gray-600'>
            Klik tombol <b>Tambah</b> untuk menambahkan.<br />
          Perjalanan dapat dijual gratis ataupun berbayar.<br />
          Jika Anda membuat lebih dari satu variasi harga, pembeli dapat memilih paket harga yang diinginkannya. Anda harus memasukkan detail yang jelas pada masing-masing paket harga, sehingga pembeli dapat memilih paket perjalanan yang tepat.
        </p>
        </div>
        <div className='flex flex-wrap'>
          {prices.map(price => (
            <PriceItem price={price}/>
          ))}
          <PriceItemAdd trip={trip} />
        </div>
      </div>
    </div>
  )
}