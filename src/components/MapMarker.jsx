import { Marker, Popup } from "react-leaflet";

export default function MapMarker({ position, type, address }) {
  return (
    <Marker position={position}>
      <Popup>
        <span>{type}</span>
        <br />
        <span>ADDRESS: {address}</span>
        <br />
      </Popup>
    </Marker>
  );
}
