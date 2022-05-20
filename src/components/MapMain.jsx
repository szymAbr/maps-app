import { useContext, useEffect, useState } from "react";
import { MapContainer, TileLayer } from "react-leaflet";
import { GlobalContext } from "../context/GlobalState";
import MapRouting from "./MapRouting";
import MapMarker from "./MapMarker";
import MapForm from "./MapForm";
import styled from "styled-components";
import "leaflet-routing-machine";
import "leaflet-routing-machine/dist/leaflet-routing-machine.css";

const StyledMap = styled(MapContainer)`
  width: 100vw;
  height: 70vh;
`;

export default function MapMain() {
  const { coordsStart, coordsFinish } = useContext(GlobalContext);
  const [summary, setSummary] = useState(null);
  const [totalDistance, setTotalDistance] = useState(0);
  const [totalCost, setTotalCost] = useState(0);
  const [price, setPrice] = useState(0);

  useEffect(() => {
    if (summary) {
      setTotalDistance((summary.totalDistance / 1000).toFixed(2));
    }
  }, [summary]);

  useEffect(() => {
    if (totalDistance && price) {
      setTotalCost((totalDistance * price * 1.1).toFixed(2));
    }
  }, [totalDistance, price]);

  return (
    <>
      {totalDistance ? (
        <div>
          <MapForm setPrice={setPrice} />

          <p>Total distance: {totalDistance} km</p>

          <p>Total cost: &euro;{totalCost}</p>
        </div>
      ) : null}

      {coordsStart[0] ? (
        <StyledMap
          scrollWheelZoom={true}
          whenReady={(e) => console.log(e.target)}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          <MapRouting
            start={[coordsStart[0], coordsStart[1]]}
            finish={[coordsFinish[0], coordsFinish[1]]}
            setSummary={setSummary}
          />

          <MapMarker
            position={[coordsStart[0], coordsStart[1]]}
            type={"START"}
            address={"address"}
          />

          <MapMarker
            position={[coordsFinish[0], coordsFinish[1]]}
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
