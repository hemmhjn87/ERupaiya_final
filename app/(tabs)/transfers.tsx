import React from 'react';
import { StyleSheet, FlatList } from 'react-native';
import { View } from '../../components/Themed';
import { Text, Divider, List } from 'react-native-paper'; // Ensure List is correctly imported
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
            title={() => <Text style={styles.title}>{item.name}</Text>} // Ensuring proper title rendering
            description={() => <Text style={styles.description}>{item.date}</Text>}
            right={() => (
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
    backgroundColor: '#fff',
    padding: 10,
  },
  amountContainer: {
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
  amount: {
    fontWeight: 'bold',
    fontSize: 16,
    color: '#000',
  },
  type: {
    fontSize: 12,
    color: '#666',
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  description: {
    fontSize: 12,
    color: '#666',
  },
});
