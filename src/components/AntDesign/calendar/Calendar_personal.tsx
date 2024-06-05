import React, { useState } from 'react';
import type { BadgeProps, CalendarProps } from 'antd';
import { Badge, Calendar, Alert } from 'antd';
import type { Dayjs } from 'dayjs';
import type { ServiceConsumption_type, Employee, Service } from '@/models/types';
import { Role } from '@/models/types';
import dayjs from 'dayjs';

import './Calendar_personal.css'

const getListData = (value: Dayjs, details: ServiceConsumption_type[]) => {
  let listData = [];
  for (let index = 0; index < details.length; index++) {
    if (value.day() === new Date(details[index].reserved_at).getDay() 
    && value.month() === new Date(details[index].reserved_at).getMonth() 
    && value.year() === new Date(details[index].reserved_at).getFullYear()){
      listData.push({ id: details[index].id, service_name: details[index].service_name, state: details[index].state });
    }
  }
  return listData || [];
};

const getMonthData = (value: Dayjs) => {
  if (value.month() === 8) {
    return 1394;
  }
};

interface Props {
  role: Role;
  profileId: number;
  details: ServiceConsumption_type[];
  services: Service[];
}

const Calendar_personal: React.FC<Props> = ({ role, profileId, details, services }) => {
  const [value, setValue] = useState(() => dayjs());
  const [selectedValue, setSelectedValue] = useState(() => dayjs());

  console.log({ role, profileId, details, services });

  const onSelect = (newValue: Dayjs) => {
    setValue(newValue);
    setSelectedValue(newValue);
  };

  const onPanelChange = (newValue: Dayjs) => {
    setValue(newValue);
  };

  const monthCellRender = (value: Dayjs) => {
    const num = getMonthData(value);
    return num ? (
      <div className="notes-month">
        <section>{num}</section>
        <span>Backlog number</span>
      </div>
    ) : null;
  };

  const dateCellRender = (value: Dayjs) => {
    const mapStateToStatus = (state: string): BadgeProps['status'] => {
      switch (state) {
        case 'Pending':
          return 'processing';
        case 'Cancelled':
          return 'error';
        case 'Completed':
          return 'success';
        default:
          return 'default';
      }
    };
  
    const eventsForThisDay = details.filter(
      (item) => {
        return dayjs(item.reserved_at).startOf('day').isSame(value.startOf('day'))
      }
    );
  
    console.log({ eventsForThisDay });
  
    return (
      <ul className="events">
        {getListData(value, details).map((item) => (
          <li key={item.id}>
            <Badge status={mapStateToStatus(item.state as string)} text={item.service_name} />
          </li>
        ))}
      </ul>
    );
  };

  const cellRender: CalendarProps<Dayjs>['cellRender'] = (current, info) => {
    if (info.type === 'date') return dateCellRender(current);
    if (info.type === 'month') return monthCellRender(current);
    return info.originNode;
  };
  return (
    <>
      <Alert message={`You selected date: ${selectedValue?.format('YYYY-MM-DD')}`} />
      <Calendar cellRender={cellRender}  value={value} onSelect={onSelect} onPanelChange={onPanelChange} />    </>
  );
};

export default Calendar_personal;