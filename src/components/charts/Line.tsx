import React from "react";
import type { Weeklie } from "@/models/types";

import {
  Chart as ChartJS,
  LinearScale,
  CategoryScale,
  PointElement,
  LineElement,
  Legend,
  Tooltip,
  LineController,
} from "chart.js";
import { Chart } from "react-chartjs-2";

ChartJS.register(
  LinearScale,
  CategoryScale,
  PointElement,
  LineElement,
  Legend,
  Tooltip,
  LineController,
);

const labels = ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado", "Domingo"];


interface Props {
    weeklieReports_reports: Weeklie[];
}

export function Line({ weeklieReports_reports }: Props) {
    console.log('weeklieReports_reports');
    console.log(weeklieReports_reports);
    const data = {
        labels,
        datasets: [
            {
                type: "line" as const,
                label: "Reservas",
                borderColor: "rgb(0, 128, 0)",
                borderWidth: 2,
                fill: true,
                data: weeklieReports_reports.map((report) => report.count),            },
        ],
    };

    return <Chart type='bar' data={data} height={200} width={800} />;
}