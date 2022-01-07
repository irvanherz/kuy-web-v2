import ScheduleGenerator from "./schedule-generator";
import ScheduleItem from "./schedule-item";

export default function EditSchedule(){
  return(
    <div>
      <ScheduleGenerator />
      <div className='flex flex-wrap'>
        {[1,2,3,4,5].map(sched => (
          <ScheduleItem />
        ))}
      </div>
    </div>
  )
}