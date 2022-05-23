import { useContext, useEffect, useRef, useState } from "react";
import { TileLayer } from "react-leaflet";
import { GlobalContext } from "../context/GlobalState";
import MapRouting from "./MapRouting";
import MapMarker from "./MapMarker";
import MapForm from "./MapForm";
import { StyledMap } from "./styles/MapMain.styled";
import "leaflet-routing-machine";
import "leaflet-routing-machine/dist/leaflet-routing-machine.css";
import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";
import { BsArrowRight } from "react-icons/bs";
import { FlexDiv } from "./styles/FlexDiv.styled";

export default function MapMain() {
  const {
    addressStart,
    addressEnd,
    coordsStart,
    coordsEnd,
    setStartUpdated,
    setEndUpdated,
  } = useContext(GlobalContext);
  const [summary, setSummary] = useState(null);
  const [totalDistance, setTotalDistance] = useState(0);
  const [totalCost, setTotalCost] = useState(0);
  const [price, setPrice] = useState(0);
  const printRef = useRef(null);

  useEffect(() => {
    if (summary) {
      setTotalDistance((summary.totalDistance / 1000).toFixed(2));
      setStartUpdated(false);
      setEndUpdated(false);
    }
  }, [summary]);

  useEffect(() => {
    if (totalDistance && price) {
      setTotalCost((totalDistance * price * 1.1).toFixed(2));
    }
  }, [totalDistance, price]);

  useEffect(() => {
    async function storage() {
      const storedCoords = await JSON.parse(localStorage.getItem("coords"));

      if (
        coordsStart[0] === 0 &&
        coordsStart[1] === 0 &&
        coordsEnd[0] === 0 &&
        coordsEnd[1] === 0
      )
        return;

      if (storedCoords && storedCoords.length > 0) {
        if (
          storedCoords.some(
            (coords) =>
              coords.coordsStart[0] === coordsStart[0] &&
              coords.coordsStart[1] === coordsStart[1] &&
              coords.coordsEnd[0] === coordsEnd[0] &&
              coords.coordsEnd[1] === coordsEnd[1]
          )
        )
          return;

        if (storedCoords.length <= 9) {
          localStorage.setItem(
            "coords",
            JSON.stringify([
              ...storedCoords,
              { coordsStart, coordsEnd, addressStart, addressEnd },
            ])
          );
        } else {
          storedCoords.shift();

          localStorage.setItem(
            "coords",
            JSON.stringify([
              ...storedCoords,
              { coordsStart, coordsEnd, addressStart, addressEnd },
            ])
          );
        }
      } else {
        localStorage.setItem(
          "coords",
          JSON.stringify([{ coordsStart, coordsEnd, addressStart, addressEnd }])
        );
      }
    }

    storage();
  }, [addressStart, addressEnd, coordsStart, coordsEnd]);

  function printDocument() {
    html2canvas(printRef.current).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("l", "px", [612, 792]);
      pdf.addImage(imgData, "JPEG", 0, 0);
      pdf.save("download.pdf");
    });
  }

  return (
    <div>
      {totalDistance ? (
        <FlexDiv ref={printRef}>
          <p>
            <span>{addressStart}</span> <BsArrowRight />{" "}
            <span>{addressEnd}</span>
          </p>

          <MapForm setPrice={setPrice} />

          <p>Total distance: {totalDistance} km</p>

          <p>Total cost: &euro;{totalCost}</p>

          <button onClick={printDocument}>Download as PDF</button>
        </FlexDiv>
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
            end={[coordsEnd[0], coordsEnd[1]]}
            setSummary={setSummary}
          />

          <MapMarker
            position={[coordsStart[0], coordsStart[1]]}
            type={"START"}
            address={"address"}
          />

          <MapMarker
            position={[coordsEnd[0], coordsEnd[1]]}
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
    </div>
  );
}
