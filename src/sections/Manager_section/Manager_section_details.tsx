import Details_table from "@/components/AntDesign/tables/Details_table";
import Detail_post_modal from "@/components/AntDesign/modals/Detail_post_modal";

import useGetDetails from '@/services/client/customhooks/useGetDetails';
import useGetClients from '@/services/client/customhooks/useGetClients';
import useGetEmployees from "@/services/client/customhooks/useGetEmployees";
import useGetEmployees from "@/services/client/customhooks/useGetServices";

export default function Manager_section_details(props: {sessionInfo: ProfileSession}) {
  const { details, loadingDetails } = useGetDetails();
  const { clients, loadingClients } = useGetClients();
  const { employees, loading } = useGetEmployees();
  const { services, loadingServices } = useGetServices();

  return (
    <>
      <Detail_post_modal clients={clients} employees={employees} detais={details} services={services} />
      <Details_table detailsResult={details} loadingDetails={loadingDetails} />
    </>
  );
}
