import Item from "./item";

function TripList({ trips=[]}){
  return (
    <div className='flex flex-wrap -m-4'>
      {trips.map(trip => (
        <Item trip={trip} />
      ))}
    </div>
  )
}

TripList.Item = Item

export default TripList