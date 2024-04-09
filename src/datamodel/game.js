import { useState } from 'react';


export const useGameLogic = () => {
  const [playerTurn, setPlayerTurn] = useState(1);
  const [turnCount, setTurnCount] = useState(1);
  const [history, setHistory] = useState([]);
  const [undoHistory, setUndoHistory] = useState([]);
  const [board, setBoard] = useState([
    ['', '', ''],
    ['', '', ''],
    ['', '', ''],
  ]);

  const clearBoard = () => {
    setBoard([
      ['', '', ''],
      ['', '', ''],
      ['', '', ''],
    ]);
    setPlayerTurn(1);
    setTurnCount(1);
    setHistory([]);
    setUndoHistory([]);
  };

  const placeTurn = (colIndex, rowIndex) => {
    if (!!board[rowIndex][colIndex] == 1) return;
    const playerIcon = playerTurn ? "X" : "O";
    const updatedBoard = [...board];
    updatedBoard[rowIndex][colIndex] = playerIcon;
    setBoard(updatedBoard);
    setHistory(prevHistory => [...prevHistory, [rowIndex, colIndex]]);
    setTurnCount(turnCount + 1);
    setPlayerTurn(!playerTurn);
    setUndoHistory([]);
  };

  const undoTurn = () => {
    if (history.length === 0) return;
    const lastTurn = history[history.length - 1];
    setUndoHistory(prevUndoHistory => [...prevUndoHistory, lastTurn]);
    const updatedHistory = history.slice(0, -1);
    setHistory(updatedHistory);
    const updatedBoard = [...board];
    updatedBoard[lastTurn[0]][lastTurn[1]] = "";
    setBoard(updatedBoard);
    setPlayerTurn(!playerTurn);
    setTurnCount(turnCount - 1);
  };

  const redoTurn = () => {
    if (undoHistory.length === 0) return;
    const lastTurn = undoHistory[undoHistory.length - 1];
    setHistory(prevHistory => [...prevHistory, lastTurn]);
    const updatedUndoHistory = undoHistory.slice(0, -1);
    setUndoHistory(updatedUndoHistory);
    const updatedBoard = [...board];
    updatedBoard[lastTurn[0]][lastTurn[1]] = playerTurn ? "X" : "O";
    setBoard(updatedBoard);
    setPlayerTurn(!playerTurn);
    setTurnCount(turnCount + 1);
  };

  return {
    playerTurn,
    turnCount,
    history,
    undoHistory,
    board,
    clearBoard,
    placeTurn,
    undoTurn,
    redoTurn,
  };
};
