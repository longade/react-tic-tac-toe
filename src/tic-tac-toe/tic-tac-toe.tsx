import React from "react";
import "./tic-tac-toe.scss";

const initialDivsStatus: string[][] = [
  ['', '', ''],
  ['', '', ''],
  ['', '', '']
]

const TicTacToe = () => {

  const [divsStatus, setDivsStatus] = React.useState<string[][]>(initialDivsStatus.map(inner => inner.slice()));
  const [lastSign, setLastSign] = React.useState<string>('X');
  const [winner, setWinner] = React.useState<string>('');

  const onItemClick = (x: number, y: number) => {
    if (divsStatus[x][y]) {
      return;
    }

    const newStatus = divsStatus.map(inner => inner.slice());
    newStatus[x][y] = lastSign;
    setDivsStatus(newStatus);

    const newSign = lastSign === 'X' ? 'O' : 'X';
    setLastSign(newSign);
  }

  const checkDraw = React.useCallback((divsStatus: string[][]) => {
    if (divsStatus.flat().every((cell: string) => cell !== '')) {
      setWinner("Draw");
      setLastSign('X');
    }
  }, []);

  const checkRows = React.useCallback((divsStatus: string[][]) => {
    for (let i = 0; i < 3; i++) {
      if (divsStatus[i][0] && divsStatus[i][0] === divsStatus[i][1] && divsStatus[i][1] === divsStatus[i][2]) {
        return divsStatus[i][0];
      }
    }
    return false;
  }, []);

  const checkColumns = React.useCallback((divsStatus: string[][]) => {
    for (let i = 0; i < 3; i++) {
      if (divsStatus[0][i] && divsStatus[0][i] === divsStatus[1][i] && divsStatus[1][i] === divsStatus[2][i]) {
        return divsStatus[0][i];
      }
    }
    return false;
  }, []);

  const checkDiagonals = React.useCallback((divsStatus: string[][]) => {
    if (divsStatus[0][0] && divsStatus[0][0] === divsStatus[1][1] && divsStatus[1][1] === divsStatus[2][2]) {
      return divsStatus[0][0];
    }
    else if (divsStatus[0][2] && divsStatus[0][2] === divsStatus[1][1] && divsStatus[1][1] === divsStatus[2][0]) {
      return divsStatus[0][2];
    }
  }, []);

  const checkWinner = React.useCallback((divsStatus: string[][]) => {
    const winnerUser = checkRows(divsStatus) || checkColumns(divsStatus) || checkDiagonals(divsStatus);
    if (winnerUser) {
      setWinner(winnerUser);
      setLastSign('X');
    }
  }, [checkRows, checkColumns, checkDiagonals]);

  const resetGame = () => {
    setWinner('');
    const init = initialDivsStatus.map(inner => inner.slice());
    setDivsStatus(init);
  }

  React.useEffect(() => {
    checkWinner(divsStatus);
    checkDraw(divsStatus);
  }, [divsStatus, checkWinner, checkDraw])

  return (
    <>
      <h2>{"React Tic-Tac-Toe"}</h2>
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
        <div className="grid-item" onClick={() => onItemClick(0, 0)}>{divsStatus[0][0]}</div>
        <div className="grid-item" onClick={() => onItemClick(0, 1)}>{divsStatus[0][1]}</div>
        <div className="grid-item" onClick={() => onItemClick(0, 2)}>{divsStatus[0][2]}</div>
        <div className="grid-item" onClick={() => onItemClick(1, 0)}>{divsStatus[1][0]}</div>
        <div className="grid-item" onClick={() => onItemClick(1, 1)}>{divsStatus[1][1]}</div>
        <div className="grid-item" onClick={() => onItemClick(1, 2)}>{divsStatus[1][2]}</div>
        <div className="grid-item" onClick={() => onItemClick(2, 0)}>{divsStatus[2][0]}</div>
        <div className="grid-item" onClick={() => onItemClick(2, 1)}>{divsStatus[2][1]}</div>
        <div className="grid-item" onClick={() => onItemClick(2, 2)}>{divsStatus[2][2]}</div>
      </div>
    </>
  );
}

export default TicTacToe;