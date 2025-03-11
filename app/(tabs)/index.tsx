import React, { useEffect, useState, useCallback, useMemo } from 'react';
import { View, ScrollView, StyleSheet, TouchableOpacity, RefreshControl, Animated, Platform } from 'react-native';
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

// Define allowed routes using `as const`
const QUICK_ACTIONS = [
  { icon: 'wallet', label: "To Wallet", screen: '/Wallet' },
  { icon: 'bank', label: "To Account", screen: '/BankTransfer' },
  { icon: 'send', label: "To UPI ID", screen: '/UPITransfer' },
  { icon: 'account-group', label: "To Contact", screen: '/Transfers' }
] as const;

const TRANSFER_OPTIONS = [
  { icon: 'credit-card', label: "Cards", description: "Add & manage cards", screen: '/Cards' },
  { icon: 'bank', label: "Bank Transfer", description: "Transfer to bank account", screen: '/BankTransfer' },
  { icon: 'wallet', label: "Wallet", description: "Transfer to wallet", screen: '/Wallet' },
  { icon: 'send', label: "UPI Transfer", description: "Pay using UPI ID", screen: '/UPITransfer' }
] as const;

export default function HomeScreen() {
  const [balance, setBalance] = useState(12499);
  const [refreshing, setRefreshing] = useState(false);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const fadeAnim = useMemo(() => new Animated.Value(0), []);

  // Simulate fetching transactions from an API
  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 800, // Slightly faster animation
      useNativeDriver: true,
    }).start();

    const fetchTransactions = setTimeout(() => {
      setTransactions([
        { id: '1', name: "John Doe", amount: "₹500", type: "UPI Transfer", date: "Today" },
        { id: '2', name: "Wallet Topup", amount: "₹2,000", type: "Card Payment", date: "Yesterday" },
        { id: '3', name: "Electric Bill", amount: "₹1,200", type: "UPI Payment", date: "Yesterday" },
      ]);
    }, 1500); // Faster loading for better UX

    return () => clearTimeout(fetchTransactions);
  }, []);

  // Handle balance refresh with useCallback for better performance
  const handleRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setBalance(prevBalance => prevBalance + Math.floor(Math.random() * 500));
      setRefreshing(false);
    }, 1200); // Slightly faster refresh
  }, []);

  // Handle navigation with useCallback
  const handleNavigation = useCallback((screen: string) => {
    router.push(screen as any);
  }, []);

  // Handle add money action that uses Wallet route instead
  const handleAddMoney = useCallback(() => {
    // Use an existing route that's already defined in the types
    router.push('/Wallet' as any);
  }, []);

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
      refreshControl={
        <RefreshControl 
          refreshing={refreshing} 
          onRefresh={handleRefresh}
          colors={[brandColors.primary[500]]} 
          tintColor={brandColors.primary[500]}
        />
      }
      showsVerticalScrollIndicator={false}
    >
      {/* Header with Balance */}
      <Surface style={styles.header} elevation={4}>
        <View style={styles.headerTop}>
          <View style={styles.flexRow}>
            <IconButton icon="menu" iconColor="white" size={24} />
            <Text style={styles.appTitle}>₹ERupaiya</Text>
          </View>
          <IconButton icon="bell" iconColor="white" size={24} />
        </View>
        <Text style={styles.balanceLabel}>Available Balance</Text>
        
        <Animated.Text 
          style={[
            styles.balance, 
            { opacity: fadeAnim },
            { transform: [{ translateY: fadeAnim.interpolate({
              inputRange: [0, 1],
              outputRange: [10, 0]
            })}] 
          }]}
        >
          ₹{balance.toLocaleString()}
        </Animated.Text>

        <TouchableOpacity 
          style={styles.addMoneyButton}
          onPress={handleAddMoney}
          activeOpacity={0.8}
        >
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
              onPress={() => handleNavigation(action.screen)}
              activeOpacity={0.7}
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
            onPress={() => handleNavigation(option.screen)}
            mode="elevated"
          >
            <Card.Title
              title={option.label}
              titleStyle={styles.cardTitle}
              subtitle={option.description}
              subtitleStyle={styles.cardSubtitle}
              left={props => (
                <IconButton
                  {...props}
                  icon={option.icon}
                  mode="contained"
                  containerColor={brandColors.primary[50]}
                  iconColor={brandColors.primary[500]}
                />
              )}
              right={props => (
                <IconButton 
                  {...props} 
                  icon="chevron-right" 
                  iconColor={brandColors.primary[300]}
                />
              )}
            />
          </Card>
        ))}
      </View>

      {/* Recent Transactions Section */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Recent Transactions</Text>
          <TouchableOpacity onPress={() => handleNavigation('/Transactions' as any)}>
            <Text style={styles.viewAllText}>View All</Text>
          </TouchableOpacity>
        </View>
        
        {transactions.length > 0 ? (
          transactions.map((transaction) => (
            <Card key={transaction.id} style={styles.transactionCard}>
              <View style={styles.transactionRow}>
                <View style={styles.transactionIconContainer}>
                  <IconButton
                    icon={transaction.type.includes('UPI') ? 'bank-transfer' : 'credit-card'}
                    size={24}
                    mode="contained"
                    containerColor={brandColors.primary[50]}
                    iconColor={brandColors.primary[500]}
                  />
                </View>
                <View style={styles.transactionDetails}>
                  <Text style={styles.transactionName}>{transaction.name}</Text>
                  <Text style={styles.transactionType}>{transaction.type} • {transaction.date}</Text>
                </View>
                <Text style={styles.transactionAmount}>{transaction.amount}</Text>
              </View>
            </Card>
          ))
        ) : (
          <Animated.View style={{ opacity: fadeAnim }}>
            <Card style={styles.loadingCard}>
              <Card.Content style={styles.loadingContent}>
                <Text style={styles.loadingText}>Loading transactions...</Text>
              </Card.Content>
            </Card>
          </Animated.View>
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
  contentContainer: {
    paddingBottom: 24,
  },
  header: {
    backgroundColor: brandColors.primary[500],
    padding: 20,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 8,
      },
      android: {
        elevation: 8,
      },
    }),
  },
  headerTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  flexRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  appTitle: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },
  balance: {
    color: 'white',
    fontSize: 36,
    fontWeight: 'bold',
  },
  balanceLabel: {
    color: 'rgba(255,255,255,0.8)',
    fontSize: 16,
    marginBottom: 4,
  },
  addMoneyButton: {
    backgroundColor: 'rgba(255,255,255,0.2)',
    paddingVertical: 8,
    paddingHorizontal: 16,
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
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
      },
      android: {
        elevation: 4,
      },
    }),
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
    ...Platform.select({
      ios: {
        shadowColor: brandColors.primary[300],
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.2,
        shadowRadius: 2,
      },
      android: {
        elevation: 2,
      },
    }),
  },
  quickActionLabel: {
    fontSize: 12,
    textAlign: 'center',
    color: brandColors.primary[700],
    fontWeight: '500',
  },
  section: {
    padding: 16,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: brandColors.primary[900],
  },
  viewAllText: {
    color: brandColors.primary[500],
    fontWeight: '600',
  },
  transferCard: {
    marginBottom: 12,
    borderRadius: 12,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
      },
      android: {
        elevation: 2,
      },
    }),
  },
  cardTitle: {
    color: brandColors.primary[800],
    fontWeight: '600',
  },
  cardSubtitle: {
    color: brandColors.primary[500],
  },
  transactionCard: {
    marginBottom: 8,
    borderRadius: 12,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
      },
      android: {
        elevation: 1,
      },
    }),
  },
  transactionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
  },
  transactionIconContainer: {
    marginRight: 12,
  },
  transactionDetails: {
    flex: 1,
  },
  transactionName: {
    fontSize: 16,
    fontWeight: '600',
    color: brandColors.primary[900],
  },
  transactionType: {
    fontSize: 12,
    color: brandColors.primary[400],
  },
  transactionAmount: {
    fontSize: 16,
    fontWeight: '700',
    color: brandColors.primary[800],
  },
  loadingCard: {
    borderRadius: 12,
    marginVertical: 8,
  },
  loadingContent: {
    alignItems: 'center',
    paddingVertical: 24,
  },
  loadingText: {
    color: brandColors.primary[400],
  },
});