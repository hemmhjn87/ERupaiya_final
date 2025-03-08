import React, { useState } from 'react';
import { StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { View } from '../../components/Themed';
import { Text, Avatar, List, Divider, Button, Dialog, Portal, TextInput } from 'react-native-paper';
import { router } from 'expo-router';
import { brandColors } from '../../constants/Colors';

export default function ProfileScreen() {
  const [name, setName] = useState('John Doe');
  const [email, setEmail] = useState('john.doe@example.com');
  const [editVisible, setEditVisible] = useState(false);
  const [newName, setNewName] = useState(name);
  const [newEmail, setNewEmail] = useState(email);

  const handleSignOut = () => {
    router.replace('/login'); // ✅ Fixed logout path
  };

  const handleEditProfile = () => {
    setEditVisible(true);
  };

  const handleSaveProfile = () => {
    setName(newName);
    setEmail(newEmail);
    setEditVisible(false);
  };

  return (
    <ScrollView style={styles.container}>
      {/* Profile Header */}
      <View style={styles.header}>
        <Avatar.Text size={80} label={name.charAt(0)} />
        <Text style={styles.name}>{name}</Text>
        <Text style={styles.email}>{email}</Text>
        <TouchableOpacity onPress={handleEditProfile} style={styles.editProfileButton}>
          <Text style={styles.editProfileText}>Edit Profile</Text>
        </TouchableOpacity>
      </View>

      {/* Profile Options */}
      <List.Section>
        <List.Item title="Personal Information" left={props => <List.Icon {...props} icon="account" />} />
        <Divider />
        <List.Item title="Security" left={props => <List.Icon {...props} icon="shield" />} />
        <Divider />
        <List.Item title="Notifications" left={props => <List.Icon {...props} icon="bell" />} />
        <Divider />
        <List.Item title="Help & Support" left={props => <List.Icon {...props} icon="help-circle" />} />
      </List.Section>

      {/* Sign Out Button */}
      <Button mode="outlined" onPress={handleSignOut} style={styles.signOutButton} textColor={brandColors.primary[500]}>
        Sign Out
      </Button>

      {/* Edit Profile Dialog */}
      <Portal>
        <Dialog visible={editVisible} onDismiss={() => setEditVisible(false)}>
          <Dialog.Title>Edit Profile</Dialog.Title>
          <Dialog.Content>
            <TextInput mode="outlined" label="Name" value={newName} onChangeText={setNewName} style={styles.input} />
            <TextInput mode="outlined" label="Email" value={newEmail} onChangeText={setNewEmail} style={styles.input} />
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={() => setEditVisible(false)}>Cancel</Button>
            <Button onPress={handleSaveProfile}>Save</Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
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
  editProfileButton: {
    marginTop: 10,
    padding: 6,
  },
  editProfileText: {
    color: brandColors.primary[500],
    fontSize: 16,
    fontWeight: '600',
  },
  signOutButton: {
    margin: 16,
    borderColor: brandColors.primary[500],
  },
  input: {
    marginBottom: 10,
  },
});
