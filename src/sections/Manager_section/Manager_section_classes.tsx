// import React, { useState, useEffect } from 'react';

import type { sessionInfoState, Teacher, Student, Employee } from "@/models/types";
import { ConfigProvider } from 'antd';

import Courses_table from "@/components/AntDesign/tables/Courses_table";
import Teachers_table from "@/components/AntDesign/tables/Teachers_table";
import Students_table from "@/components/AntDesign/tables/Students_table";
import Enrolments_table from "@/components/AntDesign/tables/Enrolments_table";
import StudentSubjectFaults_table from "@/components/AntDesign/tables/StudentSubjectFaults_table.";
import Docent_post_modal from "@/components/AntDesign/modals/Docent_post_modal";
import Fault_post_modal from "@/components/AntDesign/modals/Fault_post_modal";
import Subject_post_modal from "@/components/AntDesign/modals/Subject_post_modal";
import Enrolments_post_modal from "@/components/AntDesign/modals/Enrolments_post_modal";
import Course_post_modal from "@/components/AntDesign/modals/Course_post_modal";

import useGetCourses from '@/services/client/customhooks/useGetCourses';
import useGetTeachers from '@/services/client/customhooks/useGetTeachers';
import useGetEnrolments from '@/services/client/customhooks/useGetEnrolments';
import useGetFaults from '@/services/client/customhooks/useGetFaults';
import useGetSubjects from '@/services/client/customhooks/useGetSubjects';
import useGetStudents from '@/services/client/customhooks/useGetStudents';
import useGetDisciplines from '@/services/client/customhooks/useGetDisciplines';

export default function Manager_section_classes(props: {sessionInfo: sessionInfoState}) {
  // const [teachers_ar, setTeachers] = useState<Teacher[] | any[]>([]);
  // const [students_ar, setStudents] = useState<Student[] | any[]>([]);
  
    const { teachers, loadingTeachers } = useGetTeachers();
    const { enrolments, loadingEnrolments } = useGetEnrolments();
    const { courses, loadingCourses } = useGetCourses();
    const { faults, loadingFaults } = useGetFaults();
    const { subjects, loadingSubjects } = useGetSubjects();
    const { students, loadingStudents } = useGetStudents();
    const { disciplines, loadingDisciplines } = useGetDisciplines();

      //   // Cargar los datos en el estado cuando se hayan obtenido
      // useEffect(() => {
      //     if (!loadingTeachers) {
      //         setTeachers(teachers);
      //     }
      // }, [teachers, loadingTeachers]);
  
      // useEffect(() => {
      //     if (!loadingStudents) {
      //         setStudents(students);
      //     }
      // }, [students, loadingStudents]);



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

    // const addTeacher = (values: Teacher & Employee) => {
    //     console.log('addTeacher', values);
    //     console.log('teachers_array', teachers_array);
    //     values.id = teachers_array[teachers_array.length - 1].Teachers.id + 1 || 1;
    //     const employee = {
    //       id: teachers_array[teachers_array.length - 1].Employees.id + 1 || 1,
    //       salary: values.salary,
    //       teacher_id: values.id,
    //       social_security: values.social_security,
    //     }
    //     const value = {
    //       Teachers: values,
    //       Employees: employee
    //     }
    //     teachers_array.push(value);
    //     console.log('teachers_array', teachers_array);
    //     setTeachers(teachers_array);
    // }

    // const addStudent = (values: Student) => {
    //   console.log('Students');
    //   values.id = students_array[students_array.length - 1].id + 1 || 1;
    //   console.log(students_array);
    //     console.log('addStudent', values);
    //     students_array.push(values);
    //     console.log('students_array', students_array);
    //     setStudents(students_array);
    // }
  

    // const newDocent = (values: any, role: string) => {
    //     console.log('newDocent', values, role);
    //     role === 'Teacher' ? addTeacher(values) : addStudent(values);
    // }

    

  return (
    <>
      <ConfigProvider
        theme={{
          token: {
            colorPrimary: '#ea7af4',
            borderRadius: 5,
            colorBgElevated: '#fff1fa',
            colorLinkHover: '#ff69d4',
            colorLinkActive: '#ff69d4',
          },
        }}
      >
        <p>Profesores</p>
        <Docent_post_modal />
        <Teachers_table teachersResult={teachers} loadingTeachers={loadingTeachers} />

        <p>Estudiantes</p>
        <Students_table studentsResult={students_array} loadingStudents={loadingStudents} />

        <p>Cursos</p>
        <Course_post_modal disciplines={disciplines_array} />
        <Courses_table coursesResult={courses} loadingCourses={loadingCourses} />

        <p>Matrículas</p>
        <Subject_post_modal teachers={teachers_array} courses={courses_array} />
        <Enrolments_post_modal students={students_array} subjects={subject_array} />
        <Enrolments_table enrolmentResult={enrolments} loadingEnrolments={loadingEnrolments} />

        <p>Faltas</p>
        <Fault_post_modal enrolments={enrolments_array} subjects={subject_array} students={students_array} />
        <StudentSubjectFaults_table coursesFauts={faults} loadingFaults={loadingFaults} />
      </ConfigProvider>
    </>
  );
}
