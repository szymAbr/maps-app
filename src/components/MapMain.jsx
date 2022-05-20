import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import MapRouting from "./MapRouting";
import MapMarker from "./MapMarker";
import { GlobalContext } from "../context/GlobalState";
import styled from "styled-components";
import { useContext } from "react";

const StyledMap = styled(MapContainer)`
  width: 100vw;
  height: 100vh;
`;

export default function MapMain() {
  const { coordsStart, coordsFinish } = useContext(GlobalContext);

  return (
    <StyledMap scrollWheelZoom={true}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      <MapRouting />

      <Marker position={[52.41133, 16.93065]}>
        <Popup>
          <span>START</span>
          <br />
          <span>ADDRESS: xxxx</span>
          <br />
        </Popup>
      </Marker>

      <Marker position={[52.21427, 21.02099]}>
        <Popup>
          <span>FINISH</span>
          <br />
          <span>ADDRESS: xxxx</span>
          <br />
        </Popup>
      </Marker>
    </StyledMap>
  );
}
