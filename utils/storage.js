import AsyncStorage from '@react-native-async-storage/async-storage';

export const setItem = async (key, value) => {
  try {
    await AsyncStorage.setItem(key, value);
  } catch (e) {
    console.log("Storage Set Error:", e);
  }
};

export const getItem = async (key) => {
  try {
    return await AsyncStorage.getItem(key);
  } catch (e) {
    console.log("Storage Get Error:", e);
    return null;
  }
};