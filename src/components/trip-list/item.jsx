import { Link } from "react-router-dom";
import Button from "../button";
import Modal from "../modal";
import ArchiveButton from "./archive-button";
import ShareButton from "./share-button";

export default function Item({ trip }){
  return (
    <div className='w-full lg:w-1/2 p-4'>
      <div className='shadow-sm border rounded bg-gray-100 flex flex-col sm:flex-row overflow-hidden'>
        <div className="relative md:flex-shrink-0">
          <img className="h-48 w-full object-cover md:h-full md:w-48" src="https://images.unsplash.com/photo-1515711660811-48832a4c6f69?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=448&q=80" alt="Man looking at item at a store" />
        </div>
        <div className='flex-1 divide-y'>
          <div className="p-4">
            <h3 className='text-xl font-bold'>{trip.title}</h3>
            <div className='line-clamp-2'>{trip.description}</div>
            <div className='pt-1'>
              <div className='text-sm text-gray-600'>Jl Maju Mundur no. 45</div>
            </div>
          </div>
          <div className="p-4 space-x-4">
            <Link to={`/organizers/${trip.organizer_id}/trips/${trip.id}/edit`}>
              <Button variant='link'>Edit</Button>
            </Link>
            <ShareButton>
              <Button variant='link'>Share</Button>
            </ShareButton>
            <Link to={`/trips/1`}>
              <Button variant='link'>View</Button>
            </Link>
            <ArchiveButton>
              <Button variant='danger-link'>Arsipkan</Button>
            </ArchiveButton>
          </div>
        </div>
      </div>
    </div>
  )
}