import React from "react";
import { View, Text, StyleSheet } from "react-native";

const UPITransfer = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>UPI Transfers</Text>
      <Text style={styles.text}>Send and receive money via UPI.</Text>
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
  text: {
    fontSize: 16,
  },
});

export default UPITransfer;
