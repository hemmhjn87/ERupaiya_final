import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, Avatar, IconButton } from 'react-native-paper';
import { brandColors } from '@/constants/Colors';

export default function Header() {
  return (
    <View style={styles.header}>
      <View style={styles.topRow}>
        <View style={styles.userInfo}>
          <Avatar.Text size={40} label="JD" style={styles.avatar} />
          <Text style={styles.userName}>John Doe</Text>
        </View>
        <View style={styles.actions}>
          <IconButton icon="magnify" iconColor="white" />
          <IconButton icon="qr-code" iconColor="white" />
        </View>
      </View>
      
      <View style={styles.balanceRow}>
        <View>
          <Text style={styles.balanceLabel}>Your Balance</Text>
          <Text style={styles.balanceAmount}>₹12,499</Text>
        </View>
        <IconButton
          icon="plus"
          mode="contained"
          containerColor="white"
          iconColor="#6200ee"
          onPress={() => {}}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: brandColors.primary[500],
    padding: 16,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
  },
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    backgroundColor: 'white',
  },
  userName: {
    color: 'white',
    marginLeft: 8,
    fontWeight: '600',
  },
  actions: {
    flexDirection: 'row',
  },
  balanceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  balanceLabel: {
    color: 'rgba(255,255,255,0.8)',
    fontSize: 14,
  },
  balanceAmount: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
  },
}); 