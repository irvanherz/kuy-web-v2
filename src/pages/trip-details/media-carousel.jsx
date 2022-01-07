import Carousel from 'react-slick'
import './media-carousel.css'

const carouselSettings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
  className: 'media-carousel',
}

export default function MediaCarousel({ trip }){
  
  return (
    <Carousel {...carouselSettings}>
      {[2, 2, 2, 2, 2, 2].map(x => (
        <div className='rounded border bg-gray-100 overflow-hidden'>
          <div className='relative' style={{ paddingTop: '50%' }}>
            <img className='absolute object-cover top-0 left-0 w-full h-full bg-gray-500' src='https://asset.kompas.com/crops/dyeYv-qSaVNRpBwKszGr6AzqHN0=/0x0:0x0/780x390/data/photo/2021/04/02/6066e4449725a.jpg' alt='Bandung' />
            <div className='absolute flex items-center top-0 left-0 w-full h-full backdrop-filter backdrop-blur-sm'>
              <div className='text-center flex-1 text-white font-bold text-xl'>Bandung</div>
            </div>
          </div>
        </div>
      ))}
    </Carousel>
  )
}