import React from 'react';
import { SafeAreaView } from 'react-native';
import LoginForm from '../components/loginForm';

export default function Index() {
  return (
    <SafeAreaView className="flex-1 bg-purple-50">
      <LoginForm />
    </SafeAreaView>
  );
}