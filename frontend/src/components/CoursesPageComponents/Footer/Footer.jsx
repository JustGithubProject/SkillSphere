import React from 'react';
import { Layout, Typography } from 'antd';
import { useTranslation } from 'react-i18next';

const { Footer } = Layout;
const { Text } = Typography;

const CustomFooter = () => {
  const { t } = useTranslation();

  return (
    <Footer style={{ textAlign: 'center', backgroundColor: '#001529', padding: '20px 0' }}>
      <Text style={{ color: 'white', opacity: 0.7, fontSize: '14px' }}>
        &copy; {new Date().getFullYear()} {t('All Rights Reserved')}
      </Text>
    </Footer>
  );
};

export default CustomFooter;
