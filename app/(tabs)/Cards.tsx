import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import { Text, Button, Card, Surface, IconButton, FAB, Portal, Dialog, TextInput } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { brandColors } from '../../constants/Colors';


type CardType = {
  id: string;
  cardNumber: string;
  cardholderName: string;
  expiryDate: string;
  bank: string;
  type: 'visa' | 'mastercard';
  color: string;
};

export default function Cards() {
  const navigation = useNavigation();
  const [cards, setCards] = useState<CardType[]>([
    {
      id: '1',
      cardNumber: '4532 •••• •••• 7890',
      cardholderName: 'John Doe',
      expiryDate: '09/27',
      bank: 'HDFC Bank',
      type: 'visa',
      color: brandColors.primary[500],
    },
    {
      id: '2',
      cardNumber: '5421 •••• •••• 1234',
      cardholderName: 'John Doe',
      expiryDate: '11/25',
      bank: 'ICICI Bank',
      type: 'mastercard',
      color: '#1565C0',
    }
  ]);

  const [fabOpen, setFabOpen] = useState(false);
  const [deleteDialogVisible, setDeleteDialogVisible] = useState(false);
  const [selectedCard, setSelectedCard] = useState<string | null>(null);
  const [addCardDialogVisible, setAddCardDialogVisible] = useState(false);
  
  // New card form state
  const [newCard, setNewCard] = useState({
    cardNumber: '',
    cardholderName: '',
    expiryDate: '',
    cvv: '',
    bank: ''
  });
  const [errors, setErrors] = useState({
    cardNumber: '',
    cardholderName: '',
    expiryDate: '',
    cvv: '',
    bank: ''
  });

  const onDelete = () => {
    if (selectedCard) {
      setCards(cards.filter(card => card.id !== selectedCard));
      setDeleteDialogVisible(false);
      setSelectedCard(null);
    }
  };

  const validateCardForm = () => {
    let valid = true;
    const newErrors = {
      cardNumber: '',
      cardholderName: '',
      expiryDate: '',
      cvv: '',
      bank: ''
    };

    // Validate card number (16 digits)
    if (!newCard.cardNumber.replace(/\s/g, '').match(/^\d{16}$/)) {
      newErrors.cardNumber = 'Please enter a valid 16-digit card number';
      valid = false;
    }

    // Validate cardholder name
    if (!newCard.cardholderName) {
      newErrors.cardholderName = 'Cardholder name is required';
      valid = false;
    }

    // Validate expiry date (MM/YY format)
    if (!newCard.expiryDate.match(/^(0[1-9]|1[0-2])\/\d{2}$/)) {
      newErrors.expiryDate = 'Please enter a valid expiry date (MM/YY)';
      valid = false;
    } else {
      // Check if the card is expired
      const [month, year] = newCard.expiryDate.split('/');
      const expiryDate = new Date(2000 + parseInt(year), parseInt(month) - 1, 1);
      if (expiryDate < new Date()) {
        newErrors.expiryDate = 'Card is expired';
        valid = false;
      }
    }

    // Validate CVV (3-4 digits)
    if (!newCard.cvv.match(/^\d{3,4}$/)) {
      newErrors.cvv = 'Please enter a valid 3 or 4-digit CVV';
      valid = false;
    }

    // Validate bank name
    if (!newCard.bank) {
      newErrors.bank = 'Bank name is required';
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const handleAddCard = () => {
    if (validateCardForm()) {
      // Determine card type based on first digit
      const cardFirst = newCard.cardNumber.replace(/\s/g, '')[0];
      const cardType = cardFirst === '4' ? 'visa' : 'mastercard';
      
      // Format card number to show only first 4 digits
      const formattedNumber = 
        newCard.cardNumber.replace(/\s/g, '').substring(0, 4) + ' •••• •••• ' + 
        newCard.cardNumber.replace(/\s/g, '').substring(12, 16);
      
      // Generate random color from brand colors
      const colorKeys = Object.keys(brandColors.primary).filter(key => 
        parseInt(key) >= 400 && parseInt(key) <= 700
      );
      

      
      const newCardEntry: CardType = {
        id: (cards.length + 1).toString(),
        cardNumber: formattedNumber,
        cardholderName: newCard.cardholderName,
        expiryDate: newCard.expiryDate,
        bank: newCard.bank,
        type: cardType,
        color: 'rgba(164, 123, 34, 0.7)',
      };
      
      setCards([...cards, newCardEntry]);
      setAddCardDialogVisible(false);
      
      // Reset form
      setNewCard({
        cardNumber: '',
        cardholderName: '',
        expiryDate: '',
        cvv: '',
        bank: ''
      });
    }
  };

  const formatCardNumber = (text: string) => {
    // Remove all non-digits
    const cleaned = text.replace(/\D/g, '');
    
    // Add space after every 4 digits
    let formatted = '';
    for (let i = 0; i < cleaned.length; i++) {
      if (i > 0 && i % 4 === 0) {
        formatted += ' ';
      }
      formatted += cleaned[i];
    }
    
    return formatted.substring(0, 19); // Max 16 digits + 3 spaces
  };

  const formatExpiryDate = (text: string) => {
    // Remove all non-digits
    const cleaned = text.replace(/\D/g, '');
    
    // Format as MM/YY
    if (cleaned.length > 2) {
      return cleaned.substring(0, 2) + '/' + cleaned.substring(2, 4);
    }
    
    return cleaned;
  };

  return (
    <View style={styles.container}>
      <Surface style={styles.header} elevation={4}>
        <View style={styles.headerTop}>
          <IconButton 
            icon="arrow-left" 
            iconColor="white" 
            size={24} 
            onPress={() => navigation.goBack()}
            tvParallaxProperties={undefined}
          />
          <Text style={styles.headerTitle}>My Cards</Text>
          <View style={{ width: 40 }} />
        </View>
      </Surface>

      <ScrollView style={styles.cardsList}>
        {cards.length > 0 ? (
          cards.map((card) => (
            <Card key={card.id} style={[styles.cardItem, { backgroundColor: card.color }]}>
              <Card.Content>
                <View style={styles.cardTop}>
                  <Text style={styles.bankName}>{card.bank}</Text>
                  <IconButton 
                    icon="dots-vertical" 
                    iconColor="white" 
                    size={24} 
                    onPress={() => {
                      setSelectedCard(card.id);
                      setDeleteDialogVisible(true);
                    }}
                    tvParallaxProperties={undefined}
                  />
                </View>
                
                <Text style={styles.cardNumber}>{card.cardNumber}</Text>
                
                <View style={styles.cardBottom}>
                  <View>
                    <Text style={styles.cardLabel}>CARD HOLDER</Text>
                    <Text style={styles.cardholderName}>{card.cardholderName}</Text>
                  </View>
                  
                  <View>
                    <Text style={styles.cardLabel}>EXPIRES</Text>
                    <Text style={styles.expiryDate}>{card.expiryDate}</Text>
                  </View>
                  
                  <View style={styles.cardType}>
                    {card.type === 'visa' ? (
                      <Text style={styles.cardTypeLogo}>VISA</Text>
                    ) : (
                      <Text style={styles.cardTypeLogo}>MasterCard</Text>
                    )}
                  </View>
                </View>
              </Card.Content>
            </Card>
          ))
        ) : (
          <View style={styles.noCardsContainer}>
            <Text style={styles.noCardsText}>You haven't added any cards yet</Text>
            <Button 
              mode="contained" 
              onPress={() => setAddCardDialogVisible(true)}
              style={styles.addFirstCardButton}
            >
              Add Your First Card
            </Button>
          </View>
        )}
      </ScrollView>

      <Portal>
        <Dialog visible={deleteDialogVisible} onDismiss={() => setDeleteDialogVisible(false)}>
          <Dialog.Title>Delete Card</Dialog.Title>
          <Dialog.Content>
            <Text>Are you sure you want to remove this card?</Text>
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={() => setDeleteDialogVisible(false)}>Cancel</Button>
            <Button onPress={onDelete}>Delete</Button>
          </Dialog.Actions>
        </Dialog>

        <Dialog visible={addCardDialogVisible} onDismiss={() => setAddCardDialogVisible(false)}>
          <Dialog.Title>Add New Card</Dialog.Title>
          <Dialog.Content>
            <TextInput
                          mode="outlined"
                          label="Card Number"
                          value={newCard.cardNumber}
                          onChangeText={(text) => setNewCard({ ...newCard, cardNumber: formatCardNumber(text) })}
                          keyboardType="number-pad"
                          maxLength={19}
                          style={styles.input}
                          error={!!errors.cardNumber} tvParallaxProperties={undefined} onTextInput={undefined}            />
            {errors.cardNumber ? <Text style={styles.errorText}>{errors.cardNumber}</Text> : null}
            
            <TextInput
                          mode="outlined"
                          label="Cardholder Name"
                          value={newCard.cardholderName}
                          onChangeText={(text) => setNewCard({ ...newCard, cardholderName: text })}
                          style={styles.input}
                          error={!!errors.cardholderName} tvParallaxProperties={undefined} onTextInput={undefined}            />
            {errors.cardholderName ? <Text style={styles.errorText}>{errors.cardholderName}</Text> : null}
            
            <View style={styles.row}>
              <TextInput
                              mode="outlined"
                              label="Expiry Date (MM/YY)"
                              value={newCard.expiryDate}
                              onChangeText={(text) => setNewCard({ ...newCard, expiryDate: formatExpiryDate(text) })}
                              keyboardType="number-pad"
                              maxLength={5}
                              style={[styles.input, styles.halfInput]}
                              error={!!errors.expiryDate} tvParallaxProperties={undefined} onTextInput={undefined}              />
              
              <TextInput
                              mode="outlined"
                              label="CVV"
                              value={newCard.cvv}
                              onChangeText={(text) => setNewCard({ ...newCard, cvv: text.replace(/\D/g, '') })}
                              keyboardType="number-pad"
                              maxLength={4}
                              secureTextEntry
                              style={[styles.input, styles.halfInput]}
                              error={!!errors.cvv} tvParallaxProperties={undefined} onTextInput={undefined}              />
            </View>
            
            {errors.expiryDate ? <Text style={styles.errorText}>{errors.expiryDate}</Text> : null}
            {errors.cvv ? <Text style={styles.errorText}>{errors.cvv}</Text> : null}
            
            <TextInput
                          mode="outlined"
                          label="Bank Name"
                          value={newCard.bank}
                          onChangeText={(text) => setNewCard({ ...newCard, bank: text })}
                          style={styles.input}
                          error={!!errors.bank} tvParallaxProperties={undefined} onTextInput={undefined}            />
            {errors.bank ? <Text style={styles.errorText}>{errors.bank}</Text> : null}
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={() => setAddCardDialogVisible(false)}>Cancel</Button>
            <Button onPress={handleAddCard}>Add Card</Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>

      {cards.length > 0 && (
        <FAB
                  icon="plus"
                  style={styles.fab}
                  onPress={() => setAddCardDialogVisible(true)} tvParallaxProperties={undefined}        />
      )}
    </View>
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
  cardsList: {
    padding: 16,
  },
  cardItem: {
    marginBottom: 20,
    borderRadius: 16,
    elevation: 4,
  },
  cardTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 30,
  },
  bankName: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  cardNumber: {
    color: 'white',
    fontSize: 22,
    letterSpacing: 2,
    marginBottom: 30,
  },
  cardBottom: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  cardLabel: {
    color: 'rgba(255,255,255,0.7)',
    fontSize: 12,
  },
  cardholderName: {
    color: 'white',
    fontSize: 16,
  },
  expiryDate: {
    color: 'white',
    fontSize: 16,
  },
  cardType: {
    alignSelf: 'flex-end',
  },
  cardTypeLogo: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    fontStyle: 'italic',
  },
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
    backgroundColor: brandColors.primary[500],
  },
  noCardsContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    marginTop: 50,
  },
  noCardsText: {
    fontSize: 16,
    color: '#666',
    marginBottom: 20,
  },
  addFirstCardButton: {
    backgroundColor: brandColors.primary[500],
  },
  input: {
    marginBottom: 12,
    backgroundColor: 'white',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  halfInput: {
    width: '48%',
  },
  errorText: {
    color: 'red',
    fontSize: 12,
    marginTop: -8,
    marginBottom: 8,
  },
});