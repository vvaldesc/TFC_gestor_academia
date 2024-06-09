import React, { useState } from 'react';
import Calendar_personal from "@/components/AntDesign/calendar/Calendar_personal"
import Detail_cards from "@/sections/Detail_cards/Detail_cards"
import type { Dayjs } from 'dayjs';
import dayjs from 'dayjs';

import type { sessionInfoState, ServiceConsumption_type } from '@/models/types';
import { Role } from '@/models/types';
import useGetDetailsProfile from '@/services/client/customhooks/useGetDetailsProfile';
import useGetClients from '@/services/client/customhooks/useGetClients';
import useGetEmployees from "@/services/client/customhooks/useGetEmployees";
import useGetServices from "@/services/client/customhooks/useGetServices";

interface PersonalSectionProps {
    sessionInfoState: sessionInfoState;
    // define other props here
  }

const Personal_section: React.FC<PersonalSectionProps> = (sessionInfoState) => {
    const [selectedDetailsDay, setSelectedDetailsDay] = useState(null as ServiceConsumption_type[] | null);
    const role = sessionInfoState.sessionInfoState.sessionInfo.role;
    const id = sessionInfoState.sessionInfoState.sessionInfo.profile.id;

    // Implement your component logic here
    const { details, loadingDetails } = useGetDetailsProfile(role, id);
    const { clients, loadingClients } = useGetClients();
    const { employees, loading } = useGetEmployees();
    const { services, loadingServices } = useGetServices();

    console.log("details", details);
    console.log("id", id);
    console.log("role", role);

    // @ts-ignore
    const details_array: ServiceConsumption_type[] = details && details.result && details.result?.data ? details.result.data : [];
    console.log("details_array", details_array);

    const handleSelectedDay = (detailsDay: ServiceConsumption_type[]) => {
        setSelectedDetailsDay(detailsDay);
    }

    // @ts-ignore
    const clients_array = clients && clients.result && clients.result?.data ? clients.result.data : [];
    // @ts-ignore
    const employees_array = employees && employees.result && employees.result?.data ? employees.result.data : [];
    // @ts-ignore
    const services_array = services && services.result && services.result?.data ? services.result.data : [];
    
    return (
        <>
            <Calendar_personal 
                role={sessionInfoState.sessionInfoState.sessionInfo.role as Role}
                profileId={1} details={details_array} 
                services={services_array} 
                handleSelectedDay={handleSelectedDay} />
            {selectedDetailsDay && <Detail_cards details={selectedDetailsDay} />}
        </>
    );
};

export default Personal_section;