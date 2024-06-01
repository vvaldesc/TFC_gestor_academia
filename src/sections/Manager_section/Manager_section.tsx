import Profiles_table from "@/components/AntDesign/tables/Profiles_table";
import Details_table from "@/components/AntDesign/tables/Details_table";
import Courses_table from "@/components/AntDesign/tables/Courses_table";
import Teachers_table from "@/components/AntDesign/tables/Teachers_table";
import Enrolments_table from "@/components/AntDesign/tables/Enrolments_table";

import useGetProfiles from '@/services/client/customhooks/useGetProfiles';
import useGetDetails from '@/services/client/customhooks/useGetDetails';
import useGetCourses from '@/services/client/customhooks/useGetCourses';
import useGetTeachers from '@/services/client/customhooks/useGetTeachers';
import useGetEnrolments from '@/services/client/customhooks/useGetEnrolments';

export default function Material_booking_form(props: {sessionInfo: ProfileSession}) {
  const { profiles, loading } = useGetProfiles();
  const { details, loadingDetails } = useGetDetails();
  const { courses, loadingCourses } = useGetCourses();
  const { enrolments, loadingEnrolments } = useGetEnrolments();
  const { teachers, loadingTeachers } = useGetTeachers();

  console.log(enrolments);

  return (
    <>
      <Profiles_table profiles={profiles} loading={loading} />
      <p>Details_table</p>
      <Details_table detailsResult={details} loadingDetails={loadingDetails} />
      <p>Courses_table</p>
      <Courses_table coursesResult={courses} loadingCourses={loadingCourses} />
      <p>Teachers_table</p>
      <Teachers_table coursesResult={teachers} loadingCourses={loadingTeachers} />
      <p>Enrolments_table</p>
      <Enrolments_table enrolmentResult={enrolments} loadingEnrolments={loadingEnrolments} />
    </>
  );
}
