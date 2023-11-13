import * as Localization from 'expo-localization';
import i18n from 'i18n-js';
import en from '../locales/en.json';
import bn from '../locales/bn.json';

i18n.translations = {
  en,
  bn,
};

i18n.locale = Localization.locale;
i18n.fallbacks = true;

export default i18n;
