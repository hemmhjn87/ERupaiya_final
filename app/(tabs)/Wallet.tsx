import React, { useState, useMemo } from "react";
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  ScrollView, 
  Platform, 
  RefreshControl, 
  Animated 
} from "react-native";
import { IconButton, Surface, Card } from "react-native-paper";
import { router } from "expo-router";

const Wallet = () => {
  const [showBalance, setShowBalance] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [balance, setBalance] = useState(5000);
  const fadeAnim = useMemo(() => new Animated.Value(1), []);
  
  const recentTransactions = [
    { id: 1, name: "Coffee Shop", amount: -120, date: "Today, 9:30 AM", type: "debit" },
    { id: 2, name: "Salary", amount: 45000, date: "Mar 5, 10:00 AM", type: "credit" },
    { id: 3, name: "Electric Bill", amount: -1430, date: "Mar 3, 8:15 PM", type: "debit" },
    { id: 4, name: "Refund - Amazon", amount: 899, date: "Mar 2, 5:22 PM", type: "credit" },
  ];
  
  const actions = [
    { id: 1, name: "Scan & Pay", icon: "qrcode-scan" },
    { id: 2, name: "Send Money", icon: "send" },
    { id: 3, name: "Mobile Recharge", icon: "mobile-alt" },
    { id: 4, name: "Pay Bills", icon: "file-invoice" },
  ];

  const handleRefresh = () => {
    setRefreshing(true);
    setTimeout(() => {
      setBalance(prevBalance => prevBalance + Math.floor(Math.random() * 500));
      setRefreshing(false);
    }, 1200);
  };

  const handleBack = () => {
    router.back();
  };

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
      refreshControl={
        <RefreshControl 
          refreshing={refreshing} 
          onRefresh={handleRefresh}
          colors={["#5e17eb"]} 
          tintColor={"#5e17eb"}
        />
      }
      showsVerticalScrollIndicator={false}
    >
      {/* Header */}
      <Surface style={styles.header} elevation={4}>
        <View style={styles.headerTop}>
          <View style={styles.flexRow}>
            <IconButton 
              icon="arrow-left" 
              iconColor="white" 
              size={24} 
              onPress={handleBack}
            />
            <Text style={styles.appTitle}>Wallet</Text>
          </View>
          <IconButton icon="account-circle" iconColor="white" size={24} />
        </View>
        <Text style={styles.balanceLabel}>Available Balance</Text>
        
        <View style={styles.balanceRow}>
          <Animated.Text 
            style={[
              styles.balance, 
              { opacity: fadeAnim }
            ]}
          >
            {showBalance ? `₹${balance.toLocaleString()}` : "₹•••••"}
          </Animated.Text>
          <TouchableOpacity onPress={() => setShowBalance(!showBalance)}>
            <IconButton 
              icon={showBalance ? "eye" : "eye-off"} 
              iconColor="rgba(255,255,255,0.8)" 
              size={24} 
            />
          </TouchableOpacity>
        </View>

        <TouchableOpacity 
          style={styles.addMoneyButton}
          activeOpacity={0.8}
        >
          <Text style={styles.addMoneyText}>+ ADD MONEY</Text>
        </TouchableOpacity>
      </Surface>
      
      {/* Quick Actions */}
      <Card style={styles.quickActionsCard}>
        <View style={styles.quickActions}>
          {actions.map(action => (
            <TouchableOpacity 
              key={action.id} 
              style={styles.quickAction}
              activeOpacity={0.7}
            >
              <Surface style={styles.iconContainer} elevation={2}>
                <IconButton
                  icon={action.icon}
                  size={24}
                  mode="contained"
                  containerColor="#f0e7ff"
                  iconColor="#5e17eb"
                />
              </Surface>
              <Text style={styles.quickActionLabel}>{action.name}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </Card>
      
      {/* Transactions */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Recent Transactions</Text>
          <TouchableOpacity>
            <Text style={styles.viewAllText}>View All</Text>
          </TouchableOpacity>
        </View>
        
        <View style={styles.transactionsList}>
          {recentTransactions.map(transaction => (
            <Card key={transaction.id} style={styles.transactionCard}>
              <View style={styles.transactionRow}>
                <View style={styles.transactionIconContainer}>
                  <IconButton
                    icon={transaction.type === "credit" ? "arrow-down" : "arrow-up"}
                    size={24}
                    mode="contained"
                    containerColor="#f9f9f9"
                    iconColor={transaction.type === "credit" ? "#00a651" : "#ff4757"}
                  />
                </View>
                <View style={styles.transactionDetails}>
                  <Text style={styles.transactionName}>{transaction.name}</Text>
                  <Text style={styles.transactionType}>{transaction.date}</Text>
                </View>
                <Text 
                  style={[
                    styles.transactionAmount, 
                    transaction.type === "credit" ? styles.creditAmount : styles.debitAmount
                  ]}
                >
                  {transaction.type === "credit" ? "+" : "-"}₹{Math.abs(transaction.amount).toLocaleString()}
                </Text>
              </View>
            </Card>
          ))}
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  contentContainer: {
    paddingBottom: 24,
  },
  header: {
    backgroundColor: "#5e17eb",
    padding: 20,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
    ...Platform.select({
      ios: {
        shadowColor: "#000",
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
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  flexRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  appTitle: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
  },
  balance: {
    color: "white",
    fontSize: 36,
    fontWeight: "bold",
  },
  balanceLabel: {
    color: "rgba(255,255,255,0.8)",
    fontSize: 16,
    marginBottom: 4,
  },
  balanceRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  addMoneyButton: {
    backgroundColor: "rgba(255,255,255,0.2)",
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 20,
    alignSelf: "flex-start",
    marginTop: 16,
    alignItems: "center",
  },
  addMoneyText: {
    color: "white",
    fontWeight: "600",
  },
  quickActionsCard: {
    margin: 16,
    marginTop: -20,
    borderRadius: 16,
    ...Platform.select({
      ios: {
        shadowColor: "#000",
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
    flexDirection: "row",
    flexWrap: "wrap",
    padding: 16,
  },
  quickAction: {
    width: "25%",
    alignItems: "center",
    marginBottom: 16,
  },
  iconContainer: {
    borderRadius: 12,
    marginBottom: 8,
    ...Platform.select({
      ios: {
        shadowColor: "#5e17eb",
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
    textAlign: "center",
    color: "#333",
    fontWeight: "500",
  },
  section: {
    padding: 16,
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
  },
  viewAllText: {
    color: "#5e17eb",
    fontWeight: "600",
  },
  transactionsList: {
    flex: 1,
  },
  transactionCard: {
    marginBottom: 8,
    borderRadius: 12,
    ...Platform.select({
      ios: {
        shadowColor: "#000",
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
    flexDirection: "row",
    alignItems: "center",
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
    fontWeight: "600",
    color: "#333",
  },
  transactionType: {
    fontSize: 12,
    color: "#888",
  },
  transactionAmount: {
    fontSize: 16,
    fontWeight: "700",
  },
  creditAmount: {
    color: "#00a651",
  },
  debitAmount: {
    color: "#ff4757",
  },
});

export default Wallet;