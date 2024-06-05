import React from 'react';
import Detail from "@/components/AntDesign/cards/Detail"
import type { ServiceConsumption_type } from '@/models/types';

interface DetailCardsProps {
    // Define the props for your component here
    details: ServiceConsumption_type[];
}

const DetailCards: React.FC<DetailCardsProps> = ({ details }) => {
    console.log(details);

    return (
            <div className="detail-cards">
                {details.map((detail, index) => (
                    <Detail key={index} detail={detail} />
                ))}
            </div>
    );
};

export default DetailCards;