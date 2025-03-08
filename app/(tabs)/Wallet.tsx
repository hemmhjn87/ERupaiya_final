import React from "react";
import { View, Text, StyleSheet } from "react-native";

const Wallet = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Wallet</Text>
      <Text style={styles.balance}>Balance: ₹5,000</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f8f9fa",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
  balance: {
    fontSize: 18,
    color: "green",
  },
});

export default Wallet;
