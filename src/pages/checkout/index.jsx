import ContentHeader from "components/content-header";
import Tab from "components/tab";

export default function Checkout(){
  return (
    <div>
      <ContentHeader 
        title="Checkout"
        subtitle="Silahkan pilih metode pembayaran yang Anda inginkan."
      />
      <div className='container mx-auto p-4 flex flex-wrap space-y-4 md:space-y-0'>
        <div className='w-full md:w-1/2 md:pr-4'>
          <div className='p-4 border flex w-full'>
            <div className='w-/2/12'></div>
            <div className='w-7/12'>
              <div className='text-lg font-bold'>Trip Bali Asik</div>
              <div className=''>27 Desember 2012</div>
              <div className=''>10 pax</div>
            </div>
            <div className='w-3/12'>Rp 20.0000</div>
          </div>
        </div>
        <div className='w-full md:w-1/2'>
          <div className='p-4 border'>
            <Tab>
              <Tab.Panel tab='Kartu Kredit'>
                Hehehhe
            </Tab.Panel>
              <Tab.Panel tab='ATM/Bank Transfer'>
                Hehehhe
            </Tab.Panel>
            </Tab>
          </div>
        </div>
      </div>
    </div>
  )
}