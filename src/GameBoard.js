import React, { useEffect, useRef, useState } from "react";
import { Text, View, StyleSheet, Image, TouchableOpacity } from "react-native";
import { Card } from "./Card";

// const cardVals = [
//   ["A", "B", "C", "D"],
//   ["D", "E", "F", "G"],
//   ["A1", "B1", "C1", "D1"],
//   ["D1", "E1", "F1", "G1"],
// ];

export const GameBoard = ({ incrememntScore }) => {
  const [cards, setCards] = useState([
    [
      { name: "A", flipped: false, matched: false },
      { name: "B", flipped: false, matched: false },
      { name: "C", flipped: false, matched: false },
      { name: "D", flipped: false, matched: false },
    ],
    [
      { name: "E", flipped: false, matched: false },
      { name: "F", flipped: false, matched: false },
      { name: "G", flipped: false, matched: false },
      { name: "H", flipped: false, matched: false },
    ],
    [
      { name: "A", flipped: false, matched: false },
      { name: "B", flipped: false, matched: false },
      { name: "C", flipped: false, matched: false },
      { name: "D", flipped: false, matched: false },
    ],
    [
      { name: "E", flipped: false, matched: false },
      { name: "F", flipped: false, matched: false },
      { name: "G", flipped: false, matched: false },
      { name: "H", flipped: false, matched: false },
    ],
  ]);

  const cardRef = useRef(null);
  useEffect(() => {
    let copyOfCards = [...cards];
    let flatCards = copyOfCards.flat();
    let i = flatCards.length;
    while (--i) {
      var j = Math.floor(Math.random() * (i + 1));
      var tempi = flatCards[i];
      var tempj = flatCards[j];
      flatCards[i] = tempj;
      flatCards[j] = tempi;
    }
    let newCards = [];
    while (flatCards.length) newCards.push(flatCards.splice(0, 4));
    // copyOfCards = flatCards.reduce(
    //   (r, e, i) => (i % 4 ? r[r.length - 1].push(e) : r.push([e])) && r,
    //   []
    // );
    setCards(newCards);
  }, []);

  const handleFlip = (i, j) => {
    if (!cards[i][j].matched) {
      let copyOfCards = [...cards];
      if (cardRef.current === null) {
        cardRef.current = [i, j];
      } else {
        let ci = cardRef.current[0];
        let cj = cardRef.current[1];
        let storedCard = copyOfCards[ci][cj];
        if (
          storedCard.name === copyOfCards[i][j].name &&
          !copyOfCards[i][j].flipped
        ) {
          incrememntScore();
          storedCard.matched = true;
          copyOfCards[i][j].matched = true;
          cardRef.current = null;
        } else {
          let temp = cardRef.current;
          setTimeout(() => {
            handleMiss(i, j, ci, cj);
          }, 1000);
          cardRef.current = null;
        }
      }
      copyOfCards[i][j].flipped = !copyOfCards[i][j].flipped;
      setCards(copyOfCards);
    }
  };

  const handleMiss = (c1i, c1j, c2i, c2j) => {
    let copyOfCards = [...cards];
    let card1 = copyOfCards[c1i][c1j];
    let card2 = copyOfCards[c2i][c2j];
    card1.flipped = false;
    card2.flipped = false;
    setCards(copyOfCards);
  };
  return (
    <View style={styles.container}>
      {cards.map((row, i) => {
        return (
          <View key={i} style={styles.row}>
            {row.map((cardVal, j) => {
              return (
                <TouchableOpacity
                  key={j}
                  onPress={() => handleFlip(i, j)}
                  value={cardVal.name}
                >
                  <Card value={cardVal.name} isFlipped={cardVal.flipped} />
                </TouchableOpacity>
              );
            })}
          </View>
        );
      })}
    </View>
  );
};
//

//  </TouchableOpacity>

const styles = StyleSheet.create({
  cardText: {
    fontSize: 25,
    color: "purple",
    fontWeight: "bold",
  },
  container: {
    flex: 1,
    backgroundColor: "yellow",
    // flexDirection: "row",
    //flexWrap: "wrap",
  },
  row: {
    flex: 0.3,
    backgroundColor: "blue",
    flexDirection: "row",
    //flexWrap: "wrap",
  },
  card: {
    backgroundColor: "#7ca1b4",
    flex: 1,
    margin: 5,
    justifyContent: "center",
    width: 85,
    alignItems: "center",
  },
  cardBack: {
    flex: 1,
    width: 85,
  },
});
