import React, { useEffect, useState } from 'react';
import { StyleSheet, FlatList } from 'react-native';
import { View } from '../../components/Themed';
import { Text, Divider, List } from 'react-native-paper';

// ✅ Define the Transaction type explicitly
type Transaction = {
  id: string;
  name: string;
  amount: string;
  type: string;
  date: string;
};

export default function TransfersScreen() {
  const [transactions, setTransactions] = useState<Transaction[]>([]); // ✅ Fixed Type

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setTransactions([
        { id: '1', name: "John Doe", amount: "₹500", type: "UPI Transfer", date: "Today" },
        { id: '2', name: "Wallet Topup", amount: "₹2,000", type: "Card Payment", date: "Yesterday" },
        { id: '3', name: "Electric Bill", amount: "₹1,200", type: "UPI Payment", date: "Yesterday" },
      ]);
    }, 2000);
  }, []);

  return (
    <View style={styles.container}>
      <FlatList
        data={transactions}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <List.Item
            title={item.name}
            description={item.date}
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
});

