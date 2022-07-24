import React from "react";
import "../tic-tac-toe.scss";
import { calculateWinner, isBoardFilled } from "../util/util";

const initialDivsStatus: string[] = ['', '', '', '', '', '', '', '', ''];

const TicTacToeTP = () => {

  const [divsStatus, setDivsStatus] = React.useState<string[]>([...initialDivsStatus]);
  const [lastSign, setLastSign] = React.useState<string>('X');
  const [winner, setWinner] = React.useState<string>('');

  const onItemClick = (pos: number) => {
    if (divsStatus[pos]) {
      return;
    }

    const newStatus = [...divsStatus];
    newStatus[pos] = lastSign;
    setDivsStatus(newStatus);

    const newSign = lastSign === 'X' ? 'O' : 'X';
    setLastSign(newSign);
  }

  const checkForWinner = React.useCallback((squares: string[]) => {
    const winnerUser = calculateWinner(squares);
    if (winnerUser) {
      setWinner(winnerUser);
      setLastSign('X');
    }
  }, []);

  const checkDraw = React.useCallback((squares: string[]) => {
    const isDraw = isBoardFilled(squares);
    if (isDraw) {
      setWinner("Draw");
      setLastSign('X');
    }
  }, []);

  const resetGame = () => {
    setWinner('');
    const init = [...initialDivsStatus];
    setDivsStatus(init);
  }

  React.useEffect(() => {
    checkForWinner(divsStatus);
    checkDraw(divsStatus);
  }, [divsStatus, checkForWinner, checkDraw])

  return (
    <>
      <h2>{"React Tic-Tac-Toe Two Players"}</h2>
      <div className="info">
        {winner ?
          winner === "Draw" ? <h3>{"It's a draw!"}</h3> : <h3>{"The winner is: " + winner}</h3>
          :
          null
        }
        <button onClick={resetGame}>{"Reset"}</button>
      </div>
      <div style={{ marginBottom: 20 }} />
      <div className="grid" style={winner ? { pointerEvents: 'none' } : undefined}>
        <div className="grid-item" onClick={() => onItemClick(0)}>{divsStatus[0]}</div>
        <div className="grid-item" onClick={() => onItemClick(1)}>{divsStatus[1]}</div>
        <div className="grid-item" onClick={() => onItemClick(2)}>{divsStatus[2]}</div>
        <div className="grid-item" onClick={() => onItemClick(3)}>{divsStatus[3]}</div>
        <div className="grid-item" onClick={() => onItemClick(4)}>{divsStatus[4]}</div>
        <div className="grid-item" onClick={() => onItemClick(5)}>{divsStatus[5]}</div>
        <div className="grid-item" onClick={() => onItemClick(6)}>{divsStatus[6]}</div>
        <div className="grid-item" onClick={() => onItemClick(7)}>{divsStatus[7]}</div>
        <div className="grid-item" onClick={() => onItemClick(8)}>{divsStatus[8]}</div>
      </div>
    </>
  );
}

export default TicTacToeTP;