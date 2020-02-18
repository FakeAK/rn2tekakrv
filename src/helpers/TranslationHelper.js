import * as Localization from 'expo-localization';
import i18n from 'i18n-js';

export default function TranslationHelper() {}

TranslationHelper.translate = (text) => i18n.t(text, { defaultValue: text });

TranslationHelper.setupI18n = () => {
  // TO DO: use JSON instead of this static variables
  const en = {
  };
  const fr = {
    Road: 'Route',
  };

  i18n.fallbacks = true;
  i18n.translations = { fr, en };
  i18n.locale = Localization.locale;
};
