export default function SearchResult({ data = [], onSelect }) {
  const handleSelect = data => onSelect?.(data)
  return data.length
    ? (
      <div>
        {data.map(search => (
          <button className='block text-left hover:bg-gray-200 p-2' onClick={() => handleSelect(search)}>
            <div className='font-bold text-sm'>{search.poi.name}</div>
            <div className='text-gray-700 text-xs'>{search.address.freeformAddress}</div>
          </button>
        ))}
      </div>
    )
    : (
      <div className='flex-1 h-full flex flex-col justify-center' style={{ maxHeight: 500}}>
        <img src={`${process.env.PUBLIC_URL}/assets/images/dreamer.svg`} className='m-auto w-full' alt='Search' style={{ maxWidth: 300}} />
      </div>
    )
}