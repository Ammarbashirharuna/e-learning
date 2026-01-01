// navigation/AppNavigator.js
import React, { useEffect, useState } from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { initDatabase, seedCourses } from '../database/db';
import AdminLoginScreen from '../screens/Admin/AdminLoginScreen';
import SplashScreen from '../screens/SplashScreen';
import OnboardingScreen from '../screens/OnboardingScreen';
import LoginScreen from '../screens/LoginScreen';
import SignupScreen from '../screens/SignupScreen';

import DashboardScreen from '../screens/DashboardScreen';
import MyCoursesScreen from '../screens/MyCoursesScreen';
import ProfileScreen from '../screens/ProfileScreen';
import CoursesScreen from '../screens/CoursesScreen'; // Added this
import CourseDetailScreen from '../screens/CourseDetailScreen';
import SectionContentScreen from '../screens/SectionContentScreen';
import LessonScreen from '../screens/LessonScreen';

// Import admin screens at the top
import AdminDashboardScreen from '../screens/Admin/AdminDashboardScreen';
import ManageCoursesScreen from '../screens/Admin/ManageCoursesScreen';
import AddEditCourseScreen from '../screens/Admin/AddEditCourseScreen';
import ManageLessonsScreen from '../screens/Admin/ManageLessonsScreen';
import AddEditLessonScreen from '../screens/Admin/AddEditLessonScreen';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

// ---------- MAIN TABS ----------
const MainTabs = () => {
  const insets = useSafeAreaInsets();
  
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarShowLabel: true,
        tabBarActiveTintColor: '#4169E1',
        tabBarInactiveTintColor: '#999',
        tabBarStyle: {
          backgroundColor: '#fff',
          borderTopWidth: 1,
          borderTopColor: '#f0f0f0',
          height: 60 + insets.bottom,
          paddingBottom: insets.bottom,
          paddingTop: 8,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '500',
        },
        tabBarIcon: ({ color }) => {
          let iconName;
          if (route.name === 'Home') iconName = 'home';
          else if (route.name === 'My Courses') iconName = 'book';
          else if (route.name === 'Profile') iconName = 'person';
          return <Ionicons name={iconName} size={24} color={color} />;
        },
      })}
    >
      <Tab.Screen name="Home" component={DashboardScreen} />
      <Tab.Screen name="My Courses" component={MyCoursesScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
};

// ---------- ROOT NAVIGATION ----------
const AppNavigator = () => {
  const [isDbReady, setIsDbReady] = useState(false);

  useEffect(() => {
    const setupDatabase = async () => {
      try {
        console.log('🔄 Initializing database...');
        await initDatabase();
        console.log('✅ Database initialized!');
        
        console.log('Seeding courses...');
        await seedCourses();
        console.log('✅ Courses seeded!');
        
        // Small delay to ensure everything is ready
        setTimeout(() => {
          setIsDbReady(true);
          console.log('✅ Database ready for use!');
        }, 500);
      } catch (error) {
        console.error('❌ Database setup failed:', error);
        // Set ready anyway to show the app
        setIsDbReady(true);
      }
    };

    setupDatabase();
  }, []);

  // Show loading screen while database is being set up
  if (!isDbReady) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#4169E1" />
      </View>
    );
  }

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>

        {/* FIRST SCREEN ON APP START */}
        <Stack.Screen name="Splash" component={SplashScreen} />

        {/* SHOWN ONLY FIRST TIME */}
        <Stack.Screen name="Onboarding" component={OnboardingScreen} />

        {/* AUTH SCREENS */}
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="AdminLogin" component={AdminLoginScreen} />
        {/* ADMIN SCREENS */}
<Stack.Screen name="AdminDashboard" component={AdminDashboardScreen} />
<Stack.Screen name="ManageCourses" component={ManageCoursesScreen} />
<Stack.Screen name="AddEditCourse" component={AddEditCourseScreen} />
<Stack.Screen name="ManageLessons" component={ManageLessonsScreen} />
<Stack.Screen name="AddEditLesson" component={AddEditLessonScreen} />
        <Stack.Screen name="Signup" component={SignupScreen} />

        {/* MAIN APP AFTER LOGIN */}
        <Stack.Screen name="MainTabs" component={MainTabs} />

        {/* COURSE PAGES */}
        <Stack.Screen name="Courses" component={CoursesScreen} />
        <Stack.Screen name="CourseDetail" component={CourseDetailScreen} />
        <Stack.Screen name="Lesson" component={LessonScreen} />
        <Stack.Screen name="SectionContent" component={SectionContentScreen} />

      </Stack.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
});

export default AppNavigator;