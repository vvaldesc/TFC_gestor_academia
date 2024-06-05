import type { sessionInfoState } from "@/models/types";
import { ConfigProvider } from 'antd';

import Details_table from "@/components/AntDesign/tables/Details_table";
import Detail_post_modal from "@/components/AntDesign/modals/Detail_post_modal";

import useGetDetails from '@/services/client/customhooks/useGetDetails';
import useGetClients from '@/services/client/customhooks/useGetClients';
import useGetEmployees from "@/services/client/customhooks/useGetEmployees";
import useGetServices from "@/services/client/customhooks/useGetServices";

export default function Manager_section_details(props: {sessionInfo: sessionInfoState}) {
  const { details, loadingDetails } = useGetDetails();
  const { clients, loadingClients } = useGetClients();
  const { employees, loading } = useGetEmployees();
  const { services, loadingServices } = useGetServices();

      console.log({ details, clients, employees, services });

      // @ts-ignore
      const details_array = details && details.result && details.result?.data ? details.result.data : [];
      // @ts-ignore
      const clients_array = clients && clients.result && clients.result?.data ? clients.result.data : [];
      // @ts-ignore
      const employees_array = employees && employees.result && employees.result?.data ? employees.result.data : [];
      // @ts-ignore
      const services_array = services && services.result && services.result?.data ? services.result.data : [];
      
      console.log({ details_array, clients_array, employees_array, services_array });

  return (
    <>
          <ConfigProvider
        theme={{
          token: {
            colorPrimary: '#ff69d4',
            borderRadius: 5,
            colorBgElevated: '#fff1fa',
            colorLinkHover: '#ff69d4',
            colorLinkActive: '#ff69d4',
          },
        }}
      >
        <Details_table detailsResult={details} loadingDetails={loadingDetails} />
        <Detail_post_modal clients={clients_array} employees={employees_array} details={details_array} services={services_array} />
      </ConfigProvider>
    </>
  );
}
