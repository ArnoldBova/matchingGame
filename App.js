import React, { useState } from "react";
import { Text, View, StyleSheet } from "react-native";
import Constants from "expo-constants";
import { GameBoard } from "./src/GameBoard";

export default function App() {
  const [score, setScore] = useState(0);

  const incrememntScore = () => {
    setScore(score + 1);
  };
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Match Game</Text>
      <View style={styles.gameBoard}>
        <GameBoard incrememntScore={incrememntScore} />
      </View>
      <View style={styles.score}>
        <Text>{score}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight,
    flex: 1,
    backgroundColor: "green",
  },
  gameBoard: {
    flex: 0.8,
    backgroundColor: "blue",
    margin: 5,
  },
  row: {
    flex: 1,
    margin: 5,
    flexDirection: "row",
  },
  card: {
    backgroundColor: "#7ca1b4",
    flex: 1,
    marginRight: 5,
    marginLeft: 5,
    justifyContent: "center",
    alignItems: "center",
  },
  cardBack: {
    flex: 1,
    width: 80,
    marginLeft: 5,
    marginRight: 5,
  },
  cardText: {
    fontSize: 25,
    color: "purple",
    fontWeight: "bold",
  },
  title: {
    backgroundColor: "purple",
    flex: 0.07,
    marginRight: 5,
    marginLeft: 5,
    fontSize: 25,
    color: "white",
    textAlign: "center",
    paddingTop: 15,
  },
  score: {
    backgroundColor: "white",
    flex: 0.07,
    marginRight: 5,
    marginLeft: 5,
    fontSize: 20,
    color: "white",
    textAlign: "center",
    paddingTop: 15,
  },
});
