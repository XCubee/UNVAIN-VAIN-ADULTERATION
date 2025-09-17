'use client'

import React, { createContext, useContext, useState, useEffect } from 'react'

// Define the list of 22 Indian languages
const INDIAN_LANGUAGES = [
  { code: 'en', name: 'English' },
  { code: 'hi', name: 'हिन्दी (Hindi)' },
  { code: 'bn', name: 'বাংলা (Bengali)' },
  { code: 'te', name: 'తెలుగు (Telugu)' },
  { code: 'mr', name: 'मराठी (Marathi)' },
  { code: 'ta', name: 'தமிழ் (Tamil)' },
  { code: 'ur', name: 'اردو (Urdu)' },
  { code: 'gu', name: 'ગુજરાતી (Gujarati)' },
  { code: 'kn', name: 'ಕನ್ನಡ (Kannada)' },
  { code: 'ml', name: 'മലയാളം (Malayalam)' },
  { code: 'pa', name: 'ਪੰਜਾਬੀ (Punjabi)' },
  { code: 'or', name: 'ଓଡ଼ିଆ (Odia)' },
  { code: 'as', name: 'অসমীয়া (Assamese)' },
  { code: 'mai', name: 'मैथिली (Maithili)' },
  { code: 'sat', name: 'संथाली (Santali)' },
  { code: 'ks', name: 'कॉशुर (Kashmiri)' },
  { code: 'sd', name: 'سنڌي (Sindhi)' },
  { code: 'doi', name: 'डोगरी (Dogri)' },
  { code: 'kok', name: 'कोंकणी (Konkani)' },
  { code: 'mni', name: 'মৈতৈলোন্ (Manipuri)' },
  { code: 'bo', name: 'བོད་སྐད་ (Bodo)' },
  { code: 'sck', name: 'संस्कृत (Sanskrit)' },
]

type Language = {
  code: string
  name: string
}

type LanguageContextType = {
  language: Language
  setLanguage: (language: Language) => void
  languages: Language[]
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<Language>(INDIAN_LANGUAGES[0])

  // Load saved language preference from localStorage on component mount
  useEffect(() => {
    const savedLanguage = localStorage.getItem('language')
    if (savedLanguage) {
      try {
        const parsedLanguage = JSON.parse(savedLanguage)
        setLanguage(parsedLanguage)
      } catch (error) {
        console.error('Failed to parse saved language:', error)
      }
    }
  }, [])

  // Save language preference to localStorage when it changes
  useEffect(() => {
    localStorage.setItem('language', JSON.stringify(language))
  }, [language])

  return (
    <LanguageContext.Provider value={{ language, setLanguage, languages: INDIAN_LANGUAGES }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider')
  }
  return context
}