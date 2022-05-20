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
  width: 70vw;
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
      setTotalDistance(summary.totalDistance);
    }
  }, [summary]);

  useEffect(() => {
    if (totalDistance && price) {
      setTotalCost(totalDistance * price);
    }
  }, [totalDistance, price]);

  return (
    <>
      <MapForm price={price} setPrice={setPrice} />

      {totalDistance ? (
        <div>
          <p>Total distance: {(totalDistance / 1000).toFixed(2)} km</p>

          <p>Total cost: &euro;{totalCost}</p>
        </div>
      ) : null}

      {coordsStart.lat ? (
        <StyledMap
          scrollWheelZoom={true}
          whenReady={(e) => console.log(e.target)}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          <MapRouting
            start={[coordsStart.lat, coordsStart.lng]}
            finish={[coordsFinish.lat, coordsFinish.lng]}
            setSummary={setSummary}
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
