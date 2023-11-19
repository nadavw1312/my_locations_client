import { forwardRef, useImperativeHandle } from "react";
import { useMap } from "react-leaflet";

const MapActions = forwardRef((_props, ref) => {
  const map = useMap();

  useImperativeHandle(ref, () => ({
    async zoomToLocation(lat: number, lng: number) {
      map.locate();
      map.flyTo({ lat, lng }, map.getZoom());
    },
  }));

  return <></>;
});
export default MapActions;
