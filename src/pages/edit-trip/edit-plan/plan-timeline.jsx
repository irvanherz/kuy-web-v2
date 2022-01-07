import { useMemo } from "react"
import moment from 'moment-timezone'
import { PlusCircleIcon } from "@heroicons/react/solid"
import AddPlanModal from "./add-plan-modal"

function PlanTimelineItem({ trip, plan, index = 0 }) {
  const position = index % 2
  const renderedDuration = useMemo(() => {
    const dur = moment.duration(plan.duration)
    if (dur.asMinutes() < 60) return `${dur.minutes()} menit`
    else if (dur.asHours() <= 24) {
      const h = dur.hours()
      const m = dur.minutes()
      return `${h} jam ${m ? `${m} menit` : ''}`
    }
    else {
      const d = Math.floor(dur.asDays())
      const h = dur.hours()
      return `${d} hari ${h ? `${h} jam` : ''}`
    }
  }, [plan])

  return (
    <div class={`flex justify-between items-stretch w-full flex-row ${position ? 'md:flex-row text-gray-900' : 'md:flex-row-reverse text-white'}`}>
      <div class="order-1 w-0 md:w-5/12"></div>
      <div class="relative flex items-center order-1">
        <div class="border-2-2 absolute border-opacity-20 border-gray-700 h-full border left-1/2"></div>
        <div className='absolute w-8 h-8 shadow-xl rounded-full bg-gray-800 text-white text-center top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2'>
          <span class="mx-auto font-semibold text-lg">{index + 1}</span>
        </div>
        {index === 0 && (
          <AddPlanModal trip={trip} priority={0}>
            <button className='absolute w-8 h-8 shadow-xl rounded-full bg-white text-black text-center top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex items-center border-2 border-green-400 border-dashed'>
              <span class="mx-auto font-semibold text-lg"><PlusCircleIcon className='w-5 h-5 text-green-400' /></span>
            </button>
          </AddPlanModal>
        )}
        <AddPlanModal trip={trip} priority={index + 1}>
          <button className='absolute w-8 h-8 shadow-xl rounded-full bg-white text-black text-center bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2 flex items-center border-2 border-green-400 border-dashed'>
            <span class="mx-auto font-semibold text-lg"><PlusCircleIcon className='w-5 h-5 text-green-400' /></span>
          </button>
        </AddPlanModal>
      </div>
      <div class={`order-1 ${position ? 'bg-gray-200' : 'bg-red-400'} rounded-lg shadow-xl w-10/12 md:w-5/12 px-4 py-2 mb-4`}>
        <h3 class={`mb-2 font-bold text-xl`}>{plan.title}</h3>
        <p class={`text-sm leading-snug tracking-wide text-opacity-100`}>{plan.description}</p>
        <div className='mt-3 flex'>
          <div className="w-3/12">
            <h3 className='text-sm'>Durasi</h3>
            <p className='font-semibold'>{renderedDuration}</p>
          </div>
          <div className="w-6/12">
            <h3 className='text-sm'>Lokasi</h3>
            <p className='font-semibold'>Jl Kucing 123</p>
          </div>
          <div className="w-3/12">
            <h3 className='text-sm'>Meeting Point</h3>
            <p className='font-semibold'>Lokasi Meeting Point</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function PlanTimeline({ trip }) {
  const { plans } = trip
  return (
    <div class="relative wrap py-4">
      {plans.map((plan, i) => <PlanTimelineItem trip={trip} plan={plan} index={i} />)}
    </div>

  )
}