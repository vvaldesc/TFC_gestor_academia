import React from 'react';
import type { Service } from '@/models/types';
import Card_component from '@/components/AntDesign/cards/Card';

import './Service_cards.css';

interface ServiceCardProps {
    services: Service[];
    handleServiceSelect: (id: number) => void;
    selectedService: number | null;
}

const ServiceCards: React.FC<ServiceCardProps> = ({ services, handleServiceSelect, selectedService }) => {
    return (
        <div className="card-container">
            {services.map((service: Service, index: number) => (
                <Card_component
                    key={index}
                    service={service}
                    handleServiceSelect={handleServiceSelect} // Corrected prop name
                    selected={service.id === selectedService}
                />
            ))}
        </div>
    );
};

export default ServiceCards;