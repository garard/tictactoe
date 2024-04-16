import { Text, View, Pressable, Alert } from "react-native";
import Styles from "../components/Styles";
import React from "react";
import { useGameLogic } from "../datamodel/game";
import { SafeAreaView } from "react-native-safe-area-context";
import { useFocusEffect } from "@react-navigation/core";

export default Home = function ({ navigation }) {
  const navToRules = () => navigation.navigate("Rules");
  const navToCredits = () => navigation.navigate("Credits");
  const navToLoad = () => navigation.navigate("LoadGame");
  const {
    playerTurn,
    turnCount,
    undoHistory,
    board,
    gameOver,
    history,
    winningCells,
    checkCellColor,
    checkState,
    clearBoard,
    saveAlert,
    placeTurn,
    setHistory,
    undoTurn,
    redoTurn,
    loadedHistory,
  } = useGameLogic();



  return (
    <SafeAreaView style={Styles.container}>
      <View style={[Styles.header, { flexDirection: "row", flexWrap: "wrap" }]}>
        <View
          style={[
            Styles.box,
            {
              height: 50,
              width: 150,
              backgroundColor: "white",
              marginVertical: "1.5%",

            },
          ]}
        >
          <Text
            style={{ fontSize: 20, textAlign: "center" }}     // This one for testing
            onPress={() => console.log(history)}
          >
            {checkState(board, playerTurn)}
          </Text>
        </View>
      </View>
      <View style={Styles.body}>
        <Text
          style={[
            Styles.undo,
            { backgroundColor: turnCount > 1 ? "lightgreen" : "lightgray" },
          ]}
          onPress={undoTurn}
        >
          {"<"}
        </Text>

        <View
          style={[
            Styles.box,
            {
              height: 50,
              width: 150,
              borderRadius: 50,
              backgroundColor:
                turnCount > 1 || undoHistory.length >= 1
                  ? "lightgreen"
                  : "lightgray",
              marginHorizontal: 50,
            },
          ]}
        >
          <Text
            style={{ fontSize: 20, textAlign: "center" }}
            onPress={clearBoard}
          >
            New Game
          </Text>
        </View>

        <Text
          style={[
            Styles.undo,
            {
              backgroundColor:
                undoHistory.length >= 1 ? "lightgreen" : "lightgray",
            },
          ]}
          onPress={redoTurn}
        >
          {">"}
        </Text>

        <View style={[Styles.board, { margin: 100 }]}>
          {board.map((row, rowIndex) => (
            <View key={rowIndex} style={Styles.row}>
              {row.map((box, colIndex) => (
                <Pressable
                  key={colIndex}
                  style={[Styles.box,
                  {
                    backgroundColor: checkCellColor(rowIndex, colIndex, winningCells)
                      ? "yellow"
                      : "white",
                  },
                  ]}
                  onPress={() => placeTurn(colIndex, rowIndex)}
                >
                  <Text
                    style={[
                      Styles.text,
                      {
                        color:
                          board[rowIndex][colIndex] === "O" ? "black" : "red",
                      },
                    ]}
                  >
                    {box}
                  </Text>
                </Pressable>
              ))}
            </View>
          ))}
        </View>
      </View>

      <View style={[Styles.footer, { flexDirection: "row" }]}>
        <View
          style={[
            Styles.box,
            {
              height: 50,
              width: 70,
              borderRadius: 50,
              backgroundColor: "lightgreen",
            },
          ]}
        >
          <Text style={{ fontSize: 19 }} onPress={navToLoad}>
            Load
          </Text>
        </View>
        <View
          style={[
            Styles.box,
            {
              height: 50,
              width: 70,
              borderRadius: 50,
              backgroundColor: gameOver === 1 ? "lightgreen" : "lightgray",
              marginLeft: 20,
            },
          ]}
        >
          <Text
            style={{ fontSize: 19 }}
            onPress={gameOver === 1 ? saveAlert : null}
          >
            Save
          </Text>
        </View>
        <View
          style={[
            Styles.box,
            {
              height: 50,
              width: 70,
              borderRadius: 50,
              backgroundColor: "lightgreen",
              marginLeft: 20,
            },
          ]}
        >
          <Text style={{ fontSize: 19 }} onPress={navToRules}>
            Rules
          </Text>
        </View>
        <View
          style={[
            Styles.box,
            {
              height: 50,
              width: 70,
              borderRadius: 50,
              backgroundColor: "skyblue",
              marginLeft: 20,
            },
          ]}
        >
          <Text style={{ fontSize: 19 }} onPress={navToCredits}>
            Credits
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
};