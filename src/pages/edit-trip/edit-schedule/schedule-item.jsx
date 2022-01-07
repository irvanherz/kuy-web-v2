import Button from 'components/button'
import Switch from 'components/switch'
import moment from 'moment-timezone'

export default function ScheduleItem({ schedule }){
  const renderSched = () => {
    const sched = moment()
    return (
      <>
        <div className='font-bold text-sm'>{sched.format('dddd, D MMMM YYYY')}</div>
        <div className='font-bold text-sm'>{sched.format('HH:mm')}</div>
      </>
    )
  }

  return (
    <div className="p-2 w-full md:w-1/2 lg:w-1/4">
      <div className="flex items-center border rounded-md p-3 bg-gray-50">
        <div className='flex-1'>
          <div>{renderSched()}</div>
          <div>Aktif</div>
          <div>
            <Switch></Switch>
          </div>
        </div>
        <div className='w-auto'>
          <Button variant='link'>Hapus</Button>
        </div>
      </div>
    </div>
  )
}