import React, { useState, useEffect } from 'react';
import type { BadgeProps, CalendarProps } from 'antd';
import { Badge, Calendar, Alert } from 'antd';
import type { Dayjs } from 'dayjs';
import dayjs from 'dayjs';
import type { ServiceConsumption_type, Employee, Service } from '@/models/types';
import { Role } from '@/models/types';

import './Calendar_personal.css'

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
  handleSelectedDay: (detailsDay: ServiceConsumption_type[]) => ( void );
}

const getListData = (value: Dayjs, details: ServiceConsumption_type[]) => {
  return details.filter(detail => {
    const reservedDate = dayjs(detail.reserved_at);
    return value.date() === reservedDate.date() 
      && value.month() === reservedDate.month() 
      && value.year() === reservedDate.year();
  });
};

const Calendar_personal: React.FC<Props> = ({ role, profileId, details, services, handleSelectedDay }) => {
  const [value, setValue] = useState(() => dayjs());
  const [selectedValue, setSelectedValue] = useState(() => dayjs());
  const [detailsDay, setDetailsDay] = useState(null as ServiceConsumption_type[] | null);

  const onSelect = (newValue: Dayjs) => {
    setValue(newValue);
    setSelectedValue(newValue);
    const detailsDay = getListData(newValue, details) || [];
    setDetailsDay(detailsDay);
    handleSelectedDay(detailsDay);
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
      <Alert className='w-fit m-auto' message={`Fecha seleccionada: ${selectedValue?.format('YYYY-MM-DD')}`} />
      <Calendar className='mt-8' fullscreen={true} mode='month' cellRender={cellRender} value={value} onSelect={onSelect} onPanelChange={onPanelChange} />
    </>
  );
};

export default Calendar_personal;