const OrganizerCard = () => {
  return (
    <div className='w-full p-2'>
      <div className="flex flex-col md:flex-row rounded overflow-hidden shadow-lg">
        <div className="w-full md:w-1/4">
          <img className="w-full h-full object-cover" src="https://tailwindcss.com/img/card-top.jpg" alt="Sunset in the mountains" />
        </div>
        <div className="w-full text-left">
          <div className="px-6 py-4">
            <div className="font-bold text-xl mb-2">The Coldest Sunset</div>
            <p className="text-grey-darker text-base">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatibus quia, nulla! Maiores et perferendis eaque, exercitationem praesentium nihil.
            </p>
          </div>
          <div className="px-6 py-4">
            <span className="inline-block bg-grey-lighter rounded-full px-3 py-1 text-sm font-semibold text-grey-darker mr-2">#photography</span>
            <span className="inline-block bg-grey-lighter rounded-full px-3 py-1 text-sm font-semibold text-grey-darker mr-2">#travel</span>
            <span className="inline-block bg-grey-lighter rounded-full px-3 py-1 text-sm font-semibold text-grey-darker">#winter</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default OrganizerCard