import React from 'react';
import { Card } from 'antd';
import type {Service} from '@/models/types';

const { Meta } = Card;

import './Card.css';

interface CardProps {
  service: Service;
  handleServiceSelect: (id: number) => void;
  selected: boolean;
}

const Card_component: React.FC<CardProps> = ({ service, handleServiceSelect, selected }) => (
  <Card
    onClick={() => {handleServiceSelect(service.id as number)}}
    hoverable
    className={'service-card' + (selected ? ' selected' : '')}
  >
    <p>{service.name}</p>
  </Card>
);

export default Card_component;