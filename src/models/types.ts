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
  teacher?:         Teacher;
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
  disciplines?:   Disciplines[];
  turns?:   Turns[];
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
  disciplines?:   Disciplines[];
  turns?:   Turns[];
}


export type ClientSession = { OAuth: Session } & { client: Client } & { profilePhotoSrc: string } & { role: string };
export type ProfileSession = { OAuth: Session } & { profile: Client | Student | Teacher } & { profilePhotoSrc: string } & { role: string };

export enum SessionState {
  WithoutSession = 0,
  NeedsRegister = 1,
  Registered = 2,
}

export enum Disciplines {
  Hairdressing = "Peluquería",
  Stetics = "Estética",
}

export enum Turns {
  Morning = "Diurno",
  Afternoon = "Nocturno",
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

export interface WeatherParams {
  lat: string;
  lon: string;
  units: string;
  lang: string;
}

export interface WeatherParams_req {
  url: string;
  apiKey: string;
  apiHost: string;
  body: WeatherParams;
}
export interface Weather_res {
  city_name?:    string;
  country_code?: string;
  data:         Weather_res_Datum[];
  lat?:          number;
  lon?:          number;
  state_code?:   string;
  timezone?:     string;
}

export interface Weather_res_Datum {
  app_max_temp?:        number;
  app_min_temp?:        number;
  clouds?:              number;
  clouds_hi?:           number;
  clouds_low?:          number;
  clouds_mid?:          number;
  datetime?:            Date;
  dewpt?:               number;
  high_temp?:           number;
  low_temp?:            number;
  max_dhi?:             null;
  max_temp?:            number;
  min_temp?:            number;
  moon_phase?:          number;
  moon_phase_lunation?: number;
  moonrise_ts?:         number;
  moonset_ts?:          number;
  ozone?:               number;
  pop?:                 number;
  precip?:              number;
  pres?:                number;
  rh?:                  number;
  slp?:                 number;
  snow?:                number;
  snow_depth?:          number;
  sunrise_ts?:          number;
  sunset_ts?:           number;
  temp?:                number;
  ts?:                  number;
  uv?:                  number;
  valid_date?:          Date;
  vis?:                 number;
  weather:             Weather_res_category;
  wind_cdir?:           string;
  wind_cdir_full?:      string;
  wind_dir?:            number;
  wind_gust_spd?:       number;
  wind_spd?:            number;
}

export interface Weather_res_category {
  description?: Weather_res_category_Description;
  icon?:        Weather_res_category_Icon;
  code?:        number;
}

export enum Weather_res_category_Description {
  ClearSky = "Clear Sky",
  FewClouds = "Few clouds",
  OvercastClouds = "Overcast clouds",
}

export enum Weather_res_category_Icon {
  C01D = "c01d",
  C02D = "c02d",
  C04D = "c04d",
}