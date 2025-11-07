import { getDatabase, ref, get } from 'firebase/database'
import { t } from 'i18next'

export const validatePassword = (password: string): string => {
  if (!password) return t('validation.requiredField')
  if (password.length < 8 || password.length > 20)
    return t('validation.passwordLength')
  if (!/[0-9]/.test(password)) return t('validation.passwordNumber')
  if (!/^[A-Za-z0-9!?@#$%^&*()\[\]{}<>,._'"\-+=|\/]+$/.test(password))
    return t('validation.passwordInvalidChars')
  if (!/[a-zA-Z]/.test(password)) return t('validation.passwordLatinLetter')
  if (!/[A-Z]/.test(password)) return t('validation.passwordUppercase')
  if (!/[a-z]/.test(password)) return t('validation.passwordLowercase')
  return ''
}

export const validationName = async (name: string): Promise<string> => {
  const trimmedName = name.trim()

  if (!trimmedName) return t('validation.nameRequired')

  // Проверка на длину имени
  if (trimmedName.length > 40) {
    return t('validation.nameLengthExceeded')
  }

  // Разрешаем латинские буквы, цифры, пробелы и спецсимволы
  const namePattern = /^[A-Za-z0-9 !"#$%&'()*+,\-./:;<=>?@[\\\]^_`{|}~]+$/
  if (!namePattern.test(trimmedName)) {
    return t('validation.nameInvalid')
  }

  try {
    // Поиск имени в базе firebase
    const db = getDatabase()
    const usersRef = ref(db, 'Users')
    const snapshot = await get(usersRef)

    if (snapshot.exists()) {
      let nameFound = false

      snapshot.forEach((childSnapshot) => {
        const userData = childSnapshot.val()
        if (userData.name?.toLowerCase() === trimmedName.toLowerCase()) {
          nameFound = true
        }
      })

      if (nameFound) return t('validation.nameExists')
    }
  } catch (error) {
    return t('validation.nameCheckError')
  }

  return ''
}

export const validateEmail = async (
  email: string,
  type: string,
): Promise<string> => {
  if (!email) return t('validation.emailRequired')

  const trimmedEmail = email.trim().toLowerCase()

  if (!/\S+@\S+\.\S+/.test(trimmedEmail)) {
    return t('validation.emailInvalidFormat')
  }

  try {
    const db = getDatabase()
    const usersRef = ref(db, 'Users')
    const snapshot = await get(usersRef)

    if (snapshot.exists()) {
      let emailFound = false

      snapshot.forEach((childSnapshot) => {
        const userData = childSnapshot.val()
        if (userData.email?.toLowerCase() === trimmedEmail) {
          emailFound = true
        }
      })

      if (emailFound && type === 'register') {
        return t('validation.emailExists')
      }

      if (!emailFound && type === 'login') {
        return t('validation.emailNotFound')
      }
    }
  } catch (error) {
    console.error('Firebase error:', error)
    return t('validation.emailCheckError')
  }

  return ''
}

export const validateBirth = (birth: string): string => {
  if (!birth) return t('validation.birthRequired')

  const parts = birth.split('/')
  if (parts.length !== 3) return t('validation.birthInvalid')

  const [monthStr, dayStr, yearStr] = parts
  const month = parseInt(monthStr, 10)
  const day = parseInt(dayStr, 10)
  const year = parseInt(yearStr, 10)

  if (
    isNaN(day) ||
    isNaN(month) ||
    isNaN(year) ||
    day < 1 ||
    day > 31 ||
    month < 1 ||
    month > 12 ||
    year < 1900 ||
    year > new Date().getFullYear()
  ) {
    return t('validation.birthWrong')
  }

  const birthDate = new Date(year, month - 1, day)
  if (
    birthDate.getDate() !== day ||
    birthDate.getMonth() !== month - 1 ||
    birthDate.getFullYear() !== year
  ) {
    return t('validation.birthWrong')
  }

  const today = new Date()
  today.setHours(0, 0, 0, 0)

  if (birthDate >= today) {
    return t('validation.birthInvalid')
  }

  const ageDiff = today.getFullYear() - birthDate.getFullYear()
  const monthDiff = today.getMonth() - birthDate.getMonth()
  const dayDiff = today.getDate() - birthDate.getDate()

  const isUnder18 =
    ageDiff < 18 ||
    (ageDiff === 18 && (monthDiff < 0 || (monthDiff === 0 && dayDiff < 0)))

  if (isUnder18) {
    return t('validation.birthTooYoung')
  }

  return ''
}

export const validateField = async (
  field: string,
  value: string,
  setError: (error: string) => void,
  type?: string,
) => {
  let errorMessage = ''

  switch (field) {
    case 'email':
      errorMessage = (await validateEmail(value, type ?? '')) || ''
      break
    case 'password':
      errorMessage = validatePassword(value) || ''
      break
    case 'name':
      errorMessage = (await validationName(value)) || ''
      break
    case 'birth':
      errorMessage = validateBirth(value) || ''
      break
    default:
      break
  }

  setError(errorMessage)
}
