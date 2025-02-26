import React, { useState } from 'react';
import { StyleSheet, View, ScrollView, TouchableOpacity, Platform } from 'react-native';
import { Text, TextInput, Button, Surface, HelperText, IconButton } from 'react-native-paper';
import { router } from 'expo-router';
import { brandColors } from '../constants/Colors';

export default function RegisterScreen() {
  const [formData, setFormData] = useState({
    fullName: '',
    mobile: '',
    email: '',
    dob: '',  // Changed to string
    panNumber: '',
    aadharNumber: '',
    address: '',
    pincode: '',
    password: '',
    confirmPassword: '',
  });
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = () => {
    // Validate form
    if (!validateForm()) return;
    
    // Navigate to verification screen or login
    router.replace('/login');
  };

  const validateForm = () => {
    // Basic validation
    if (formData.fullName.length < 3) {
      alert('Please enter valid full name');
      return false;
    }
    if (formData.mobile.length !== 10) {
      alert('Please enter valid mobile number');
      return false;
    }
    if (!formData.email.includes('@')) {
      alert('Please enter valid email');
      return false;
    }
    if (formData.panNumber.length !== 10) {
      alert('Please enter valid PAN number');
      return false;
    }
    if (formData.aadharNumber.length !== 12) {
      alert('Please enter valid Aadhar number');
      return false;
    }
    if (formData.password !== formData.confirmPassword) {
      alert('Passwords do not match');
      return false;
    }
    return true;
  };

  // Remove DateTimePicker temporarily
  const handleDatePress = () => {
    // We'll implement a proper date picker later
    alert('Date picker will be implemented');
  };

  return (
    <ScrollView style={styles.container}>
      <Surface style={styles.formContainer} elevation={4}>
        <Text style={styles.title}>Create Account</Text>
        <Text style={styles.subtitle}>Please fill in your details</Text>

        {/* Personal Details */}
        <Text style={styles.sectionTitle}>Personal Details</Text>
        
        <TextInput
          mode="outlined"
          label="Full Name (as per PAN)"
          value={formData.fullName}
          onChangeText={(text) => setFormData({...formData, fullName: text})}
          style={styles.input}
        />

        <TextInput
          mode="outlined"
          label="Mobile Number"
          value={formData.mobile}
          onChangeText={(text) => setFormData({...formData, mobile: text})}
          keyboardType="phone-pad"
          maxLength={10}
          style={styles.input}
          left={<TextInput.Affix text="+91" />}
        />

        <TextInput
          mode="outlined"
          label="Email Address"
          value={formData.email}
          onChangeText={(text) => setFormData({...formData, email: text})}
          keyboardType="email-address"
          style={styles.input}
        />

        <TouchableOpacity onPress={handleDatePress}>
          <TextInput
            mode="outlined"
            label="Date of Birth"
            value={formData.dob}
            editable={false}
            style={styles.input}
            right={<TextInput.Icon icon="calendar" />}
          />
        </TouchableOpacity>

        {/* KYC Details */}
        <Text style={styles.sectionTitle}>KYC Details</Text>

        <TextInput
          mode="outlined"
          label="PAN Number"
          value={formData.panNumber}
          onChangeText={(text) => setFormData({...formData, panNumber: text.toUpperCase()})}
          maxLength={10}
          style={styles.input}
          autoCapitalize="characters"
        />
        <HelperText type="info">Format: ABCDE1234F</HelperText>

        <TextInput
          mode="outlined"
          label="Aadhar Number"
          value={formData.aadharNumber}
          onChangeText={(text) => setFormData({...formData, aadharNumber: text})}
          keyboardType="numeric"
          maxLength={12}
          style={styles.input}
        />

        {/* Address Details */}
        <Text style={styles.sectionTitle}>Address Details</Text>

        <TextInput
          mode="outlined"
          label="Full Address"
          value={formData.address}
          onChangeText={(text) => setFormData({...formData, address: text})}
          multiline
          numberOfLines={3}
          style={styles.input}
        />

        <TextInput
          mode="outlined"
          label="PIN Code"
          value={formData.pincode}
          onChangeText={(text) => setFormData({...formData, pincode: text})}
          keyboardType="numeric"
          maxLength={6}
          style={styles.input}
        />

        {/* Security */}
        <Text style={styles.sectionTitle}>Security</Text>

        <TextInput
          mode="outlined"
          label="Create Password"
          value={formData.password}
          onChangeText={(text) => setFormData({...formData, password: text})}
          secureTextEntry={!showPassword}
          style={styles.input}
          right={
            <TextInput.Icon 
              icon={showPassword ? "eye-off" : "eye"} 
              onPress={() => setShowPassword(!showPassword)}
            />
          }
        />

        <TextInput
          mode="outlined"
          label="Confirm Password"
          value={formData.confirmPassword}
          onChangeText={(text) => setFormData({...formData, confirmPassword: text})}
          secureTextEntry={!showPassword}
          style={styles.input}
        />

        <Button
          mode="contained"
          onPress={handleSubmit}
          style={styles.submitButton}
        >
          Create Account
        </Button>

        <TouchableOpacity 
          style={styles.loginLink}
          onPress={() => router.back()}
        >
          <Text>Already have an account? Login</Text>
        </TouchableOpacity>
      </Surface>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: brandColors.primary[50],
  },
  formContainer: {
    margin: 16,
    padding: 16,
    borderRadius: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: brandColors.primary[900],
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: brandColors.primary[600],
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: brandColors.primary[700],
    marginTop: 16,
    marginBottom: 8,
  },
  input: {
    marginBottom: 12,
    backgroundColor: 'white',
  },
  submitButton: {
    marginTop: 24,
    backgroundColor: brandColors.primary[500],
  },
  loginLink: {
    alignItems: 'center',
    marginTop: 16,
  },
}); 