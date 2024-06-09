import React from 'react';
import Rating_feedback from '@/components/AntDesign/forms/Rating_feedback';
import putDetail from "@/services/client/fetching/hooks/putDetail";

const Feedback_form = ({serviceConsumption_Id}) => {
    // Your code here
    const rateHandler = (rate) => {
        const detail = {};
        detail.id = serviceConsumption_Id;
        detail.rate = rate * 2;
        console.log(detail);
        putDetail(detail);
        window.location.href = "/perfil";
    };

    return (
        <Rating_feedback putDetail={rateHandler}/>
    );
};

export default Feedback_form;