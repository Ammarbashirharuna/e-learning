import React, { useEffect, useState } from 'react';
import { View, ActivityIndicator } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import AppNavigator from './navigation/AppNavigator';
import { resetDatabase } from './database/db';

export default function App() {
  const [isResetting, setIsResetting] = useState(true);

  useEffect(() => {
    const reset = async () => {
      try {
        console.log('🔄 Resetting database...');
        await resetDatabase();
        console.log(' Database reset complete!');
      } catch (error) {
        console.error(' Reset failed:', error);
      } finally {
        setIsResetting(false);
      }
    };

    // COMMENT THIS OUT AFTER FIRST RUN!
    // reset();
    
    // UNCOMMENT THIS after first successful reset:
    setIsResetting(false);
  }, []);

  if (isResetting) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#4169E1" />
      </View>
    );
  }

  return (
    <SafeAreaProvider>
      <AppNavigator />
    </SafeAreaProvider>
  );
}