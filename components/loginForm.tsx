import React, { useState } from 'react';
import { View, TextInput, Text, TouchableOpacity, ScrollView } from 'react-native';
import { loginSchema } from '../lib/schemans/TextShema';

const LoginForm = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});

  const handleChange = (name: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = () => {
    const result = loginSchema.safeParse(formData);

    if (!result.success) {
      const fieldErrors: { email?: string; password?: string } = {};
      result.error.issues.forEach(issue => {
        const field = issue.path[0];
        if (field === 'email' || field === 'password') {
          fieldErrors[field] = issue.message;
        }
      });
      setErrors(fieldErrors);
    } else {
      setErrors({});
      console.log('Login válido con datos:', result.data);
      // Aquí podrías llamar a tu backend o navegación
    }
  };

  return (
    <ScrollView className="flex-1 bg-purple-50">
      <View className="min-h-screen justify-center px-6 py-12">
        {/* Logo o icono decorativo */}
        <View className="items-center mb-8">
          <View className="w-20 h-20 bg-purple-500 rounded-full items-center justify-center mb-4">
            <Text className="text-white text-4xl">💜</Text>
          </View>
          <Text className="text-4xl font-bold text-purple-800 mb-2">
            Bienvenida
          </Text>
          <Text className="text-purple-500 text-base">
            Nos alegra verte de nuevo
          </Text>
        </View>

        {/* Card del formulario */}
        <View className="bg-white rounded-3xl p-6 shadow-xl">
          {/* Email Input */}
          <View className="mb-6">
            <Text className="text-purple-700 font-bold mb-3 text-base">
              Correo electrónico
            </Text>
            <TextInput
              className={`bg-purple-50 rounded-2xl px-5 py-4 text-base text-gray-800 ${
                errors.email ? 'border-2 border-pink-400' : 'border-2 border-transparent'
              }`}
              value={formData.email}
              onChangeText={text => handleChange('email', text)}
              keyboardType="email-address"
              autoCapitalize="none"
              placeholder="usuario@gmail.com"
              placeholderTextColor="#c4b5fd"
            />
            {errors.email && (
              <View className="bg-pink-50 rounded-xl px-3 py-2 mt-2">
                <Text className="text-pink-600 text-sm font-medium">
                  ⚠️ {errors.email}
                </Text>
              </View>
            )}
          </View>

          {/* Password Input */}
          <View className="mb-6">
            <Text className="text-purple-700 font-bold mb-3 text-base">
              Contraseña
            </Text>
            <TextInput
              className={`bg-purple-50 rounded-2xl px-5 py-4 text-base text-gray-800 ${
                errors.password ? 'border-2 border-pink-400' : 'border-2 border-transparent'
              }`}
              value={formData.password}
              onChangeText={text => handleChange('password', text)}
              secureTextEntry
              placeholder="••••••••"
              placeholderTextColor="#c4b5fd"
            />
            {errors.password && (
              <View className="bg-pink-50 rounded-xl px-3 py-2 mt-2">
                <Text className="text-pink-600 text-sm font-medium">
                  ⚠️ {errors.password}
                </Text>
              </View>
            )}
          </View>

          {/* Botón de submit */}
          <TouchableOpacity
            onPress={handleSubmit}
            className="bg-purple-600 rounded-2xl py-5 shadow-lg active:opacity-90"
            activeOpacity={0.85}
          >
            <Text className="text-white text-center font-bold text-lg">
              Iniciar sesión ✨
            </Text>
          </TouchableOpacity>

          {/* Link de contraseña olvidada */}
          <TouchableOpacity className="mt-4">
            <Text className="text-purple-500 text-center text-sm font-medium">
              ¿Olvidaste tu contraseña?
            </Text>
          </TouchableOpacity>
        </View>

        {/* Footer */}
        <View className="mt-8 items-center">
          <Text className="text-purple-400 text-sm">
            ¿No tienes cuenta?{' '}
            <Text className="text-purple-600 font-bold">Regístrate</Text>
          </Text>
        </View>
      </View>
    </ScrollView>
  );
};

export default LoginForm;