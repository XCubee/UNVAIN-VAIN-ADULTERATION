'use client';

import { useEffect, useState } from 'react';
import i18next from 'i18next';
import { initReactI18next, useTranslation as useTranslationOrg } from 'react-i18next';
import resourcesToBackend from 'i18next-resources-to-backend';
import LanguageDetector from 'i18next-browser-languagedetector';

import { getOptions, languages } from './settings';

const runsOnServerSide = typeof window === 'undefined';

// Initialize i18next for client side
i18next
  .use(initReactI18next)
  .use(LanguageDetector)
  .use(resourcesToBackend((language, namespace) => import(`../translations/${language}.json`)))
  .init({
    ...getOptions(),
    lng: undefined, // Let the browser detect the language
    detection: {
      order: ['localStorage', 'cookie', 'htmlTag', 'path', 'subdomain'],
      caches: ['localStorage', 'cookie'],
    },
    preload: runsOnServerSide ? languages : [],
  });

export function useTranslation(ns, options) {
  const [lng, setLng] = useState(i18next.resolvedLanguage);
  const ret = useTranslationOrg(ns, options);
  const { i18n } = ret;

  useEffect(() => {
    if (runsOnServerSide) return;
    
    // Listen for language changes
    const handleLanguageChanged = () => {
      setLng(i18next.resolvedLanguage);
    };
    
    i18n.on('languageChanged', handleLanguageChanged);
    return () => {
      i18n.off('languageChanged', handleLanguageChanged);
    };
  }, [i18n]);

  return ret;
}