import { useEffect, useState } from "react";
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
  }, []);

  return (
    <>
      {history.length ? (
        <FlexDiv>
          <h2>Your search history:</h2>

          <ul>
            <div>
              <h4>START</h4>

              <h4>END</h4>
            </div>

            {history.map(
              ({ coordsStart, coordsEnd, addressStart, addressEnd }) => (
                <li key={coordsStart + coordsEnd}>
                  <span>{addressStart}</span> <span>{addressEnd}</span>
                </li>
              )
            )}
          </ul>
        </FlexDiv>
      ) : (
        <FlexDiv>
          <h2>
            Start finding routes! Your search history will be shown below.
          </h2>
        </FlexDiv>
      )}
    </>
  );
}
