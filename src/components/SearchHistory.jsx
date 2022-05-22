import { useContext, useEffect, useState } from "react";
import { GlobalContext } from "../context/GlobalState";
import { FlexDiv } from "./styles/FlexDiv.styled";

export default function SearchHistory() {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    async function getHistory() {
      const storedHistory = await JSON.parse(localStorage.getItem("coords"));

      if (storedHistory && storedHistory.length > 0) {
        setHistory(storedHistory);
      }
    }

    getHistory();
  });

  return (
    <>
      {history.length ? (
        <FlexDiv>
          <h3>Your search history:</h3>

          <ul>
            {history.map(
              ({ coordsStart, coordsFinish, addressStart, addressFinish }) => (
                <li key={coordsStart + coordsFinish}>
                  <span>{addressStart}</span> <span>{addressFinish}</span>
                </li>
              )
            )}
          </ul>
        </FlexDiv>
      ) : (
        <FlexDiv>
          <h3>
            Start finding routes! Your search history will be shown below.
          </h3>
        </FlexDiv>
      )}
    </>
  );
}
