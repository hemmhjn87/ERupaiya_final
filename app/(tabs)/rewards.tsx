import React from 'react';
import { StyleSheet, ScrollView } from 'react-native';
import { View } from '../../components/Themed';
import { Text, Card, Button } from 'react-native-paper';

export default function RewardsScreen() {
  return (
    <ScrollView style={styles.container}>
      <Card style={styles.balanceCard}>
        <Card.Content>
          <Text variant="titleMedium">Reward Points</Text>
          <Text variant="headlineLarge">2,500</Text>
        </Card.Content>
      </Card>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Available Rewards</Text>
        <Card style={styles.rewardCard}>
          <Card.Content>
            <Text variant="titleMedium">Cashback Offer</Text>
            <Text variant="bodyMedium">Get 10% cashback on your next transaction</Text>
          </Card.Content>
          <Card.Actions>
            <Button>Redeem</Button>
          </Card.Actions>
        </Card>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  balanceCard: {
    margin: 16,
  },
  section: {
    padding: 16,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  rewardCard: {
    marginBottom: 8,
  },
}); 