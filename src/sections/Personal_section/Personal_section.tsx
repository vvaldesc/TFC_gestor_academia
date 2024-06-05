import React from 'react';
import Calendar_personal from "@/components/AntDesign/calendar/Calendar_personal"

import type { sessionInfoState } from '@/models/types';

interface PersonalSectionProps {
    // Define the props for your component here
    sessionInfoState: sessionInfoState;
}

const Personal_section: React.FC<PersonalSectionProps> = (sessionInfoState) => {
    // Implement your component logic here

    return (
        <>
            <Calendar_personal />
        </>
    );
};

export default Personal_section;