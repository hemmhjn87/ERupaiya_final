import React, { useState } from 'react';
import { StyleSheet, View, TouchableOpacity, KeyboardAvoidingView, Platform, ImageBackground } from 'react-native';
import { Text, TextInput, Button, Surface } from 'react-native-paper';
import { router } from 'expo-router';
import { brandColors } from '../constants/Colors';

export default function LoginScreen() {
  const [mobile, setMobile] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const DEMO_MOBILE = '9302200651';
  const DEMO_PASSWORD = 'hemendra87';

  const handleLogin = () => {
    if (mobile !== DEMO_MOBILE || password !== DEMO_PASSWORD) {
      alert('Invalid credentials');
      return;
    }
    router.replace('/(tabs)');
  };

  return (
    <View style={styles.container}>
      <View style={styles.topSection}>
        <View style={styles.logoContainer}>
          <Text style={styles.logoSymbol}>₹</Text>
        </View>
        <Text style={styles.appName}>ERupaiya</Text>
        <Text style={styles.tagline}>Make money transfer more easy</Text>
      </View>

      <Surface style={styles.formContainer} elevation={4}>
        <Text style={styles.welcomeText}>Welcome Back!</Text>
        
        <TextInput
          mode="outlined"
          label="Mobile Number"
          value={mobile}
          onChangeText={setMobile}
          keyboardType="phone-pad"
          maxLength={10}
          style={styles.input}
          outlineColor={brandColors.primary[200]}
          activeOutlineColor={brandColors.primary[500]}
          left={<TextInput.Affix text="+91" />}
        />

        <TextInput
          mode="outlined"
          label="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry={!showPassword}
          style={styles.input}
          outlineColor={brandColors.primary[200]}
          activeOutlineColor={brandColors.primary[500]}
          right={
            <TextInput.Icon 
              icon={showPassword ? "eye-off" : "eye"} 
              onPress={() => setShowPassword(!showPassword)}
            />
          }
        />

        <TouchableOpacity 
          style={styles.forgotPassword}
          onPress={() => {/* Handle forgot password */}}
        >
          <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
        </TouchableOpacity>

        <Button
          mode="contained"
          onPress={handleLogin}
          style={styles.loginButton}
          contentStyle={styles.loginButtonContent}
        >
          Login Securely
        </Button>

        <View style={styles.registerContainer}>
          <Text style={styles.registerText}>New to ERupaiya? </Text>
          <TouchableOpacity onPress={() => router.push('/register')}>
            <Text style={styles.registerLink}>Create Account</Text>
          </TouchableOpacity>
        </View>
      </Surface>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: brandColors.primary[500],
  },
  topSection: {
    alignItems: 'center',
    paddingTop: 60,
    paddingBottom: 40,
  },
  logoContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
    elevation: 5,
  },
  logoSymbol: {
    fontSize: 40,
    fontWeight: 'bold',
    color: brandColors.primary[500],
  },
  appName: {
    fontSize: 28,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 8,
  },
  tagline: {
    fontSize: 16,
    color: 'rgba(255,255,255,0.9)',
  },
  formContainer: {
    flex: 1,
    backgroundColor: 'white',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    padding: 24,
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: brandColors.primary[900],
    marginBottom: 24,
  },
  input: {
    marginBottom: 16,
    backgroundColor: 'white',
  },
  forgotPassword: {
    alignSelf: 'flex-end',
    marginBottom: 24,
  },
  forgotPasswordText: {
    color: brandColors.primary[600],
  },
  loginButton: {
    backgroundColor: brandColors.primary[500],
    borderRadius: 8,
  },
  loginButtonContent: {
    paddingVertical: 8,
  },
  registerContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 24,
  },
  registerText: {
    color: brandColors.primary[800],
  },
  registerLink: {
    color: brandColors.primary[500],
    fontWeight: 'bold',
  },
}); 