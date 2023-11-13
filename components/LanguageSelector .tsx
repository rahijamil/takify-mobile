import React from 'react';
import { View, Button } from 'react-native';
import i18n from '../config/localization';
import AsyncStorage from '@react-native-async-storage/async-storage';

const LanguageSelector = () => {
  const setLanguage = async (language: 'en' | 'bn') => {
    i18n.locale = language;
    await AsyncStorage.setItem('preferredLanguage', language);
  };

  return (
    <View>
      <Button title="English" onPress={() => setLanguage('en')} />
      <Button title="বাংলা" onPress={() => setLanguage('bn')} />
    </View>
  );
};

export default LanguageSelector;
