import { Text, View, Pressable } from 'react-native';
import Styles from '../components/Styles'
import React, {useState} from 'react';

export default Home = function ({navigation}) {
  const navToRules = () => navigation.navigate('Rules')
  const navToCredits = () => navigation.navigate('Credits')

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
    setPlayerTurn(0);
    setTurnCount(1);
    setHistory([]);
    setUndoHistory([])
  };

  const placeTurn = (history, turnCount, playerTurn, colIndex, rowIndex) =>{
    if (!!board[rowIndex][colIndex] == 1) return
    const playerIcon = playerTurn ? "X" : "O";
    const updatedBoard = [...board];
    updatedBoard[rowIndex][colIndex] = playerIcon;
    setBoard(updatedBoard);
    setHistory(prevHistory => [...prevHistory, [rowIndex, colIndex]]);
    setTurnCount(turnCount+1);
    setPlayerTurn(!playerTurn);
    setUndoHistory([])
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
    setPlayerTurn(!playerTurn)
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
    setPlayerTurn(!playerTurn)
    setTurnCount(turnCount + 1);
  };


  return (
  <View style={Styles.container}> 


    <View style={[Styles.container, {flexDirection: 'row', flexWrap: "wrap"}]}> 

    <Text style={[Styles.undo, { backgroundColor: turnCount > 1 ? 'lightgreen' : 'lightgray' }]} onPress={undoTurn}>
        {'<'}
        </Text>

      <View style={[Styles.box, {height: 50, width: 150, borderRadius: 50, backgroundColor: turnCount > 1 ? 'lightgreen':'lightgray', marginHorizontal: 50}]}> 
        <Text style={{fontSize: 20, textAlign: "center"}} onPress={clearBoard}>
        New Game
        </Text>
      </View>

      <Text style={[Styles.undo, {backgroundColor: undoHistory.length >= 1 ? 'lightgreen':'lightgray'}]} onPress={redoTurn}>
        {'>'}
        </Text>

        <View style={[Styles.box, {height: 50, width: 150, backgroundColor: 'white', marginVertical: 50}]}> 
        <Text style={{fontSize: 20, textAlign: "center"}} onPress={clearBoard}>
        {playerTurn ? "X" : "O"}'s Turn
        </Text>
      </View>


    </View>

<View style={[Styles.board, { margin: 100 }]}>
        {board.map((row, rowIndex) => (
          <View key={rowIndex} style={Styles.row}>
            {row.map((box, colIndex) => (
              <Pressable key={colIndex} style={Styles.box} onPress={() => placeTurn(history, turnCount, playerTurn, colIndex, rowIndex)}>
                <Text style={Styles.text}>{box}</Text>
              </Pressable>
            ))}
          </View>
        ))}
      </View>

    <View style={[Styles.container, {flexDirection: 'row'}]}> 
    <View style={[Styles.box, {height: 50, width: 150, borderRadius: 50, backgroundColor: 'lightgreen'}]}> 
    <Text style={{fontSize:19}} onPress={navToRules}>
    RULES
    </Text>
    
    </View>
    <View style={[Styles.box, {height: 50, width: 150, borderRadius: 50, backgroundColor: 'skyblue', marginLeft: 50}]}> 
    <Text style={{fontSize:19}} onPress={navToCredits}>
    CREDITS
    </Text>
    </View>
    </View>
  </View>
  );
}