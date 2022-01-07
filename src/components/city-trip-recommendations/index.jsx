import Carousel from 'react-slick'
import CityTripRecommendation from './city-trip-recommendation'

const carouselSettings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 3,
  slidesToScroll: 1
}

export default function CityTripRecommendations() {
  return (
    <div className='p-5'>
      <Carousel {...carouselSettings}>
        {[2, 2, 2, 2, 2, 2].map(x => (
          <CityTripRecommendation />
        ))}
      </Carousel>
    </div>
  )
}