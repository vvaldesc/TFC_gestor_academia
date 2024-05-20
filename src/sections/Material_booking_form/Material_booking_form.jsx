import React from "react";
import Material_calendar from "@/components/Material_calendar/Material_calendar";
import Material_time_picker from "@/components/Material_time_picker/Material_time_picker";
import Material_static_date_time_picker from "@/components/Material_static_date_time_picker/Material_static_date_time_picker";




export default function Material_booking_form() {
  return (
    <>
      {/* <Material_calendar />
      <Material_time_picker /> */}
      <Material_static_date_time_picker />
    </>
  );
}