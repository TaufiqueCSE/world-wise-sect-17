import { useNavigate, useSearchParams } from "react-router-dom";
import { useGeolocation } from "../Hooks/useGeolocation";
import styles from "./Map.module.css";
import Button from './Button';
import {
  MapContainer,
  Marker,
  Popup,
  TileLayer,
  useMap,
  useMapEvent,
} from "react-leaflet";
import { useEffect, useState } from "react";
import { useCities } from "../contexts/citiesContexts";
import {useUrlPosition} from "../Hooks/useUrlPosition";

function Map() { 
  const { cities } = useCities();
  const [mapPosition, setMapPosition] = useState([40, 0]);
  const {isLoading:isLoadingPosition, position:geoLocationPosition, getPosition}=useGeolocation()

  const [mapLat,mapLng]=useUrlPosition();

  useEffect(
    function () {
      console.log(mapLat,mapLng)
      if (mapLat && mapLng) setMapPosition([mapLat, mapLng]); //aisa kiya he taaki wo kaam kr ske back jane pe bhi wahi position pe rhe
    },[mapLat,mapLng]
  );

  useEffect(function(){
    if(geoLocationPosition) setMapPosition([geoLocationPosition.lat,geoLocationPosition.lng])
  },[geoLocationPosition])

  return (
    <div className={styles.mapContainer}>
     {!geoLocationPosition && <Button type="position" onClick={getPosition} >
        {isLoadingPosition ? "loading ...":"Use your position"}
      </Button>}
      <MapContainer
        center={mapPosition}
        // center={[mapLat,mapLng]}    //ye map ko usi jagah dikahyeag
        zoom={8}
        scrollWheelZoom={true}
        className={styles.map}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
        />
        {cities.map((city) => (
          <Marker
            position={[city.position.lat, city.position.lng]}
            key={city.id}
          >
            <Popup>
              <span>{city.emoji}</span> <span>{city.cityName}</span>
            </Popup>
          </Marker>
        ))}
        <ChnageCenter position={mapPosition} />
        {/*/ye banay he ki jab jab change ho position ye update ho or center kaam kr ethk se*/}
        <ClickDetect />
      </MapContainer>
    </div>
  );
}

function ChnageCenter({ position }) {
  const map = useMap();
  map.setView(position);
  return null;
}

function ClickDetect() {
  const navigate = useNavigate();
  useMapEvent({
    click: (e) => {
      console.log(e);
      navigate(`form?lat=${e.latlng.lat}&lng=${e.latlng.lng}`);
    },
  });
  return null; // This component does not render anything
}

export default Map;
