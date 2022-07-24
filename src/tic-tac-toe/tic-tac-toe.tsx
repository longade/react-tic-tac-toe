import React from "react";
import "./tic-tac-toe.scss";
import TicTacToeTP from "./two-players/tic-tac-toe-tp";
import TicTacToeAI from "./ai/tic-tac-toe-ai";

const TicTacToe = () => {

  const [gameType, setGameType] = React.useState<string>('');

  const selectGameType = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setGameType(event.target.value);
  }

  return (
    <>
      {!gameType && <h3>{"Choose the type of the game"}</h3>}
      <select onChange={selectGameType}>
        <option value=''>{"Game Type..."}</option>
        <option value='tp'>{"Two Players"}</option>
        <option value='ai'>{"vs Smart AI"}</option>
      </select>
      {gameType && (gameType === 'tp' ? <TicTacToeTP /> : <TicTacToeAI />)}
    </>
  );
}

export default TicTacToe;