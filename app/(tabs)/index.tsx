import React from 'react';
import { View, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { Text, Card, IconButton, Surface } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { brandColors } from '../../constants/Colors';
import { QuickAction, TransferOption } from '../../src/types';

const QUICK_ACTIONS: QuickAction[] = [
  { icon: 'wallet', label: "To Wallet" },
  { icon: 'bank', label: "To Account" },
  { icon: 'send', label: "To UPI ID" },
  { icon: 'account-group', label: "To Contact" }
];

const TRANSFER_OPTIONS: TransferOption[] = [
  { icon: 'credit-card', label: "Cards", description: "Add & manage cards" },
  { icon: 'bank', label: "Bank Transfer", description: "Transfer to bank account" },
  { icon: 'wallet', label: "Wallet", description: "Transfer to wallet" },
  { icon: 'send', label: "UPI Transfer", description: "Pay using UPI ID" }
];

export default function HomeScreen() {
  const navigation = useNavigation();

  return (
    <ScrollView style={styles.container}>
      {/* Header with Balance */}
      <Surface style={styles.header} elevation={4}>
        <View style={styles.headerTop}>
          <IconButton icon="bell" iconColor="white" size={24} />
        </View>
        <Text style={styles.balanceLabel}>Available Balance</Text>
        <Text style={styles.balance}>₹12,499</Text>
        <TouchableOpacity style={styles.addMoneyButton}>
          <Text style={styles.addMoneyText}>+ Add Money</Text>
        </TouchableOpacity>
      </Surface>

      {/* Quick Actions */}
      <Card style={styles.quickActionsCard}>
        <View style={styles.quickActions}>
          {QUICK_ACTIONS.map((action, index) => (
            <TouchableOpacity key={index} style={styles.quickAction}>
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
          <Card key={index} style={styles.transferCard} onPress={() => navigation.navigate(option.label)}>
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
});
