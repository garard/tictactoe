import { Text, View, Pressable } from 'react-native';
import Styles from '../components/Styles'
import React from 'react';
import { useGameLogic } from '../datamodel/game';

/*
check winner

map ...board to 1d array

function checkState(board) {
  // Row 012, 345, 678
  let i = 0
  for ( i = 0; i < 4; i += 2) {
    if (board[0 + i] === board[1 + i] && board[0 + i] === board[2 + i] && board[0 + i] !== '') {
      return board[0 + i] + ' wins';
    }
  }

  // Column 036, 147, 258
  for ( i = 0; i < 2; i++) {
    if (board[0 + i] === board[3 + i] && board[0 + i] === board[6 + i] && board[0 + i] !== '') {
      return board[0 + i] + ' wins';
    }
  }

  // Diagonal
  if ((board[0] === board[4] && board[4] === board[8] && board[0] !== '') ||
      (board[2] === board[4] && board[4] === board[6] && board[2] !== '')) {
    return board[4] + ' wins';
  }

  // Tie game
  if (board.filter(element => element !== '').length === 9) {
    return 'It is a tie';
  }

  // Who's turn
  return (board.filter(element => element === 'X').length > board.filter(element => element === 'O').length) ? 'O to play' : 'X to play';
}


*/

export default Home = function ({navigation}) {
  const navToRules = () => navigation.navigate('Rules')
  const navToCredits = () => navigation.navigate('Credits')
  const {
    playerTurn,
    turnCount,
    history,
    undoHistory,
    board,
    clearBoard,
    placeTurn,
    undoTurn,
    redoTurn,
  } = useGameLogic();

  return (
  <View style={Styles.container}> 


    <View style={[Styles.container, {flexDirection: 'row', flexWrap: "wrap"}]}> 

    <Text style={[Styles.undo, { backgroundColor: turnCount > 1 ? 'lightgreen' : 'lightgray' }]} onPress={undoTurn}>
        {'<'}
        </Text>

      <View style={[Styles.box, {height: 50, width: 150, borderRadius: 50, backgroundColor: (turnCount > 1  || undoHistory.length >= 1 )? 'lightgreen':'lightgray', marginHorizontal: 50}]}> 
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
              <Pressable key={colIndex} style={Styles.box} onPress={() => placeTurn(colIndex, rowIndex)}>
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