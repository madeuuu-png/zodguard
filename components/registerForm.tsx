import React, { useState } from 'react';
import { View, TextInput, Text, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { registerSchema } from '../lib/schemans/TextShema';

interface RegisterFormProps {
  onRegisterSuccess?: (data: { name: string; email: string; password: string }) => void;
}

const RegisterForm = ({ onRegisterSuccess }: RegisterFormProps) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [errors, setErrors] = useState<{
    name?: string;
    email?: string;
    password?: string;
    confirmPassword?: string;
  }>({});

  const handleChange = (name: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = () => {
    const result = registerSchema.safeParse(formData);

    if (!result.success) {
      const fieldErrors: typeof errors = {};
      result.error.issues.forEach(issue => {
        const field = issue.path[0] as keyof typeof errors;
        if (field) {
          fieldErrors[field] = issue.message;
        }
      });
      setErrors(fieldErrors);
    } else {
      setErrors({});
      console.log('Registro válido con datos:', result.data);
      
      // Simular registro exitoso
      Alert.alert(
        '¡Registro exitoso! ✨',
        `Bienvenida ${result.data.name}`,
        [{ text: 'OK' }]
      );
      
      // Callback opcional
      if (onRegisterSuccess) {
        onRegisterSuccess(result.data);
      }
    }
  };

  return (
    <ScrollView className="flex-1 bg-purple-50">
      <View className="min-h-screen justify-center px-6 py-12">
        {/* Logo o icono decorativo */}
        <View className="items-center mb-8">
          <View className="w-20 h-20 bg-purple-500 rounded-full items-center justify-center mb-4">
            <Text className="text-white text-4xl">✨</Text>
          </View>
          <Text className="text-4xl font-bold text-purple-800 mb-2">
            Crear Cuenta
          </Text>
          <Text className="text-purple-500 text-base">
            Únete a nuestra comunidad
          </Text>
        </View>

        {/* Card del formulario */}
        <View className="bg-white rounded-3xl p-6 shadow-xl">
          {/* Name Input */}
          <View className="mb-6">
            <Text className="text-purple-700 font-bold mb-3 text-base">
              Nombre completo
            </Text>
            <TextInput
              className={`bg-purple-50 rounded-2xl px-5 py-4 text-base text-gray-800 ${
                errors.name ? 'border-2 border-pink-400' : 'border-2 border-transparent'
              }`}
              value={formData.name}
              onChangeText={text => handleChange('name', text)}
              placeholder="María García"
              placeholderTextColor="#c4b5fd"
            />
            {errors.name && (
              <View className="bg-pink-50 rounded-xl px-3 py-2 mt-2">
                <Text className="text-pink-600 text-sm font-medium">
                  ⚠️ {errors.name}
                </Text>
              </View>
            )}
          </View>

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

          {/* Confirm Password Input */}
          <View className="mb-6">
            <Text className="text-purple-700 font-bold mb-3 text-base">
              Confirmar contraseña
            </Text>
            <TextInput
              className={`bg-purple-50 rounded-2xl px-5 py-4 text-base text-gray-800 ${
                errors.confirmPassword ? 'border-2 border-pink-400' : 'border-2 border-transparent'
              }`}
              value={formData.confirmPassword}
              onChangeText={text => handleChange('confirmPassword', text)}
              secureTextEntry
              placeholder="••••••••"
              placeholderTextColor="#c4b5fd"
            />
            {errors.confirmPassword && (
              <View className="bg-pink-50 rounded-xl px-3 py-2 mt-2">
                <Text className="text-pink-600 text-sm font-medium">
                  ⚠️ {errors.confirmPassword}
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
              Crear cuenta ✨
            </Text>
          </TouchableOpacity>
        </View>

        {/* Footer */}
        <View className="mt-8 items-center">
          <Text className="text-purple-400 text-sm">
            ¿Ya tienes cuenta?{' '}
            <Text className="text-purple-600 font-bold">Inicia sesión</Text>
          </Text>
        </View>
      </View>
    </ScrollView>
  );
};

export default RegisterForm;