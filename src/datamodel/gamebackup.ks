import { useState, useEffect } from "react";
import { Alert } from "react-native";
import { loadData, saveData } from "../datamodel/mydata";

export const useGameLogic = () => {
  const [savedGames, setSavedGames] = useState({});
  const [playerTurn, setPlayerTurn] = useState(1);
  const [gameOver, setGameOver] = useState(0);
  const [turnCount, setTurnCount] = useState(1);
  const [history, setHistory] = useState([]);
  const [undoHistory, setUndoHistory] = useState([]);
  const [board, setBoard] = useState([
    ["", "", ""],
    ["", "", ""],
    ["", "", ""],
  ]);
  const [winningCells, setWinningCells] = useState([]);

  const clearBoard = () => {
    setBoard([
      ["", "", ""],
      ["", "", ""],
      ["", "", ""],
    ]);
    setPlayerTurn(1);
    setTurnCount(1);
    setHistory([]);
    setUndoHistory([]);
    setGameOver(0);
    setWinningCells();
  };

  class SaveData {
    constructor(make, model, year) {
      this.make = make
      this.model = model
      this.year = year
    }
  }



  useEffect(() => {
    const gameState = checkState(board, playerTurn);
    const updatedWinningCells = checkWinningCells(board);
    setWinningCells(updatedWinningCells);

    if (history.length > 0 && gameState !== `${playerTurn ? "X" : "O"}'s turn`) {
      setGameOver(1);
    } else {
      setGameOver(0);
    }
  }, [board, history, playerTurn]);

  const checkCellColor = (rowIndex, colIndex, winningCells) => {
    if (winningCells) {
      for (const [x, y] of winningCells) {
        if (x === rowIndex && y === colIndex) {
          return true;
        }
      }
    } else {
      return false;
    }
  };

  useEffect(() => {
    const firstLoad = async () => {
      const myData = await loadData();
      console.log("Loaded game data:")
      console.log(myData);
      setSavedGames(myData);
    };
    firstLoad();
  }, []);



  useEffect(() => {
    saveData(savedGames);
    console.log("Save triggered")
    console.log(savedGames);
  }, [savedGames]);


  const saveGame = () => {
    const currentDate = new Date();
    const id = () => {
      if (savedGames) {
        return (savedGames.length + 1)
      } else {
        return 1
      }
    }
    const saveData = {
      id: id(),
      date: currentDate.toLocaleDateString(),
      time: currentDate.toLocaleTimeString(),
      history: history,
      result: checkState(board, playerTurn),
      turnsTaken: history.length
    };
    setSavedGames({ saveData, ...savedGames, });
    console.log("Savegame triggered")
    console.log(saveData);
    clearBoard();
    postSave();
  };

  const preSave = () => {
    Alert.alert("Save Game", `Are you sure you want to save the game?`, [
      { text: "Cancel" },
      { text: "Save and start a new game", onPress: saveGame },
    ]);
  };
  const postSave = () => {
    Alert.alert("Game saved", `Game can be restored from load page`, [
      { text: "OK" },
    ]);
  };

  function checkWinningCells(board) {
    if (board[0][0] === board[0][1] && board[0][0] === board[0][2] && board[0][0] !== "") {
      return [[0, 0], [0, 1], [0, 2]];
    } else if (board[1][0] === board[1][1] && board[1][0] === board[1][2] && board[1][0] !== "") {
      return [[1, 0], [1, 1], [1, 2]];
    } else if (board[2][0] === board[2][1] && board[2][0] === board[2][2] && board[2][0] !== "") {
      return [[2, 0], [2, 1], [2, 2]];
    } else if (board[0][0] === board[1][0] && board[0][0] === board[2][0] && board[0][0] !== "") {
      return [[0, 0], [1, 0], [2, 0]];
    } else if (board[0][1] === board[1][1] && board[0][1] === board[2][1] && board[0][1] !== "") {
      return [[0, 1], [1, 1], [2, 1]];
    } else if (board[0][2] === board[1][2] && board[0][2] === board[2][2] && board[0][2] !== "") {
      return [[0, 2], [1, 2], [2, 2]];
    } else if (board[0][0] === board[1][1] && board[0][0] === board[2][2] && board[0][0] !== "") {
      return [[0, 0], [1, 1], [2, 2]];
    } else if (board[0][2] === board[1][1] && board[0][2] === board[2][0] && board[0][2] !== "") {
      return [[0, 2], [1, 1], [2, 0]];
    }
  }

  function checkState(board, playerTurn) {
    if (winningCells) {
      return `${playerTurn ? "O" : "X"} wins`;
    }
    if (board.flat().filter((cell) => cell !== "").length === 9) {
      return `Tie game`;
    } else {
      return `${playerTurn ? "X" : "O"}'s turn`;
    }
  }





  const placeTurn = (colIndex, rowIndex) => {
    if (!gameOver) {
      if (!!board[rowIndex][colIndex] == 1) return;
      const playerIcon = playerTurn ? "X" : "O";
      const updatedBoard = [...board];
      updatedBoard[rowIndex][colIndex] = playerIcon;
      setBoard(updatedBoard);
      setHistory((prevHistory) => [...prevHistory, [rowIndex, colIndex]]);
      setWinningCells(checkWinningCells(board))
      setTurnCount(turnCount + 1);
      setPlayerTurn(!playerTurn);
      setUndoHistory([]);
    }
  };

  const undoTurn = () => {
    if (history.length === 0) return;
    const lastTurn = history[history.length - 1];
    setUndoHistory((prevUndoHistory) => [...prevUndoHistory, lastTurn]);
    const updatedHistory = history.slice(0, -1);
    setHistory(updatedHistory);
    const updatedBoard = [...board];
    updatedBoard[lastTurn[0]][lastTurn[1]] = "";
    setBoard(updatedBoard);
    setGameOver(0);
    setWinningCells();
    setPlayerTurn(!playerTurn);
    setTurnCount(turnCount - 1);
  };

  const redoTurn = () => {
    if (undoHistory.length === 0) return;
    const lastTurn = undoHistory[undoHistory.length - 1];
    setHistory((prevHistory) => [...prevHistory, lastTurn]);
    const updatedUndoHistory = undoHistory.slice(0, -1);
    setUndoHistory(updatedUndoHistory);
    const updatedBoard = [...board];
    updatedBoard[lastTurn[0]][lastTurn[1]] = playerTurn ? "X" : "O";
    setBoard(updatedBoard);
    checkState(board, playerTurn);
    setPlayerTurn(!playerTurn);
    setTurnCount(turnCount + 1);
  };

  return {
    playerTurn,
    turnCount,
    history,
    undoHistory,
    board,
    gameOver,
    saveGame,
    saveAlert: preSave,
    history,
    checkState,
    checkWinningCells,
    winningCells,
    checkCellColor,
    clearBoard,
    placeTurn,
    undoTurn,
    redoTurn,
    savedGames,
  };
};













