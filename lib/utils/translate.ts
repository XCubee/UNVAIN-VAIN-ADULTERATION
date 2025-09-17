import { useLanguage } from '../contexts/LanguageContext'

// Import all translation files
import en from '../translations/en.json'
import hi from '../translations/hi.json'
import mr from '../translations/mr.json'
import bn from '../translations/bn.json'

// Define the translations object with all available languages
const translations: Record<string, any> = {
  en,
  hi,
  mr,
  bn
  // Other languages will be added as they are created
}

/**
 * Custom hook to get translated text based on the current language
 * @returns A function that takes a key path and returns the translated text
 */
export function useTranslation() {
  const { language } = useLanguage()
  
  /**
   * Get translated text for a given key path
   * @param keyPath Dot notation path to the translation key (e.g., 'app.name')
   * @param fallback Optional fallback text if translation is not found
   * @returns Translated text or fallback
   */
  const t = (keyPath: string, fallback?: string): string => {
    // Get the translation object for the current language, fallback to English
    const translationObj = translations[language.code] || translations.en
    
    // Split the key path and navigate through the translation object
    const keys = keyPath.split('.')
    let result = translationObj
    
    // Navigate through the nested keys
    for (const key of keys) {
      if (result && typeof result === 'object' && key in result) {
        result = result[key]
      } else {
        // Key not found, return fallback or key path
        return fallback || keyPath
      }
    }
    
    return typeof result === 'string' ? result : fallback || keyPath
  }
  
  return { t }
}