import { forwardRef, useCallback, useEffect, useMemo, useRef, useState } from "react";
import tt from '@tomtom-international/web-sdk-maps';
import '@tomtom-international/web-sdk-maps/dist/maps.css'
import Input from "../input";
import { tomtomReverseGeocode } from "../../redux/actions/tomtom";
import { useDispatch, useSelector } from "react-redux";
import { debounce } from 'lodash'

const Maps = forwardRef(({ onLoad, onMoveEnd, selectedPoi }, ref) => {
  const dispatch = useDispatch()
  const mapElement = useRef();
  const [map, setMap] = useState({});
  const [position, setPosition] = useState({ lat: -8.100000, lng: 112.150002 });
  const positionId = `${position.lat},${position.lng || position.lon}`
  const reverseGeocodeData = useSelector(state => state.tomtom.reverseGeocode.dataById[positionId]?.[0] || {})
  const reverseGeocodeStatus = useSelector(state => state.tomtom.reverseGeocode.queryById[positionId]?.status || 'idle')
  if (ref) ref.current = map

  useEffect(() => {
    let map = tt.map({
      key: 'Tyopbi7lH78xuYYUj2VKoOH6byVxFSwz',
      container: mapElement.current,
      center: [position.lng, position.lat],
      zoom: 13,
    });
    setMap(map);
    map.addControl(new tt.GeolocateControl({
      positionOptions: {
        enableHighAccuracy: true
      },
      trackUserLocation: true
    }));
    map.addControl(new tt.NavigationControl({}), 'top-left');
    map.on('load', e => {
      onLoad && onLoad(map)
    })
    map.on('moveend', e => {
      const center = map.getCenter()
      setPosition(center)
      onMoveEnd && onMoveEnd(map)
    })
    return () => map.remove();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const updateReverseGeocodeData = useCallback(debounce((position, positionId) => dispatch(tomtomReverseGeocode(position, positionId)), 2000), [])

  useEffect(() => {
    if (reverseGeocodeStatus === 'idle') {
      updateReverseGeocodeData(position, positionId)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [position, positionId, reverseGeocodeStatus]);

  const placeDetails = useMemo(() => {
    const rgd = reverseGeocodeData
    const poi = selectedPoi
    if(poi) {
      console.log('poi', poi);
      return {
        name: poi.poi.name,
        address: poi.address?.freeformAddress,
        position: `${poi.position.lat},${poi.position.lon}`,
        country: poi.address?.country || '',
        state: poi.address?.countrySubdivison || '',
        city: poi.address?.municipality || '',
      }
    } else if (rgd) {
      return {
        name: '',
        address: rgd.address?.freeformAddress,
        position: rgd.position,
        country: rgd.address?.country || '',
        state: rgd.address?.countrySubdivison || '',
        city: rgd.address?.municipality || '',
      }
    }
    return null
  }, [reverseGeocodeData, selectedPoi])

  return (
    <div className='space-y-3'>
      <div className="w-full relative" style={{ paddingTop: '60%' }}>
        <div ref={mapElement} className="mapDiv absolute inset-0"></div>
        <img src={`${process.env.PUBLIC_URL}/assets/images/location-marker.png`} className='w-10 h-10 filter drop-shadow-md absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-full pointer-events-none' alt='Location' />
      </div>
      {placeDetails && (
        <div className='border rounded-md p-3'>
          <div className="mb-3">
            <div className='font-bold text-lg'>Detail Lokasi</div>
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">Destinasi</label>
            <Input placeholder='Posisi' readOnly value={placeDetails.name} />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">Koordinat</label>
            <Input placeholder='Posisi' readOnly value={placeDetails.position} />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">Alamat</label>
            <Input placeholder='Posisi' readOnly value={placeDetails.address} />
          </div>
        </div>
      )}
    </div>
  )
})

export default Maps