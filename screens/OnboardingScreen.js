// screens/OnboardingScreen.js
AsyncStorage.removeItem("onboardingComplete");
import React from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Swiper from "react-native-swiper";



export default function OnboardingScreen({ navigation }) {
  const finish = async () => {
    await AsyncStorage.setItem("onboardingComplete", "true");
    navigation.replace("Login");
  };

  return (
    <Swiper loop={false} showsPagination={true}>
      {/* Slide 1 */}
      <View style={styles.slide}>
        <Image source={require("../assets/slide1.jpeg")} style={styles.image} />
        <Text style={styles.title}>Learn Anytime</Text>
        <Text style={styles.text}>Access quality courses anywhere you are.</Text>
      </View>

      {/* Slide 2 */}
      <View style={styles.slide}>
        <Image source={require("../assets/slide2.jpeg")} style={styles.image} />
        <Text style={styles.title}>Track Your Progress</Text>
        <Text style={styles.text}>Stay motivated as you complete lessons.</Text>
      </View>

      {/* Slide 3 */}
      <View style={styles.slide}>
        <Image source={require("../assets/slide3.jpeg")} style={styles.image} />
        <Text style={styles.title}>Get Started</Text>
        <TouchableOpacity style={styles.button} onPress={finish}>
          <Text style={styles.buttonText}>Start Learning</Text>
        </TouchableOpacity>
      </View>
    </Swiper>
  );
}

const styles = StyleSheet.create({
  slide: { flex: 1, justifyContent: "center", alignItems: "center", padding: 20 },
  image: { width: 250, height: 250, marginBottom: 30 },
  title: { fontSize: 24, fontWeight: "bold", marginBottom: 10 },
  text: { color: "#555", fontSize: 16, textAlign: "center" },
  button: { backgroundColor: "#007bff", paddingHorizontal: 30, paddingVertical: 10, borderRadius: 10, marginTop: 20 },
  buttonText: { color: "white", fontSize: 16 },
});
