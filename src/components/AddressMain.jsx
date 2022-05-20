import { AddressSection } from "../components/styles/AddressSection.styled";
import AddressForm from "../components/AddressForm";
import { Button, ButtonContainer } from "./styles/Button.styled";
import { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { GlobalContext } from "../context/GlobalState";
import axios from "axios";

export default function AddressMain() {
  const params = ["number", "street", "city", "postcode", "country"];
  const { coordsStart, coordsFinish, setCoordsStart, setCoordsFinish } =
    useContext(GlobalContext);
  const [start, setStart] = useState({
    number: "",
    street: "",
    city: "",
    postcode: "",
    country: "",
  });
  const [finish, setFinish] = useState({
    number: "",
    street: "",
    city: "",
    postcode: "",
    country: "",
  });
  const [lastCoordsStart, setLastCoordsStart] = useState([0, 0]);
  const [lastCoordsFinish, setLastCoordsFinish] = useState([0, 0]);
  const [savedCoords, setSavedCoords] = useState([
    {
      start: [0, 0],
      finish: [0, 0],
    },
  ]);
  const navigate = useNavigate();

  useEffect(() => {
    if (
      coordsStart[0] !== lastCoordsStart[0] ||
      coordsStart[1] !== lastCoordsStart[1]
    ) {
      if (
        coordsFinish[0] !== lastCoordsFinish[0] ||
        coordsFinish[1] !== lastCoordsFinish[1]
      ) {
        setLastCoordsStart(coordsStart);
        setLastCoordsFinish(coordsFinish);

        async function storage() {
          const coordsFromStorage = await JSON.parse(
            localStorage.getItem("coords")
          );

          if (coordsFromStorage && coordsFromStorage.length > 0) {
            // setSavedCoords([...savedCoords, coordsFromStorage]);

            console.log("from storage", coordsFromStorage);

            coordsFromStorage.forEach((coords) => {
              if (
                coords.coordsStart[0] !== coordsStart[0] &&
                coords.coordsStart[1] !== coordsStart[1] &&
                coords.coordsFinish[0] !== coordsFinish[0] &&
                coords.coordsFinish[1] !== coordsFinish[1]
              ) {
                if (coordsFromStorage.length <= 10) {
                  localStorage.setItem(
                    "coords",
                    JSON.stringify([
                      ...coordsFromStorage,
                      { coordsStart, coordsFinish },
                    ])
                  );
                } else {
                  coordsFromStorage.shift();

                  localStorage.setItem(
                    "coords",
                    JSON.stringify([
                      ...coordsFromStorage,
                      { coordsStart, coordsFinish },
                    ])
                  );
                }
              }
            });
          } else {
            localStorage.setItem(
              "coords",
              JSON.stringify([{ coordsStart, coordsFinish }])
            );
          }
        }

        storage();

        // navigate("/map");
      }
    }

    console.log("GEEEEZ", coordsStart, coordsFinish, lastCoordsStart, lastCoordsFinish);

    // if (
    //   coordsFinish[0] !== lastCoordsFinish[0] ||
    //   coordsFinish[1] !== lastCoordsFinish[1]
    // ) {
    //   setLastCoordsFinish(coordsFinish);

    //   storage();
    // }
  }, [coordsStart, coordsFinish, lastCoordsStart, lastCoordsFinish, navigate]);

  async function handleClick() {
    let addressStart = "";
    let addressFinish = "";

    for (const prop in start) {
      addressStart += `+${start[prop]}`;
    }

    for (const prop in finish) {
      addressFinish += `+${finish[prop]}`;
    }

    // replace potential spaces with "+"
    const addressStartClean = addressStart.replace(" ", "+");
    const addressFinishClean = addressFinish.replace(" ", "+");

    geocode("start", addressStartClean);
    geocode("finish", addressFinishClean);
  }

  function geocode(point, address) {
    axios
      .get(
        `https://geocode.search.hereapi.com/v1/geocode?q=${address}&apiKey=${process.env.REACT_APP_API_KEY}`
      )
      .then((response) => {
        const data = response.data;

        if (point === "start") {
          setCoordsStart([
            data.items[0].position.lat,
            data.items[0].position.lng,
          ]);
        } else {
          setCoordsFinish([
            data.items[0].position.lat,
            data.items[0].position.lng,
          ]);
        }
      })
      .catch((error) => {
        const errorMsg = error.message;
        console.log(errorMsg);
      });
    // .finally(() => {

    // });
  }

  // async function storage() {
  //   const coordsFromStorage = await JSON.parse(localStorage.getItem("coords"));

  //   if (coordsFromStorage && coordsFromStorage.length > 0) {
  //     // setSavedCoords([...savedCoords, coordsFromStorage]);

  //     console.log("from storage", coordsFromStorage);

  //     coordsFromStorage.forEach((coords) => {
  //       if (
  //         coords.coordsStart[0] !== coordsStart[0] &&
  //         coords.coordsStart[1] !== coordsStart[1] &&
  //         coords.coordsFinish[0] !== coordsFinish[0] &&
  //         coords.coordsFinish[1] !== coordsFinish[1]
  //       ) {
  //         if (coordsFromStorage.length <= 10) {
  //           localStorage.setItem(
  //             "coords",
  //             JSON.stringify([
  //               ...coordsFromStorage,
  //               { coordsStart, coordsFinish },
  //             ])
  //           );
  //         } else {
  //           coordsFromStorage.shift();

  //           localStorage.setItem(
  //             "coords",
  //             JSON.stringify([
  //               ...coordsFromStorage,
  //               { coordsStart, coordsFinish },
  //             ])
  //           );
  //         }
  //       }
  //     });
  //   } else {
  //     localStorage.setItem(
  //       "coords",
  //       JSON.stringify([{ coordsStart, coordsFinish }])
  //     );
  //   }
  // }

  useEffect(() => {
    console.log("state coords start: ", coordsStart);
  }, [coordsStart]);

  useEffect(() => {
    console.log("state coords finish: ", coordsFinish);
  }, [coordsFinish]);

  return (
    <>
      <h2>Select route</h2>

      <AddressSection>
        <AddressForm
          heading="Start"
          params={params}
          start={start}
          setStart={setStart}
        />

        <AddressForm
          heading="Finish"
          params={params}
          finish={finish}
          setFinish={setFinish}
        />
      </AddressSection>

      <ButtonContainer>
        <Button onClick={handleClick}>Find route</Button>
      </ButtonContainer>
    </>
  );
}
