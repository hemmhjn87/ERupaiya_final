import React from 'react';
import { StyleSheet, ScrollView } from 'react-native';
import { View } from '../../components/Themed';
import { Text, Avatar, List, Divider, Button } from 'react-native-paper';
import { router } from 'expo-router';
import { brandColors } from '../../constants/Colors';

export default function ProfileScreen() {
  const handleSignOut = () => {
    router.replace('/login');
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Avatar.Text size={80} label="JD" />
        <Text style={styles.name}>John Doe</Text>
        <Text style={styles.email}>john.doe@example.com</Text>
      </View>

      <List.Section>
        <List.Item
          title="Personal Information"
          left={props => <List.Icon {...props} icon="account" />}
          right={props => <List.Icon {...props} icon="chevron-right" />}
        />
        <Divider />
        <List.Item
          title="Security"
          left={props => <List.Icon {...props} icon="shield" />}
          right={props => <List.Icon {...props} icon="chevron-right" />}
        />
        <Divider />
        <List.Item
          title="Notifications"
          left={props => <List.Icon {...props} icon="bell" />}
          right={props => <List.Icon {...props} icon="chevron-right" />}
        />
        <Divider />
        <List.Item
          title="Help & Support"
          left={props => <List.Icon {...props} icon="help-circle" />}
          right={props => <List.Icon {...props} icon="chevron-right" />}
        />
      </List.Section>

      <Button 
        mode="outlined" 
        onPress={handleSignOut}
        style={styles.signOutButton}
        textColor={brandColors.primary[500]}
      >
        Sign Out
      </Button>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    alignItems: 'center',
    padding: 20,
    backgroundColor: 'white',
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 10,
  },
  email: {
    fontSize: 16,
    color: '#666',
    marginTop: 5,
  },
  signOutButton: {
    margin: 16,
    borderColor: brandColors.primary[500],
  },
}); 