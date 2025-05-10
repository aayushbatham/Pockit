import React, { useState } from 'react';
import { View, TouchableOpacity, StyleSheet, Platform, Modal, TextInput } from 'react-native';
import { useRouter, usePathname } from 'expo-router';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useColorScheme } from '@/hooks/useColorScheme';
import { useAddTransaction } from '@/modules/hooks/use-add-transaction';
import { ThemedText } from '@/components/ThemedText';

interface BottomBarProps {
  primaryColor: string;
}

export function BottomBar({ primaryColor }: BottomBarProps) {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [formData, setFormData] = useState({
    phoneNumber: '',
    amount: '',
    spentCategory: '',
    methodeOfPayment: '',
    receiver: '',
  });
  
  const { mutate: addTransaction, isLoading } = useAddTransaction();
  
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  
  const handleSubmit = () => {
    addTransaction({
      ...formData,
      amount: parseFloat(formData.amount),
    });
    setIsModalVisible(false);
    setFormData({
      phoneNumber: '',
      amount: '',
      spentCategory: '',
      methodeOfPayment: '',
      receiver: '',
    });
    setShowSuccessModal(true);
    setTimeout(() => setShowSuccessModal(false), 2000);
  };
  
  const router = useRouter();
  const pathname = usePathname();
  
  const isActive = (path: string) => pathname?.startsWith(path);
  
  return (
    <>
      <View style={styles.container}>
        <TouchableOpacity 
          style={styles.tabButton} 
          onPress={() => router.push('/(home)')}
        >
          <MaterialCommunityIcons 
            name="home" 
            size={26} 
            color={isActive('/(home)') ? "#FFFFFF" : "#666666"} 
          />
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.tabButton} 
          onPress={() => router.push('/stats')}
        >
          <MaterialCommunityIcons 
            name="chart-pie" 
            size={26} 
            color={isActive('/stats') ? "#FFFFFF" : "#666666"} 
          />
        </TouchableOpacity>
        
        <View style={styles.addButtonContainer}>
          <TouchableOpacity 
            style={styles.addButton}
            onPress={() => setIsModalVisible(true)}
          >
            <MaterialCommunityIcons 
              name="plus" 
              size={32} 
              color="#FFFFFF" 
            />
          </TouchableOpacity>
        </View>
        
        <TouchableOpacity 
          style={styles.tabButton} 
          onPress={() => router.push('/(chatbot)')}
        >
          <MaterialCommunityIcons 
            name="wallet" 
            size={26} 
            color={isActive('/wallet') ? "#FFFFFF" : "#666666"} 
          />
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.tabButton} 
          onPress={() => router.push('/(profile)')}
        >
          <MaterialCommunityIcons 
            name="account" 
            size={26} 
            color={isActive('/profile') ? "#FFFFFF" : "#666666"} 
          />
        </TouchableOpacity>
      </View>
      
      <Modal
        visible={isModalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setIsModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <ThemedText style={styles.modalTitle}>Add Transaction</ThemedText>
            
            <TextInput
              style={styles.input}
              placeholder="Phone Number"
              value={formData.phoneNumber}
              onChangeText={(text) => setFormData(prev => ({ ...prev, phoneNumber: text }))}
              placeholderTextColor="#666"
            />
            
            <TextInput
              style={styles.input}
              placeholder="Amount"
              value={formData.amount}
              onChangeText={(text) => setFormData(prev => ({ ...prev, amount: text }))}
              keyboardType="numeric"
              placeholderTextColor="#666"
            />
            
            <TextInput
              style={styles.input}
              placeholder="Category"
              value={formData.spentCategory}
              onChangeText={(text) => setFormData(prev => ({ ...prev, spentCategory: text }))}
              placeholderTextColor="#666"
            />
            
            <TextInput
              style={styles.input}
              placeholder="Payment Method"
              value={formData.methodeOfPayment}
              onChangeText={(text) => setFormData(prev => ({ ...prev, methodeOfPayment: text }))}
              placeholderTextColor="#666"
            />
            
            <TextInput
              style={styles.input}
              placeholder="Receiver"
              value={formData.receiver}
              onChangeText={(text) => setFormData(prev => ({ ...prev, receiver: text }))}
              placeholderTextColor="#666"
            />

            <View style={styles.buttonContainer}>
              <TouchableOpacity 
                style={[styles.button, styles.cancelButton]}
                onPress={() => setIsModalVisible(false)}
              >
                <ThemedText style={styles.buttonText}>Cancel</ThemedText>
              </TouchableOpacity>
              
              <TouchableOpacity 
                style={[styles.button, styles.submitButton]}
                onPress={handleSubmit}
                disabled={isLoading}
              >
                <ThemedText style={styles.buttonText}>
                  {isLoading ? 'Adding...' : 'Add'}
                </ThemedText>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
      
      {/* Add Transaction Modal */}
      <Modal
        visible={isModalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setIsModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <ThemedText style={styles.modalTitle}>Add Transaction</ThemedText>
            
            <TextInput
              style={styles.input}
              placeholder="Phone Number"
              value={formData.phoneNumber}
              onChangeText={(text) => setFormData(prev => ({ ...prev, phoneNumber: text }))}
              placeholderTextColor="#666"
            />
            
            <TextInput
              style={styles.input}
              placeholder="Amount"
              value={formData.amount}
              onChangeText={(text) => setFormData(prev => ({ ...prev, amount: text }))}
              keyboardType="numeric"
              placeholderTextColor="#666"
            />
            
            <TextInput
              style={styles.input}
              placeholder="Category"
              value={formData.spentCategory}
              onChangeText={(text) => setFormData(prev => ({ ...prev, spentCategory: text }))}
              placeholderTextColor="#666"
            />
            
            <TextInput
              style={styles.input}
              placeholder="Payment Method"
              value={formData.methodeOfPayment}
              onChangeText={(text) => setFormData(prev => ({ ...prev, methodeOfPayment: text }))}
              placeholderTextColor="#666"
            />
            
            <TextInput
              style={styles.input}
              placeholder="Receiver"
              value={formData.receiver}
              onChangeText={(text) => setFormData(prev => ({ ...prev, receiver: text }))}
              placeholderTextColor="#666"
            />

            <View style={styles.buttonContainer}>
              <TouchableOpacity 
                style={[styles.button, styles.cancelButton]}
                onPress={() => setIsModalVisible(false)}
              >
                <ThemedText style={styles.buttonText}>Cancel</ThemedText>
              </TouchableOpacity>
              
              <TouchableOpacity 
                style={[styles.button, styles.submitButton]}
                onPress={handleSubmit}
                disabled={isLoading}
              >
                <ThemedText style={styles.buttonText}>
                  {isLoading ? 'Adding...' : 'Add'}
                </ThemedText>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
      
      {/* Success Modal */}
      <Modal
        visible={showSuccessModal}
        transparent={true}
        animationType="fade"
      >
        <View style={styles.successModalContainer}>
          <View style={styles.successModalContent}>
            <MaterialCommunityIcons 
              name="check-circle" 
              size={50} 
              color="#4CAF50"
            />
            <ThemedText style={styles.successModalText}>
              Transaction Added Successfully
            </ThemedText>
          </View>
        </View>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    height: Platform.OS === 'ios' ? 85 : 85,
    paddingBottom: Platform.OS === 'ios' ? 20 : 0,
    alignItems: 'center',
    justifyContent: 'space-around',
    backgroundColor: '#000000',
    borderTopWidth: 0,
    paddingHorizontal: 16,
  },
  tabButton: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
  },
  addButtonContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 75,
    height: Platform.OS === 'ios' ? 85 : 65,
    marginTop: -40,
  },
  addButton: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#2C2C2E',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContent: {
    backgroundColor: '#1C1C1E',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    paddingBottom: Platform.OS === 'ios' ? 40 : 20,
  },
  successModalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  successModalContent: {
    backgroundColor: '#1C1C1E',
    padding: 20,
    borderRadius: 15,
    alignItems: 'center',
    gap: 10,
  },
  successModalText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
    marginTop: 10,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    backgroundColor: '#2C2C2E',
    borderRadius: 10,
    padding: 15,
    marginBottom: 12,
    color: '#FFFFFF',
    fontSize: 16,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  button: {
    flex: 1,
    padding: 15,
    borderRadius: 10,
    marginHorizontal: 5,
  },
  cancelButton: {
    backgroundColor: '#2C2C2E',
  },
  submitButton: {
    backgroundColor: '#8B5CF6',
  },
  buttonText: {
    textAlign: 'center',
    fontSize: 16,
    fontWeight: '600',
  },
});