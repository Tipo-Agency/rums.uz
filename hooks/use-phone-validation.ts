import { useState, useCallback } from 'react'

interface PhoneValidationResult {
  isValid: boolean
  errorMessage: string
  formattedPhone: string
}

export function usePhoneValidation() {
  const [phoneError, setPhoneError] = useState('')

  // Функция для форматирования номера телефона
  const formatPhoneNumber = useCallback((value: string): string => {
    // Удаляем все символы кроме цифр
    const digits = value.replace(/\D/g, '')
    
    // Если начинается с 998, оставляем как есть
    if (digits.startsWith('998')) {
      return `+${digits}`
    }
    
    // Если начинается с 9 (без 998), добавляем +998
    if (digits.startsWith('9') && digits.length === 9) {
      return `+998${digits}`
    }
    
    // Если начинается с 998, но без +, добавляем +
    if (digits.startsWith('998') && digits.length === 12) {
      return `+${digits}`
    }
    
    // Если пользователь вводит +998, оставляем как есть
    if (value.startsWith('+998')) {
      return value
    }
    
    // Если пользователь вводит только цифры после +998
    if (value.startsWith('+998') && /^\+998\d*$/.test(value)) {
      return value
    }
    
    // По умолчанию добавляем +998
    return `+998${digits}`
  }, [])

  // Функция для валидации номера телефона
  const validatePhone = useCallback((value: string): PhoneValidationResult => {
    const formatted = formatPhoneNumber(value)
    
    // Удаляем все символы кроме цифр для проверки
    const digits = formatted.replace(/\D/g, '')
    
    // Проверяем, что номер начинается с 998
    if (!digits.startsWith('998')) {
      return {
        isValid: false,
        errorMessage: 'Номер должен начинаться с +998',
        formattedPhone: formatted
      }
    }
    
    // Проверяем длину номера (998 + 9 цифр = 12 цифр)
    if (digits.length !== 12) {
      return {
        isValid: false,
        errorMessage: 'Номер должен содержать 9 цифр после +998',
        formattedPhone: formatted
      }
    }
    
    // Проверяем, что вторая цифра после 998 (третья цифра) валидна для Узбекистана
    const thirdDigit = digits[2]
    const validThirdDigits = ['3', '5', '7', '8', '9'] // Валидные коды операторов Узбекистана
    
    if (!validThirdDigits.includes(thirdDigit)) {
      return {
        isValid: false,
        errorMessage: 'Неверный код оператора. Используйте номера Beeline, Ucell, UzMobile, Mobiuz или Perfectum',
        formattedPhone: formatted
      }
    }
    
    return {
      isValid: true,
      errorMessage: '',
      formattedPhone: formatted
    }
  }, [formatPhoneNumber])

  // Функция для обработки изменения номера телефона
  const handlePhoneChange = useCallback((value: string, setPhone: (value: string) => void) => {
    const formatted = formatPhoneNumber(value)
    setPhone(formatted)
    
    // Валидируем только если пользователь закончил ввод (больше 4 символов)
    if (formatted.length > 4) {
      const validation = validatePhone(formatted)
      setPhoneError(validation.isValid ? '' : validation.errorMessage)
    } else {
      setPhoneError('')
    }
  }, [formatPhoneNumber, validatePhone])

  // Функция для проверки валидности перед отправкой формы
  const isPhoneValid = useCallback((phone: string): boolean => {
    const validation = validatePhone(phone)
    setPhoneError(validation.isValid ? '' : validation.errorMessage)
    return validation.isValid
  }, [validatePhone])

  return {
    phoneError,
    formatPhoneNumber,
    validatePhone,
    handlePhoneChange,
    isPhoneValid
  }
}
