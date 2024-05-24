import type { Session } from "@auth/core/types";

/*export interface Session {
  user: User;
  expires: Date;
}*/

export interface User {
  name: string;
  email: string;
  image: string;
}

export interface ExtendedEmployee {
  id?:              number;
  teacher_id?:      number;
  student_id?:      null;
  social_security?: string;
  salary?:          number;
  rating?:          string;
  teacher?:         Teacher;
  student?:         Student;
  role?:            string;
}

export interface Client {
  id: number;
  name?: string;
  surname?: string;
  email: string;
  phone_number?: string;
  address?: string;
  city?: string;
  bornDate?: Date;
  created_at?: Date;
  updated_at?: Date;
  username?: string;
  password?: string;
  confirmed?: boolean;
  image?: string;
  active?: boolean;
  [key: string]: any;
}

export interface Employee {
  id?:              number;
  teacher_id?:      number | null;
  student_id?:      number | null;
  social_security?: string;
  salary?:          number;
  role?:            Role;
  teacher?:         Student;
  student?:         Student;
  rating?:          number;
}

export enum Role {
  Student = "student",
  Teacher = "teacher",
}

export interface Student {
  id?:                   number;
  matriculation_number?: string;
  DNI?:                  string;
  employed?:             boolean;
  educational_level?:    string;
  name?:                 string;
  surname?:              string;
  email?:                string;
  phone_number?:         string;
  address?:              string;
  city?:                 string;
  bornDate?:             Date;
  created_at?:           Date;
  updated_at?:           Date;
  username?:             string;
  password?:             string;
  confirmed?:            boolean;
  image?:                string;
  active?:               boolean;
  is_admin?:             boolean;
}

export interface Teacher {
  id:           number;
  is_admin?:     boolean;
  name?:         string;
  surname?:      string;
  email:        string;
  phone_number: string;
  address:      string;
  city:         string;
  bornDate:     Date;
  created_at:   Date;
  updated_at?:   Date;
  username:     string;
  password:     string;
  confirmed:    boolean;
  image?:        string;
  active?:       boolean;
}


export type ClientSession = { OAuth: Session } & { client: Client } & { profilePhotoSrc: string } & { role: string };
export type ProfileSession = { OAuth: Session } & { profile: Client | Student | Teacher } & { profilePhotoSrc: string } & { role: string };

export enum SessionState {
  WithoutSession = 0,
  NeedsRegister = 1,
  Registered = 2,
}

export interface sessionInfoState {
  sessionInfo: ProfileSession;
  sessionState: SessionState;
}

export interface Result {
  data: any,
  table: string,
  count: number
}

export interface SqlProfileByEmail {
  columns:         string[];
  columnTypes:     string[];
  rows:            Array<Array<number | string>>;
  rowsAffected:    number;
  lastInsertRowid: null;
}

export interface usePostClientType {
  sentData: Client | null;
  postClientLoading: boolean;
  postClientError: any;
  postData: any;
}

export interface useCheckProfilePhotoType {
  validPhoto: boolean;
  photoCheckLoading: boolean;
  photoProfileError: any;
}

export enum Weather {
  Sunny = 'Sunny',
  Cloudy = 'Cloudy',
  Rainy = 'Rainy',
  Snowy = 'Snowy',
}
export interface ServiceConsumption_type {
  id:         number;
  service_id:  number;
  employee_id: number;
  client_id:   number;
  rating?:      number;
  price:       number;
  delay?:       number;
  created_at:  Date;
  updated_at?:  Date;
  reserved_at:  Date;
  weather?:     Weather;
}

export interface ServicePredictionPost_type {
    id?:                   number;
    client_id?:            number;
    teacher_id?:           number;
    student_id?:           null;
    delay?:                null;
    service_id?:           number;
    created_at?:           Date;
    updated_at?:           null;
    reserved_at?:          Date;
    rating?:               null;
    price?:                number;
    weather?:              string;
    client_name?:          string;
    teacher_name?:         string;
    student_name?:         null;
    client_surname?:       string;
    teacher_surname?:      string;
    student_surname?:      null;
    client_address?:       string;
    teacher_address?:      string;
    student_address?:      null;
    client_phone_number?:  string;
    teacher_phone_number?: string;
    student_phone_number?: null;
    client_email?:         string;
    teacher_email?:        string;
    student_email?:        null;
    employee_salary?:      number;
}