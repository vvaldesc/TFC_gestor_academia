import * as React from "react";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import { PickersDay } from "@mui/x-date-pickers/PickersDay";
import dayjs from "dayjs";


export default function Material_calendar({ unavailableDays = [] }) { // Asigna un valor predeterminado
  const isDayUnavailable = (day) => {
    // Verifica si unavailableDays es un arreglo antes de llamar a .some()
    return Array.isArray(unavailableDays) && unavailableDays.some(
      (unavailableDay) => dayjs(day).format("YYYY-MM-DD") === unavailableDay
    );
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DateCalendar
        disablePast={true}
        focusedView={false}
        views={["year", "month", "day"]}
        firstDayOfWeek={1}
        loading={false}
        timezone="system"
        // view={['month','day']}
        // Personalizando el renderizado de los días
        slots={{
          day: PickersDay,
        }}
        slotProps={{
          day: ({ day }) => ({
            // Aquí puedes personalizar el estilo o agregar tooltips
            style: isDayUnavailable(day) ? { backgroundColor: '#ffcccb', color: '#000', pointerEvents: 'none', opacity: 0.5 } : {},
            // Deshabilitar el clic en días no disponibles
            disabled: isDayUnavailable(day),
          }),
        }}
      />
    </LocalizationProvider>
  );
}
