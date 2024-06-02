import React from 'react';
import { Alert, Space } from 'antd';
const Error_alert = ({ message }) => {
  return <Alert message={message} type="error" showIcon closable />;
};

export default Error_alert;
