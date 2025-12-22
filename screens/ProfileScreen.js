import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ProfileScreen = ({ navigation }) => {
  const handleLogout = async () => {
    await AsyncStorage.removeItem('loggedInUser');
    navigation.replace('Login'); // redirect to login screen
  };

  return (
    <View style={styles.container}>
      <Image
        source={{ uri: 'https://randomuser.me/api/portraits/men/45.jpg' }}
        style={styles.profileImage}
      />
      <Text style={styles.name}>Student User</Text>
      <Text style={styles.email}>student@example.com</Text>

      <TouchableOpacity style={styles.logoutBtn} onPress={handleLogout}>
        <Text style={styles.logoutText}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f9f9f9',
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 15,
  },
  name: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  email: {
    color: '#888',
    marginBottom: 30,
  },
  logoutBtn: {
    backgroundColor: '#007bff',
    paddingHorizontal: 30,
    paddingVertical: 12,
    borderRadius: 10,
  },
  logoutText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default ProfileScreen;
