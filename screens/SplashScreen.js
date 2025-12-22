// screens/SplashScreen.js
import React, { useEffect } from "react";
import { View, Text, ActivityIndicator, StyleSheet } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function SplashScreen({ navigation }) {
  useEffect(() => {
    const checkFlow = async () => {
      const hasSeenOnboarding = await AsyncStorage.getItem("onboardingComplete");
      const loggedIn = await AsyncStorage.getItem("loggedInUser");

      setTimeout(() => {
        if (!hasSeenOnboarding) {
          navigation.replace("Onboarding");
        } else if (!loggedIn) {
          navigation.replace("Login");
        } else {
          navigation.replace("MainTabs");
        }
      }, 1200);
    };

    checkFlow();
  }, []);

  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color="#007bff" />
      <Text style={styles.text}>Loading...</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center" },
  text: { marginTop: 10, color: "#555" },
});
