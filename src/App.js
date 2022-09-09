import logo from "./logo.svg";
import "./App.css";
import { useState, useEffect } from "react";

const App = () => {
  const [playerBoard, setPlayerBoard] = useState([0, 0, 0, 0, 0, 0, 0, 0, 0]);
  const [winner, setWinner] = useState(false);
  const [playerTurn, setPlayerTurn] = useState(1);

  const rowClick = (index, player) => {
    const copyArray = [...playerBoard];
    copyArray[index] = player;
    setPlayerBoard(copyArray);
    setPlayerTurn(playerTurn === 1 ? 2 : 1);
  };
  const allEqual = (a) => a.every((val) => val === a[0] && val !== 0);

  const checkColumns = (first, second, third) => {
    if (
      (first[0] === second[0] &&
        first[0] === third[0] &&
        first[0] !== 0 &&
        second[0] !== 0 &&
        third[0] !== 0) ||
      (first[1] === second[1] &&
        first[1] === third[1] &&
        first[1] !== 0 &&
        second[1] !== 0 &&
        third[1] !== 0) ||
      (first[2] === second[2] &&
        first[2] === third[2] &&
        first[2] !== 0 &&
        second[2] !== 0 &&
        third[2] !== 0)
    ) {
      setWinner(true);
    }
  };

  const checkDiagonals = (first, second, third) => {
    console.log(first, second, third);
    console.log(first[0] === second[1] && first[0] === third[2]);
    if (
      (first[0] === second[1] &&
        first[0] === third[2] &&
        first[0] !== 0 &&
        second[1] !== 0 &&
        third[2] !== 0) ||
      (first[2] === second[1] &&
        first[2] === third[0] &&
        first[2] !== 0 &&
        second[1] !== 0 &&
        third[0] !== 0)
    ) {
      setWinner(true);
    }
  };

  useEffect(() => {
    const firstRow = playerBoard.slice(0, 3);
    const secondRow = playerBoard.slice(3, 6);
    const thirdRow = playerBoard.slice(6, 9);

    if (allEqual(firstRow) || allEqual(secondRow) || allEqual(thirdRow)) {
      setWinner(true);
    }
    checkColumns(firstRow, secondRow, thirdRow);
    checkDiagonals(firstRow, secondRow, thirdRow);
  }, [playerBoard]);

  return (
    <>
      {winner && <span>There is a winner</span>}
      <div className="mainColumns">
        {playerBoard.map((board, index) => {
          return (
            <button
              key={Math.random()}
              disabled={!!board || winner}
              className="box"
              onClick={() => rowClick(index, playerTurn)}
            >
              <>
                <span>
                  {board === 1 && "X"} {board === 2 && "O"}
                </span>
              </>
            </button>
          );
        })}
      </div>
    </>
  );
};

export default App;
