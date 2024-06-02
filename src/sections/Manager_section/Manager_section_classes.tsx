import Courses_table from "@/components/AntDesign/tables/Courses_table";
import Teachers_table from "@/components/AntDesign/tables/Teachers_table";
// import Students_table from "@/components/AntDesign/tables/Students_table";
import Enrolments_table from "@/components/AntDesign/tables/Enrolments_table";

import useGetCourses from '@/services/client/customhooks/useGetCourses';
import useGetTeachers from '@/services/client/customhooks/useGetTeachers';
import useGetEnrolments from '@/services/client/customhooks/useGetEnrolments';
// import useGetEnrolments from '@/services/client/customhooks/useGetEnrolments';

export default function Manager_section_classes(props: {sessionInfo: ProfileSession}) {
    const { teachers, loadingTeachers } = useGetTeachers();
    const { enrolments, loadingEnrolments } = useGetEnrolments();
    const { courses, loadingCourses } = useGetCourses();

    console.log(enrolments);

  return (
    <>
      <Teachers_table coursesResult={teachers} loadingCourses={loadingTeachers} />
      <Courses_table coursesResult={courses} loadingCourses={loadingCourses} />
      <Enrolments_table enrolmentResult={enrolments} loadingEnrolments={loadingEnrolments} />
    </>
  );
}
