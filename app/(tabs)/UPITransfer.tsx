import React, { useState, useEffect } from "react";
import { 
  View, 
  Text, 
  StyleSheet, 
  TextInput, 
  TouchableOpacity, 
  ScrollView, 
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
  Alert
} from "react-native";
import { FontAwesome5, MaterialIcons } from "@expo/vector-icons";

// Define types for our data structures
interface Contact {
  id: string;
  name: string;
  upiId: string;
  recent: boolean;
  photo: string | null;
}

interface Bank {
  id: string;
  name: string;
  icon: string;
  upiHandle: string;
}

interface UpiValidationResult {
  valid: boolean;
  name: string | null;
}

interface PaymentResult {
  success: boolean;
  transactionId: string;
  message: string;
}

interface PaymentError {
  success: boolean;
  error: string;
  message: string;
}

// Navigation prop type
interface NavigationProps {
  navigation: {
    navigate: (screen: string, params?: any) => void;
    goBack: () => void;
  };
}

// Mock API interface
interface MockApiCalls {
  fetchContacts: () => Promise<Contact[]>;
  fetchBanks: () => Promise<Bank[]>;
  validateUpiId: (upiId: string) => Promise<UpiValidationResult>;
  processPayment: (amount: string, upiId: string) => Promise<PaymentResult>;
}

// Mock API functions - replace these with your actual API calls later
const mockApiCalls: MockApiCalls = {
  fetchContacts: () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve([
          { id: "c1", name: "Test User 1", upiId: "testuser1@testbank", recent: true, photo: null },
          { id: "c2", name: "Test User 2", upiId: "testuser2@testbank", recent: true, photo: null },
          { id: "c3", name: "Test User 3", upiId: "testuser3@testbank", recent: true, photo: null },
          { id: "c4", name: "Test User 4", upiId: "testuser4@testbank", recent: false, photo: null },
          { id: "c5", name: "Test User 5", upiId: "testuser5@testbank", recent: false, photo: null },
        ]);
      }, 700);
    });
  },
  
  fetchBanks: () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve([
          { id: "b1", name: "Test Bank 1", icon: "university", upiHandle: "testbank" },
          { id: "b2", name: "Test Bank 2", icon: "university", upiHandle: "testbank2" },
          { id: "b3", name: "Test Bank 3", icon: "university", upiHandle: "testbank3" },
        ]);
      }, 500);
    });
  },
  
  validateUpiId: (upiId: string) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        // Simple validation: must contain @ and at least one character on either side
        const isValid = /^.+@.+$/.test(upiId);
        resolve({
          valid: isValid,
          name: isValid ? "Test Recipient" : null
        });
      }, 300);
    });
  },
  
  processPayment: (amount: string, upiId: string) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        // Simulate successful transactions most of the time
        if (Math.random() > 0.2) {
          resolve({
            success: true,
            transactionId: "TXNID" + Date.now(),
            message: "Payment successful"
          });
        } else {
          reject({
            success: false,
            error: "Payment failed",
            message: "Transaction could not be completed"
          });
        }
      }, 1500);
    });
  }
};

type TabType = "contacts" | "recents" | "banks";

const UPITransfer: React.FC<NavigationProps> = ({ navigation }) => {
  const [amount, setAmount] = useState<string>("");
  const [upiId, setUpiId] = useState<string>("");
  const [recipientName, setRecipientName] = useState<string>("");
  const [activeTab, setActiveTab] = useState<TabType>("contacts");
  const [loading, setLoading] = useState<boolean>(true);
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [banks, setBanks] = useState<Bank[]>([]);
  const [validatingUpi, setValidatingUpi] = useState<boolean>(false);
  const [upiValid, setUpiValid] = useState<boolean>(false);
  const [processingPayment, setProcessingPayment] = useState<boolean>(false);
  
  // Load data on component mount
  useEffect(() => {
    const loadInitialData = async () => {
      try {
        const [contactsData, banksData] = await Promise.all([
          mockApiCalls.fetchContacts(),
          mockApiCalls.fetchBanks()
        ]);
        
        setContacts(contactsData);
        setBanks(banksData);
      } catch (error) {
        Alert.alert("Error", "Failed to load data");
      } finally {
        setLoading(false);
      }
    };
    
    loadInitialData();
  }, []);
  
  // Validate UPI ID when it changes
  useEffect(() => {
    const validateId = async () => {
      if (upiId.trim()) {
        setValidatingUpi(true);
        try {
          const result = await mockApiCalls.validateUpiId(upiId);
          setUpiValid(result.valid);
          setRecipientName(result.name || "");
        } catch (error) {
          setUpiValid(false);
          setRecipientName("");
        } finally {
          setValidatingUpi(false);
        }
      } else {
        setUpiValid(false);
        setRecipientName("");
      }
    };
    
    const timeoutId = setTimeout(validateId, 500);
    return () => clearTimeout(timeoutId);
  }, [upiId]);
  
  const handleContactSelect = (contact: Contact) => {
    setUpiId(contact.upiId);
    setRecipientName(contact.name);
  };
  
  const handleBankSelect = (bank: Bank) => {
    // In a real app, this would open a flow to select your account from this bank
    Alert.alert("Bank Selected", `You selected ${bank.name}`);
  };
  
  const handleContinue = async () => {
    if (!amount || !upiId || !upiValid) return;
    
    setProcessingPayment(true);
    try {
      const result = await mockApiCalls.processPayment(amount, upiId);
      Alert.alert(
        "Payment Successful", 
        `₹${amount} sent to ${recipientName || upiId}\nTransaction ID: ${result.transactionId}`,
        [
          { 
            text: "OK", 
            onPress: () => {
              // In a real app, this would navigate back or to a confirmation screen
              setAmount("");
              setUpiId("");
            } 
          }
        ]
      );
    } catch (error) {
      const paymentError = error as PaymentError;
      Alert.alert("Payment Failed", paymentError.message);
    } finally {
      setProcessingPayment(false);
    }
  };
  
  const recentPayments = contacts.filter(contact => contact.recent);

  const renderContactItem = (contact: Contact) => (
    <TouchableOpacity 
      key={contact.id} 
      style={styles.contactItem}
      onPress={() => handleContactSelect(contact)}
    >
      <View style={styles.contactPhoto}>
        <FontAwesome5 name="user" size={20} color="#5e17eb" />
      </View>
      <View style={styles.contactInfo}>
        <Text style={styles.contactName}>{contact.name}</Text>
        <Text style={styles.contactUpi}>{contact.upiId}</Text>
      </View>
    </TouchableOpacity>
  );

  if (loading) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="#5e17eb" />
        <Text style={styles.loaderText}>Loading...</Text>
      </View>
    );
  }

  return (
    <KeyboardAvoidingView 
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <MaterialIcons name="arrow-back" size={24} color="#333" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>UPI Transfer</Text>
        <TouchableOpacity style={styles.qrButton}>
          <FontAwesome5 name="qrcode" size={20} color="#333" />
        </TouchableOpacity>
      </View>
      
      {/* Amount Input */}
      <View style={styles.amountContainer}>
        <Text style={styles.amountLabel}>Amount</Text>
        <View style={styles.amountInputContainer}>
          <Text style={styles.currencySymbol}>₹</Text>
          <TextInput
            style={styles.amountInput}
            value={amount}
            onChangeText={setAmount}
            placeholder="0"
            keyboardType="number-pad"
            maxLength={10}
          />
        </View>
      </View>
      
      {/* UPI ID Input */}
      <View style={styles.upiContainer}>
        <Text style={styles.upiLabel}>Pay To (UPI ID / Mobile Number)</Text>
        <View style={styles.upiInputContainer}>
          <TextInput
            style={styles.upiInput}
            value={upiId}
            onChangeText={setUpiId}
            placeholder="Enter UPI ID or phone number"
            autoCapitalize="none"
          />
          {validatingUpi ? (
            <ActivityIndicator size="small" color="#5e17eb" />
          ) : upiId.length > 0 ? (
            <TouchableOpacity onPress={() => setUpiId("")}>
              <MaterialIcons name="cancel" size={20} color="#888" />
            </TouchableOpacity>
          ) : null}
        </View>
        
        {upiValid && recipientName ? (
          <View style={styles.recipientContainer}>
            <FontAwesome5 name="check-circle" size={16} color="#00a651" />
            <Text style={styles.recipientName}>{recipientName}</Text>
          </View>
        ) : null}
      </View>
      
      {/* Tab Navigation */}
      <View style={styles.tabContainer}>
        <TouchableOpacity 
          style={[styles.tab, activeTab === "contacts" && styles.activeTab]}
          onPress={() => setActiveTab("contacts")}
        >
          <Text style={[styles.tabText, activeTab === "contacts" && styles.activeTabText]}>
            Contacts
          </Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.tab, activeTab === "recents" && styles.activeTab]}
          onPress={() => setActiveTab("recents")}
        >
          <Text style={[styles.tabText, activeTab === "recents" && styles.activeTabText]}>
            Recent
          </Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.tab, activeTab === "banks" && styles.activeTab]}
          onPress={() => setActiveTab("banks")}
        >
          <Text style={[styles.tabText, activeTab === "banks" && styles.activeTabText]}>
            Banks
          </Text>
        </TouchableOpacity>
      </View>
      
      {/* Content based on active tab */}
      <ScrollView style={styles.contentContainer}>
        {activeTab === "contacts" && (
          contacts.length > 0 ? 
            contacts.map(renderContactItem) : 
            <Text style={styles.emptyText}>No contacts found</Text>
        )}
        
        {activeTab === "recents" && (
          recentPayments.length > 0 ? 
            recentPayments.map(renderContactItem) : 
            <Text style={styles.emptyText}>No recent payments</Text>
        )}
        
        {activeTab === "banks" && (
          <View style={styles.banksList}>
            {banks.map(bank => (
              <TouchableOpacity 
                key={bank.id} 
                style={styles.bankItem}
                onPress={() => handleBankSelect(bank)}
              >
                <View style={styles.bankIconContainer}>
                  <FontAwesome5 name={bank.icon} size={20} color="#5e17eb" />
                </View>
                <Text style={styles.bankName}>{bank.name}</Text>
              </TouchableOpacity>
            ))}
          </View>
        )}
      </ScrollView>
      
      {/* Action Buttons */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity 
          style={[
            styles.continueButton, 
            (!amount || !upiValid || processingPayment) && styles.disabledButton
          ]}
          disabled={!amount || !upiValid || processingPayment}
          onPress={handleContinue}
        >
          {processingPayment ? (
            <ActivityIndicator size="small" color="white" />
          ) : (
            <Text style={styles.buttonText}>CONTINUE</Text>
          )}
        </TouchableOpacity>
      </View>
      
      {/* Test Mode Indicator */}
      <View style={styles.testModeContainer}>
        <Text style={styles.testModeText}>TEST MODE</Text>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f9fa",
  },
  loaderContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f8f9fa",
  },
  loaderText: {
    marginTop: 12,
    color: "#666",
    fontSize: 16,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingTop: 50,
    paddingBottom: 16,
    backgroundColor: "white",
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  backButton: {
    padding: 8,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "600",
  },
  qrButton: {
    padding: 8,
  },
  amountContainer: {
    backgroundColor: "white",
    padding: 20,
    marginTop: 10,
  },
  amountLabel: {
    fontSize: 14,
    color: "#666",
    marginBottom: 8,
  },
  amountInputContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  currencySymbol: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#333",
    marginRight: 8,
  },
  amountInput: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#333",
    flex: 1,
    padding: 0,
  },
  upiContainer: {
    backgroundColor: "white",
    padding: 20,
    marginTop: 10,
  },
  upiLabel: {
    fontSize: 14,
    color: "#666",
    marginBottom: 8,
  },
  upiInputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
    paddingBottom: 8,
  },
  upiInput: {
    fontSize: 16,
    flex: 1,
    padding: 0,
  },
  recipientContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
  },
  recipientName: {
    fontSize: 14,
    color: "#00a651",
    marginLeft: 6,
    fontWeight: "500",
  },
  tabContainer: {
    flexDirection: "row",
    backgroundColor: "white",
    marginTop: 10,
  },
  tab: {
    flex: 1,
    paddingVertical: 14,
    alignItems: "center",
  },
  activeTab: {
    borderBottomWidth: 2,
    borderBottomColor: "#5e17eb",
  },
  tabText: {
    fontSize: 14,
    color: "#666",
  },
  activeTabText: {
    color: "#5e17eb",
    fontWeight: "600",
  },
  contentContainer: {
    flex: 1,
    backgroundColor: "white",
  },
  contactItem: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
  contactPhoto: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#f0e7ff",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  contactInfo: {
    flex: 1,
  },
  contactName: {
    fontSize: 16,
    fontWeight: "500",
    color: "#333",
  },
  contactUpi: {
    fontSize: 14,
    color: "#666",
    marginTop: 2,
  },
  emptyText: {
    padding: 20,
    textAlign: "center",
    color: "#888",
  },
  banksList: {
    padding: 16,
  },
  bankItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
  bankIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#f0e7ff",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  bankName: {
    fontSize: 16,
    color: "#333",
  },
  buttonContainer: {
    padding: 16,
    backgroundColor: "white",
    borderTopWidth: 1,
    borderTopColor: "#eee",
  },
  continueButton: {
    backgroundColor: "#5e17eb",
    borderRadius: 8,
    paddingVertical: 14,
    alignItems: "center",
  },
  disabledButton: {
    backgroundColor: "#cccccc",
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
  },
  testModeContainer: {
    position: "absolute",
    top: 120,
    right: 16,
    backgroundColor: "#ff9800",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  testModeText: {
    color: "white",
    fontSize: 10,
    fontWeight: "bold",
  },
});

export default UPITransfer;