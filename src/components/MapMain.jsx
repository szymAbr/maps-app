import { MapContainer, TileLayer } from "react-leaflet";
import MapRouting from "./MapRouting";
import MapMarker from "./MapMarker";
import { GlobalContext } from "../context/GlobalState";
import styled from "styled-components";
import { useContext } from "react";
import "leaflet-routing-machine";
import "leaflet-routing-machine/dist/leaflet-routing-machine.css";

const StyledMap = styled(MapContainer)`
  width: 70vw;
  height: 70vh;
`;

export default function MapMain() {
  const { coordsStart, coordsFinish } = useContext(GlobalContext);

  return (
    <>
      {coordsStart.lat ? (
        <StyledMap scrollWheelZoom={true}>
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          <MapRouting
            start={[coordsStart.lat, coordsStart.lng]}
            finish={[coordsFinish.lat, coordsFinish.lng]}
          />

          <MapMarker
            position={[coordsStart.lat, coordsStart.lng]}
            type={"START"}
            address={"address"}
          />

          <MapMarker
            position={[coordsFinish.lat, coordsFinish.lng]}
            type={"FINISH"}
            address={"address"}
          />
        </StyledMap>
      ) : (
        <StyledMap
          center={[49.925006, 15.52532]}
          zoom={3}
          scrollWheelZoom={true}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
        </StyledMap>
      )}
    </>
  );
}
