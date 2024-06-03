import React from 'react';
import type { StatisticProps } from 'antd';
import { Col, Row, Statistic } from 'antd';
import CountUp from 'react-countup';
import type { Reports } from "@/models/types";
import { color } from 'framer-motion';

const formatter: StatisticProps['formatter'] = (value) => (
  <CountUp end={value as number} separator="," />
);

interface Props {
  balance_reports: Reports;
}

const BalanceDisplay: React.FC<Props> = ({ balance_reports }) => {

  console.log('balance_reports');
  console.log(balance_reports);

  const monthNumber = new Date().getMonth() - 1;
  console.log(monthNumber);


  return (
<Row gutter={16}>
  {balance_reports.mensualities[monthNumber] && 
    <Col span={12}>
      <Statistic title="Mensualidad alumnos" value={"+"+balance_reports.mensualities[monthNumber].total_paid} formatter={formatter} />
    </Col>
  }
  {balance_reports.details[monthNumber] && 
    <Col span={12}>
      <Statistic title="Ganancias citas" value={"+"+balance_reports.details[monthNumber].details_income} precision={2} formatter={formatter} />
    </Col>
  }
  {balance_reports.payrolls[monthNumber] && 
    <Col span={12}>
      <Statistic title="Nóminas" value={"-"+balance_reports.payrolls[monthNumber].total_paid} precision={2} formatter={formatter} />
    </Col>
  }
  {balance_reports.total[monthNumber] && 
    <Col span={12}>
      <Statistic title="Balance total" value={"+"+balance_reports.total[monthNumber].totalBalance} precision={2} formatter={formatter} />
    </Col>
  }
</Row>
  );
};

export default BalanceDisplay;