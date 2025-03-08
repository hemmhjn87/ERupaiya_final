import React, { useEffect, useState } from 'react';
import { View, ScrollView, StyleSheet, TouchableOpacity, RefreshControl, Animated } from 'react-native';
import { Text, Card, IconButton, Surface } from 'react-native-paper';
import { router } from 'expo-router';
import { brandColors } from '../../constants/Colors';

// Define Transaction type
type Transaction = {
  id: string;
  name: string;
  amount: string;
  type: string;
  date: string;
};

const QUICK_ACTIONS = [
  { icon: 'wallet', label: "To Wallet", screen: 'Wallet' },
  { icon: 'bank', label: "To Account", screen: 'BankTransfer' },
  { icon: 'send', label: "To UPI ID", screen: 'UPITransfer' },
  { icon: 'account-group', label: "To Contact", screen: 'Transfers' }
];

const TRANSFER_OPTIONS = [
  { icon: 'credit-card', label: "Cards", description: "Add & manage cards", screen: 'Cards' },
  { icon: 'bank', label: "Bank Transfer", description: "Transfer to bank account", screen: 'BankTransfer' },
  { icon: 'wallet', label: "Wallet", description: "Transfer to wallet", screen: 'Wallet' },
  { icon: 'send', label: "UPI Transfer", description: "Pay using UPI ID", screen: 'UPITransfer' }
];

export default function HomeScreen() {
  const [balance, setBalance] = useState(12499);
  const [refreshing, setRefreshing] = useState(false);
  const [transactions, setTransactions] = useState<Transaction[]>([]); // ✅ TypeScript Fix
  const fadeAnim = new Animated.Value(0);

  // Simulate fetching transactions from an API
  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();

    setTimeout(() => {
      setTransactions([
        { id: '1', name: "John Doe", amount: "₹500", type: "UPI Transfer", date: "Today" },
        { id: '2', name: "Wallet Topup", amount: "₹2,000", type: "Card Payment", date: "Yesterday" },
        { id: '3', name: "Electric Bill", amount: "₹1,200", type: "UPI Payment", date: "Yesterday" },
      ]);
    }, 2000);
  }, []);

  // Handle balance refresh
  const handleRefresh = () => {
    setRefreshing(true);
    setTimeout(() => {
      setBalance(balance + Math.floor(Math.random() * 500));
      setRefreshing(false);
    }, 1500);
  };

  return (
    <ScrollView
      style={styles.container}
      refreshControl={<RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />}
    >
      {/* Header with Balance */}
      <Surface style={styles.header} elevation={4}>
        <View style={styles.headerTop}>
          <IconButton icon="bell" iconColor="white" size={24} />
        </View>
        <Text style={styles.balanceLabel}>Available Balance</Text>
        
        <Animated.Text style={[styles.balance, { opacity: fadeAnim }]}>
          ₹{balance.toLocaleString()}
        </Animated.Text>

        <TouchableOpacity style={styles.addMoneyButton}>
          <Text style={styles.addMoneyText}>+ Add Money</Text>
        </TouchableOpacity>
      </Surface>

      {/* Quick Actions */}
      <Card style={styles.quickActionsCard}>
        <View style={styles.quickActions}>
          {QUICK_ACTIONS.map((action, index) => (
            <TouchableOpacity 
              key={index} 
              style={styles.quickAction} 
              onPress={() => router.push(`/${action.screen}`)}
            >
              <Surface style={styles.iconContainer} elevation={2}>
                <IconButton
                  icon={action.icon}
                  size={24}
                  mode="contained"
                  containerColor={brandColors.primary[50]}
                  iconColor={brandColors.primary[500]}
                />
              </Surface>
              <Text style={styles.quickActionLabel}>{action.label}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </Card>

      {/* Transfer Options */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Transfer Money</Text>
        {TRANSFER_OPTIONS.map((option, index) => (
          <Card 
            key={index} 
            style={styles.transferCard} 
            onPress={() => router.push(`/${option.screen}`)}
          >
            <Card.Title
              title={option.label}
              subtitle={option.description}
              left={props => (
                <IconButton
                  {...props}
                  icon={option.icon}
                  mode="contained"
                  containerColor={brandColors.primary[50]}
                  iconColor={brandColors.primary[500]}
                />
              )}
              right={props => <IconButton {...props} icon="chevron-right" />}
            />
          </Card>
        ))}
      </View>

      {/* Recent Transactions */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Recent Transactions</Text>
        {transactions.length === 0 ? (
          <Text style={styles.loadingText}>Loading transactions...</Text>
        ) : (
          transactions.map((tx) => (
            <Card key={tx.id} style={styles.transferCard}>
              <Card.Title
                title={tx.name}
                subtitle={tx.date}
                right={() => (
                  <View style={styles.amountContainer}>
                    <Text style={styles.amount}>{tx.amount}</Text>
                    <Text style={styles.type}>{tx.type}</Text>
                  </View>
                )}
              />
            </Card>
          ))
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    backgroundColor: brandColors.primary[500],
    padding: 20,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
  },
  headerTop: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginBottom: 20,
  },
  balance: {
    color: 'white',
    fontSize: 32,
    fontWeight: 'bold',
  },
  balanceLabel: {
    color: 'rgba(255,255,255,0.8)',
    fontSize: 16,
  },
  addMoneyButton: {
    backgroundColor: 'rgba(255,255,255,0.2)',
    padding: 8,
    borderRadius: 20,
    alignSelf: 'flex-start',
    marginTop: 16,
  },
  addMoneyText: {
    color: 'white',
    fontWeight: '600',
  },
  quickActionsCard: {
    margin: 16,
    marginTop: -20,
    borderRadius: 16,
    elevation: 4,
  },
  quickActions: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: 16,
  },
  quickAction: {
    width: '25%',
    alignItems: 'center',
    marginBottom: 16,
  },
  iconContainer: {
    borderRadius: 12,
    marginBottom: 8,
  },
  quickActionLabel: {
    fontSize: 12,
    textAlign: 'center',
    color: brandColors.primary[700],
  },
  section: {
    padding: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
    color: brandColors.primary[900],
  },
  transferCard: {
    marginBottom: 12,
    borderRadius: 12,
    elevation: 2,
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
  loadingText: {
    textAlign: 'center',
    fontSize: 16,
    marginTop: 20,
  },
});
