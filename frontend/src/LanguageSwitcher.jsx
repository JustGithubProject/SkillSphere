import React from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from 'antd'; 

const LanguageSwitcher = () => {
  const { i18n } = useTranslation();

  const switchToUkrainian = () => {
    i18n.changeLanguage('uk'); 
  };

  const switchToEnglish = () => {
    i18n.changeLanguage('en');
  };

  return (
    <>
      <Button type="default" onClick={switchToUkrainian} style={{ marginRight: '8px' }}>
        UA
      </Button>
      <Button type="default" onClick={switchToEnglish}>
        EN
      </Button>
    </>
  );
};

export default LanguageSwitcher;
