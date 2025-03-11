import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Text, TextInput, Button, Card, Surface, IconButton, HelperText } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { brandColors } from '../../constants/Colors';

export default function BankTransfer() {
  const navigation = useNavigation();
  const [accountNumber, setAccountNumber] = useState('');
  const [confirmAccountNumber, setConfirmAccountNumber] = useState('');
  const [ifscCode, setIfscCode] = useState('');
  const [amount, setAmount] = useState('');
  const [name, setName] = useState('');

  const [errors, setErrors] = useState({
    accountNumber: '',
    confirmAccountNumber: '',
    ifscCode: '',
    amount: '',
    name: ''
  });

  const validateForm = () => {
    let valid = true;
    const newErrors = { accountNumber: '', confirmAccountNumber: '', ifscCode: '', amount: '', name: '' };

    if (!accountNumber || accountNumber.length < 9 || accountNumber.length > 18) {
      newErrors.accountNumber = 'Account number should be between 9-18 digits';
      valid = false;
    }
    if (accountNumber !== confirmAccountNumber) {
      newErrors.confirmAccountNumber = 'Account numbers do not match';
      valid = false;
    }
    if (!ifscCode || !/^[A-Z]{4}0[A-Z0-9]{6}$/.test(ifscCode)) {
      newErrors.ifscCode = 'Enter a valid IFSC code';
      valid = false;
    }
    if (!amount || parseFloat(amount) <= 0 || parseFloat(amount) > 100000) {
      newErrors.amount = 'Enter a valid amount (max ₹1,00,000)';
      valid = false;
    }
    if (!name) {
      newErrors.name = 'Beneficiary name is required';
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const handleTransfer = () => {
    if (validateForm()) {
      alert('Transfer initiated successfully!');
      navigation.goBack();
    }
  };

  const availableBalance = 12499;

  return (
    <ScrollView style={styles.container}>
      <Surface style={styles.header} elevation={4}>
        <View style={styles.headerTop}>
          <IconButton 
            icon="arrow-left" 
            iconColor="white" 
            size={24} 
            onPress={() => navigation.goBack()} 
          />
          <Text style={styles.headerTitle}>Bank Transfer</Text>
          <View style={{ width: 40 }} />
        </View>
      </Surface>

      <Card style={styles.balanceCard}>
        <Text style={styles.balanceLabel}>Available Balance</Text>
        <Text style={styles.balance}>₹{availableBalance.toLocaleString()}</Text>
      </Card>

      <Card style={styles.formCard}>
        <Card.Content>
          <TextInput
            mode="outlined"
            label="Account Number"
            value={accountNumber}
            onChangeText={setAccountNumber}
            keyboardType="number-pad"
            style={styles.input}
            outlineColor={brandColors.primary[200]}
            activeOutlineColor={brandColors.primary[500]}
            error={!!errors.accountNumber}
          />
          <HelperText type="error" visible={!!errors.accountNumber}>{errors.accountNumber}</HelperText>

          <TextInput
            mode="outlined"
            label="Confirm Account Number"
            value={confirmAccountNumber}
            onChangeText={setConfirmAccountNumber}
            keyboardType="number-pad"
            style={styles.input}
            outlineColor={brandColors.primary[200]}
            activeOutlineColor={brandColors.primary[500]}
            error={!!errors.confirmAccountNumber}
          />
          <HelperText type="error" visible={!!errors.confirmAccountNumber}>{errors.confirmAccountNumber}</HelperText>

          <TextInput
            mode="outlined"
            label="IFSC Code"
            value={ifscCode}
            onChangeText={text => setIfscCode(text.toUpperCase())}
            autoCapitalize="characters"
            style={styles.input}
            outlineColor={brandColors.primary[200]}
            activeOutlineColor={brandColors.primary[500]}
            error={!!errors.ifscCode}
          />
          <HelperText type="error" visible={!!errors.ifscCode}>{errors.ifscCode}</HelperText>

          <TextInput
            mode="outlined"
            label="Beneficiary Name"
            value={name}
            onChangeText={setName}
            style={styles.input}
            outlineColor={brandColors.primary[200]}
            activeOutlineColor={brandColors.primary[500]}
            error={!!errors.name}
          />
          <HelperText type="error" visible={!!errors.name}>{errors.name}</HelperText>

          <TextInput
            mode="outlined"
            label="Amount (₹)"
            value={amount}
            onChangeText={setAmount}
            keyboardType="number-pad"
            style={styles.input}
            outlineColor={brandColors.primary[200]}
            activeOutlineColor={brandColors.primary[500]}
            error={!!errors.amount}
            right={<TextInput.Affix text="₹" />}
          />
          <HelperText type="error" visible={!!errors.amount}>{errors.amount}</HelperText>
        </Card.Content>
      </Card>

      <View style={styles.buttonContainer}>
        <Button
          mode="contained"
          onPress={handleTransfer}
          style={styles.transferButton}
          contentStyle={styles.transferButtonContent}
        >
          Transfer Money
        </Button>
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
    padding: 16,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
  },
  headerTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerTitle: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },
  balanceCard: {
    margin: 16,
    marginTop: -16,
    padding: 16,
    borderRadius: 16,
    elevation: 4,
    backgroundColor: 'white',
  },
  balanceLabel: {
    fontSize: 14,
    color: brandColors.primary[700],
  },
  balance: {
    fontSize: 24,
    fontWeight: 'bold',
    color: brandColors.primary[900],
  },
  formCard: {
    margin: 16,
    borderRadius: 16,
    elevation: 4,
  },
  input: {
    marginBottom: 8,
    backgroundColor: 'white',
  },
  buttonContainer: {
    marginHorizontal: 16,
    marginVertical: 24,
  },
  transferButton: {
    backgroundColor: brandColors.primary[500],
    borderRadius: 8,
  },
  transferButtonContent: {
    paddingVertical: 8,
  },
});

