import type { ProfileSession } from "@/models/types";

import Courses_table from "@/components/AntDesign/tables/Courses_table";
import Teachers_table from "@/components/AntDesign/tables/Teachers_table";
// import Students_table from "@/components/AntDesign/tables/Students_table";
import Enrolments_table from "@/components/AntDesign/tables/Enrolments_table";
import StudentSubjectFaults_table from "@/components/AntDesign/tables/StudentSubjectFaults_table.";
import Docent_post_modal from "@/components/AntDesign/modals/Docent_post_modal";
import Fault_post_modal from "@/components/AntDesign/modals/Fault_post_modal";
import Subject_post_modal from "@/components/AntDesign/modals/Subject_post_modal";
import Course_post_modal from "@/components/AntDesign/modals/Course_post_modal";

import useGetCourses from '@/services/client/customhooks/useGetCourses';
import useGetTeachers from '@/services/client/customhooks/useGetTeachers';
import useGetEnrolments from '@/services/client/customhooks/useGetEnrolments';
import useGetFaults from '@/services/client/customhooks/useGetFaults';
import useGetSubjects from '@/services/client/customhooks/useGetSubjects';
import useGetStudents from '@/services/client/customhooks/useGetStudents';
import useGetDisciplines from '@/services/client/customhooks/useGetDisciplines';

export default function Manager_section_classes(props: {sessionInfo: ProfileSession}) {
    const { teachers, loadingTeachers } = useGetTeachers();
    const { enrolments, loadingEnrolments } = useGetEnrolments();
    const { courses, loadingCourses } = useGetCourses();
    const { faults, loadingFaults } = useGetFaults();
    const { subjects, loadingSubjects } = useGetSubjects();
    const { students, loadingStudents } = useGetStudents();
    const { disciplines, loadingDisciplines } = useGetDisciplines();

    // @ts-ignore
    const subject_array = subjects && subjects.result && subjects.result.data ? subjects.result.data : [];
    // @ts-ignore
    const enrolments_array = enrolments?.result?.data || [];
    // @ts-ignore
    const students_array = students && students.result && students.result.data ? students.result.data : [];
    // @ts-ignore
    const teachers_array = teachers?.result?.data || [];
    // @ts-ignore
    const courses_array = courses?.result?.data || [];
    // @ts-ignore
    const disciplines_array = disciplines?.result?.data || [];

    console.log('disciplines_array');
    console.log(disciplines_array);
  return (
    <>
      <Docent_post_modal />
      <Subject_post_modal teachers={teachers_array} courses={courses_array} />
      <Course_post_modal disciplines={disciplines_array} />
      <Fault_post_modal enrolments={enrolments_array} subjects={subject_array} students={students_array} />

      <Teachers_table coursesResult={teachers} loadingCourses={loadingTeachers} />
      <Courses_table coursesResult={courses} loadingCourses={loadingCourses} />
      <Enrolments_table enrolmentResult={enrolments} loadingEnrolments={loadingEnrolments} />
      <StudentSubjectFaults_table coursesFauts={faults} loadingFaults={loadingFaults} />
    </>
  );
}
