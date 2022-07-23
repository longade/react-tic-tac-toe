import React from "react";
import "../tic-tac-toe.scss";

const initialDivsStatus: string[][] = [
  ['', '', ''],
  ['', '', ''],
  ['', '', '']
]

const TicTacToeTP = () => {

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

  const checkForWinner = React.useCallback((divsStatus: string[][]) => {
    const squares = divsStatus.flat();
    let winnerUser = '';
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6]
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        winnerUser = squares[a];
      }
    }
    if (winnerUser) {
      setWinner(winnerUser);
      setLastSign('X');
    }
  }, []);

  const checkDraw = React.useCallback((divsStatus: string[][]) => {
    if (divsStatus.flat().every((cell: string) => cell !== '')) {
      setWinner("Draw");
      setLastSign('X');
    }
  }, []);

  const resetGame = () => {
    setWinner('');
    const init = initialDivsStatus.map(inner => inner.slice());
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

export default TicTacToeTP;