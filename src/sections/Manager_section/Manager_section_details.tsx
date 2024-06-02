import Details_table from "@/components/AntDesign/tables/Details_table";

import useGetDetails from '@/services/client/customhooks/useGetDetails';

export default function Material_booking_form(props: {sessionInfo: ProfileSession}) {
  const { details, loadingDetails } = useGetDetails();

  return (
    <>
      <Details_table detailsResult={details} loadingDetails={loadingDetails} />
    </>
  );
}
