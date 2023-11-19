import { MapContainer, Marker, Popup, TileLayer, useMapEvents } from "react-leaflet";
import { useCurrentLocation } from "../../hooks/useCurrentLocation";
import { useEffect, useRef, useState } from "react";
import { LatLngTuple } from "leaflet";
import { IFavoriteLocation } from "../../models/FavoriteLocation";
import { ILocation } from "../../types/types";
import MapActions from "./MapActions";

interface MapProps {
  location?: ILocation;
  handlePositionChange: (position: [number, number] | null) => void;
  userLocations: IFavoriteLocation[];
}

const Map = ({ handlePositionChange, userLocations, location }: MapProps) => {
  const { currPosition, isInitilaized } = useCurrentLocation();
  const [position, setPosition] = useState<[number, number] | null>(null);
  const mapActionsRef = useRef<any>();

  useEffect(() => {
    handlePositionChange(position);
  }, [position]);

  useEffect(() => {
    location && mapActionsRef?.current?.zoomToLocation(location.position.lat, location.position.lng);
  }, [location]);

  const LocationMarker = () => {
    const map = useMapEvents({
      click(e) {
        map.locate();
        const { lat, lng } = e.latlng;

        setPosition([lat, lng]);
        map.flyTo(e.latlng, map.getZoom());
      },
    });

    return position === null ? null : (
      <Marker position={position as LatLngTuple}>
        <Popup>You are here</Popup>
      </Marker>
    );
  };

  if (!isInitilaized) {
    return <div></div>;
  }

  return (
    <MapContainer center={currPosition} zoom={12} scrollWheelZoom={true} style={{ height: "100%", width: "100%" }}>
      <TileLayer
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <MapActions ref={mapActionsRef} />
      <LocationMarker />
      <Marker position={currPosition}>
        <Popup>
          <div className="flex flex-col justify-center">
            <div>Your current location</div>
            {/* <button onClick={setCurrLocation}>add</button> */}
          </div>
        </Popup>
      </Marker>
      {userLocations.map((userLocation) => (
        <Marker position={userLocation.location.position} key={userLocation.id}>
          <Popup>
            <div>{userLocation.title}</div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
};
export default Map;
