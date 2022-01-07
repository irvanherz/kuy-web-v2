import Button from "components/button"
import AddPlan from "./add-plan"
import AddPlanModal from "./add-plan-modal"
import PlanTimeline from "./plan-timeline"

export default function EditPlan({ trip }) {
  const grouped = [
    [1, 1, 1],
    [1, 1, 1],
  ]
  return (
    <div className='p-4'>
      <div>
        <PlanTimeline trip={trip} />
      </div>
      <div>
        <AddPlanModal trip={trip} priority={trip.plans.length}>
          <Button type='button'>Tambah Perjalanan</Button>
        </AddPlanModal>
      </div>
      <div>
        <table>
          {grouped.map(group => (
            <div>
              <tr><th colSpan={2}>Hari</th></tr>
              <div>
                {group.map(itinerary => (
                  <tr>
                    <td>Jam</td>
                    <td>Akt</td>
                  </tr>
                ))}
              </div>
            </div>
          ))}
        </table>
      </div>
    </div>
  )
}