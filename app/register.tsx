import React from 'react';
import { SafeAreaView } from 'react-native';
import RegisterForm from '../components/registerForm';

export default function RegisterScreen() {
  const handleRegisterSuccess = (data: { name: string; email: string; password: string }) => {
    console.log('Usuario registrado:', data);
    // Aquí puedes navegar a otra pantalla, guardar en AsyncStorage, etc.
  };

  return (
    <SafeAreaView className="flex-1 bg-purple-50">
      <RegisterForm onRegisterSuccess={handleRegisterSuccess} />
    </SafeAreaView>
  );
}