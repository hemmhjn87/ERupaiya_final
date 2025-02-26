import React from 'react';
import { StyleSheet, FlatList } from 'react-native';
import { View } from '../../components/Themed';
import { Text, List, Divider } from 'react-native-paper';
import { Transaction } from '../../src/types';

const RECENT_TRANSACTIONS: Transaction[] = [
  { id: '1', name: "John Doe", amount: "₹500", type: "UPI Transfer", date: "Today" },
  { id: '2', name: "Wallet Topup", amount: "₹2,000", type: "Card Payment", date: "Yesterday" },
  { id: '3', name: "Electric Bill", amount: "₹1,200", type: "UPI Payment", date: "Yesterday" },
];

export default function TransfersScreen() {
  return (
    <View style={styles.container}>
      <FlatList
        data={RECENT_TRANSACTIONS}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <List.Item
            title={item.name}
            description={item.date}
            right={props => (
              <View style={styles.amountContainer}>
                <Text style={styles.amount}>{item.amount}</Text>
                <Text style={styles.type}>{item.type}</Text>
              </View>
            )}
          />
        )}
        ItemSeparatorComponent={Divider}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  amountContainer: {
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
  amount: {
    fontWeight: 'bold',
  },
  type: {
    fontSize: 12,
    color: '#666',
  },
});
