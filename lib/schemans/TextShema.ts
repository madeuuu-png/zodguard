import { object, string } from 'zod';

export const loginSchema = object({
  email: string()
    .min(1, { message: 'El email es obligatorio' })
    .refine(val => val.includes('@'), {
      message: 'El email debe contener el símbolo "@"'
    })
    .refine(
      val => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(val),
      {
        message: 'El formato del email es inválido (ej: usuario@dominio.com)'
      }
    ),
  password: string()
    .min(4, { message: 'La contraseña debe tener al menos 4 caracteres' })
    .max(12, { message: 'La contraseña no puede tener más de 12 caracteres' })
    .refine(val => /[A-Z]/.test(val), {
      message: 'La contraseña debe contener al menos una letra mayúscula'
    })
    .refine(val => /[0-9]/.test(val), {
      message: 'La contraseña debe contener al menos un número'
    })
    .refine(val => /[!@#$%^&*(),.?":{}|<>]/.test(val), {
      message: 'La contraseña debe contener al menos un carácter especial'
    }),
});

export const registerSchema = object({
  name: string()
    .min(1, { message: 'El nombre es obligatorio' })
    .min(3, { message: 'El nombre debe tener al menos 3 caracteres' })
    .max(50, { message: 'El nombre no puede tener más de 50 caracteres' }),
  email: string()
    .min(1, { message: 'El email es obligatorio' })
    .refine(val => val.includes('@'), {
      message: 'El email debe contener el símbolo "@"'
    })
    .refine(
      val => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(val),
      {
        message: 'El formato del email es inválido (ej: usuario@dominio.com)'
      }
    ),
  password: string()
    .min(4, { message: 'La contraseña debe tener al menos 4 caracteres' })
    .max(12, { message: 'La contraseña no puede tener más de 12 caracteres' })
    .refine(val => /[A-Z]/.test(val), {
      message: 'La contraseña debe contener al menos una letra mayúscula'
    })
    .refine(val => /[0-9]/.test(val), {
      message: 'La contraseña debe contener al menos un número'
    })
    .refine(val => /[!@#$%^&*(),.?":{}|<>]/.test(val), {
      message: 'La contraseña debe contener al menos un carácter especial'
    }),
  confirmPassword: string()
    .min(1, { message: 'Debes confirmar tu contraseña' }),
}).refine((data) => data.password === data.confirmPassword, {
  message: 'Las contraseñas no coinciden',
  path: ['confirmPassword'],
});