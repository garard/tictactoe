import { Text, View, ScrollView, Pressable, FlatList } from 'react-native';
import Styles from '../components/Styles'
import React, { useState, useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useGameLogic } from "../datamodel/game";
import { loadData, saveData } from "../datamodel/mydata";

export default LoadGame = function ({ navigation }) {
    const navToHome = () => navigation.navigate('Home')



    const {
        playerTurn,
        turnCount,
        undoHistory,
        board,
        gameOver,
        winningCells,
        checkCellColor,
        setBoard,

        checkState,
        clearBoard,
        loadedHistory,
        setLoadedHistory,
        saveAlert,
        placeTurn,
        setHistory,
        history,
        savedGames,
        setSavedGames,
        undoTurn,
        redoTurn,
    } = useGameLogic();

    const gameDelete = (index) => {
        const games = [...savedGamesArray];
        games.splice(index, 1);
        setSavedGames(games);
    };

    const gameLoad = (index) => {
        const loadedGame = savedGamesArray[index];
        const loadedHistory = loadedGame.history;
        clearBoard();
        setHistory(loadedHistory);
        loadedHistory.forEach(([colIndex, rowIndex]) => {
            placeTurn(colIndex, rowIndex);
        });
        navToHome();
    };

    const replayHistory = (loadedHistory) => {
        loadedHistory.forEach(([colIndex, rowIndex]) => {
            placeTurn(colIndex, rowIndex);
        });
    };

    useEffect(() => {
        const firstLoad = async () => {
            const myData = await loadData();
            console.log("Save triggered:", JSON.stringify(myData));
            if (Object.keys(myData).length > 0) {
                setSavedGames(myData);
            }
        };
        firstLoad();
    }, []);

    useEffect(() => {
        saveData(savedGames);
    }, [savedGames]);

    const savedGamesArray = Object.values(savedGames);

    const renderItem = ({ item, index }) => {
        const { id, time, date, result, turnsTaken } = item;
        return (
            <View style={Styles.loadGame}>

                <View style={Styles.loadGameHeader}>
                    <Text style={Styles.loadGameText}>
                        {index}
                    </Text>
                    <Text style={Styles.loadGameText}>
                        Result: {result}
                    </Text>

                    <Text style={Styles.loadGameText}>
                        Steps: {turnsTaken}
                    </Text>
                    <Text style={Styles.loadGameText}>
                        ID: {id}
                    </Text>

                </View>



                <View style={Styles.loadGameBody}>

                    <Text style={Styles.loadGameText}>
                        Date: {date}
                    </Text>

                    <Text style={Styles.loadGameText}>
                        Time: {time}
                    </Text>

                </View>

                <View style={Styles.loadGameFooter}>
                    <Pressable onPress={() => gameLoad(index)} >
                        <Text style={Styles.loadGameButton}>
                            Load
                        </Text>
                    </Pressable>

                    <Pressable onPress={() => gameDelete(index)}>
                        <Text style={Styles.loadGameButton}>
                            Delete
                        </Text>

                    </Pressable>
                </View>
            </View >
        );
    };

    return (
        <SafeAreaView style={Styles.container}>

            <View style={Styles.header}>
                <Text style={{ fontSize: 20, textAlign: "center" }}>
                    Load Game
                </Text>

            </View>


            <View style={Styles.body}>

                <FlatList
                    data={savedGamesArray}
                    renderItem={renderItem}
                    keyExtractor={item => item.id.toString()} // Assuming id is a number
                />


            </View>




            <View style={Styles.footer}>
                <Pressable
                    style={[Styles.box, { height: 40, width: 100, borderRadius: 15 }]}
                    onPress={navToHome}
                >
                    <Text style={{ fontSize: 20, textAlign: "center" }} onPress={navToHome}>
                        Back
                    </Text>
                </Pressable>
            </View>

        </SafeAreaView>
    );
}


