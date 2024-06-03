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

export default function Manager_section_classes(props: {sessionInfo: ProfileSession}) {
    const { teachers, loadingTeachers } = useGetTeachers();
    const { enrolments, loadingEnrolments } = useGetEnrolments();
    const { courses, loadingCourses } = useGetCourses();
    const { faults, loadingFaults } = useGetFaults();
    const { subjects, loadingSubjects } = useGetSubjects();
    const { students, loadingStudents } = useGetStudents();

    // @ts-ignore
    const subject_array = subjects && subjects.result && subjects.result.data ? subjects.result.data : [];
    // @ts-ignore
    const enrolments_array = enrolments && enrolments.result && enrolments.result.data ? enrolments.result.data : [];
    // @ts-ignore
    const students_array = students && students.result && students.result.data ? students.result.data : [];

  return (
    <>
      <Docent_post_modal />
      <Subject_post_modal />
      <Course_post_modal />
      <Fault_post_modal enrolments={enrolments_array} subjects={subject_array} students={students_array} />

      <Teachers_table coursesResult={teachers} loadingCourses={loadingTeachers} />
      <Courses_table coursesResult={courses} loadingCourses={loadingCourses} />
      <Enrolments_table enrolmentResult={enrolments} loadingEnrolments={loadingEnrolments} />
      <StudentSubjectFaults_table coursesFauts={faults} loadingFaults={loadingFaults} />
    </>
  );
}
