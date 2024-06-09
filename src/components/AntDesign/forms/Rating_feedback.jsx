import React from 'react';
import { Rate } from 'antd';

const App = ({ putDetail }) => <Rate allowHalf defaultValue={2.5} onChange={(rate) => putDetail(rate)} />;

export default App;