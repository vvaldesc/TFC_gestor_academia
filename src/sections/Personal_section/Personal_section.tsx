import React from 'react';
import Calendar_personal from "@/components/AntDesign/calendar/Calendar_personal"

import type { sessionInfoState, ServiceConsumption_type } from '@/models/types';
import useGetDetails from '@/services/client/customhooks/useGetDetails';
import useGetClients from '@/services/client/customhooks/useGetClients';
import useGetEmployees from "@/services/client/customhooks/useGetEmployees";
import useGetServices from "@/services/client/customhooks/useGetServices";

interface PersonalSectionProps {
    sessionInfoState: sessionInfoState;
    // define other props here
  }

const Personal_section: React.FC<PersonalSectionProps> = (sessionInfoState) => {
    // Implement your component logic here
    const { details, loadingDetails } = useGetDetails();
    const { clients, loadingClients } = useGetClients();
    const { employees, loading } = useGetEmployees();
    const { services, loadingServices } = useGetServices();

    // @ts-ignore
    const details_array: ServiceConsumption_type[] = details && details.result && details.result?.data ? details.result.data : [];
    let details_array_filtered: ServiceConsumption_type[] = [];
    switch (sessionInfoState.sessionInfoState.sessionInfo.role) {
        case 'Teachers':
            details_array_filtered = details_array.filter((detail) => detail.employee_id === sessionInfoState.sessionInfoState.sessionInfo.profile?.id);
            break;
            case 'Clients':
            details_array_filtered = details_array.filter((detail) => detail.client_id === sessionInfoState.sessionInfoState.sessionInfo.profile?.id);
            break;
            case 'Students':
             details_array_filtered = details_array.filter((detail) => detail.student_id === sessionInfoState.sessionInfoState.sessionInfo.profile?.id);
            break;
        default:
            break;
    }

    // @ts-ignore
    const clients_array = clients && clients.result && clients.result?.data ? clients.result.data : [];
    // @ts-ignore
    const employees_array = employees && employees.result && employees.result?.data ? employees.result.data : [];
    // @ts-ignore
    const services_array = services && services.result && services.result?.data ? services.result.data : [];
    
    return (
        <>
            <Calendar_personal role={sessionInfoState.sessionInfoState.sessionInfo.role} profileId={1} details={details_array_filtered} services={services_array} />
        </>
    );
};

export default Personal_section;