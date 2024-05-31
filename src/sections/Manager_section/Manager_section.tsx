import Profiles_table from "@/components/AntDesign/tables/Profiles_table";
import Details_table from "@/components/AntDesign/tables/Details_table";
// import Courses_table from "@/components/AntDesign/tables/Courses_table";

import useGetProfiles from '@/services/client/customhooks/useGetProfiles';
import useGetDetails from '@/services/client/customhooks/useGetDetails';
// import useGetDetails from '@/services/client/customhooks/useGetCourses';

export default function Material_booking_form(props: {sessionInfo: ProfileSession}) {
  const { profiles, loading } = useGetProfiles();
  const { details, loadingDetails } = useGetDetails();

  return (
    <>
      <Profiles_table profiles={profiles} loading={loading} />
      <Details_table detailsResult={details} loadingDetails={loadingDetails} />
      {/* <Courses_table coursesResult={courses} loadingCourses={loadingCourses} /> */}
    </>
  );
}
