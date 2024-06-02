import React from "react";
import type { Reports } from "@/models/types";

import {
  Chart as ChartJS,
  LinearScale,
  CategoryScale,
  BarElement,
  PointElement,
  LineElement,
  Legend,
  Tooltip,
  LineController,
  BarController,
} from "chart.js";
import { Chart } from "react-chartjs-2";

ChartJS.register(
  LinearScale,
  CategoryScale,
  BarElement,
  PointElement,
  LineElement,
  Legend,
  Tooltip,
  LineController,
  BarController
);

const labels = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];


interface Props {
    balance_reports: Reports;
}

export function MultiType({ balance_reports }: Props) {
    const data = {
        labels,
        datasets: [
            {
                type: "line" as const,
                label: "Sumatorio",
                borderColor: "rgb(0, 128, 0)",
                borderWidth: 2,
                fill: false,
                data: balance_reports.total.map((balance) => balance.totalBalance),
            },
            {
                type: "bar" as const,
                label: "Mensualidad alimnos",
                backgroundColor: "rgb(75, 192, 192)",
                data: balance_reports.mensualities.map((mensualitie) => mensualitie.total_paid),
                borderColor: "white",
                borderWidth: 2,
            },
            {
                type: "bar" as const,
                label: "Ganancias citas",
                backgroundColor: "rgb(255, 165, 0)",
                data: balance_reports.details.map((detail) => detail.details_income),
            },
            {
                type: "bar" as const,
                label: "Nóminas",
                backgroundColor: "rgb(255, 0, 0)",
                data: balance_reports.payrolls.map((payroll) => (payroll.total_paid) * -1),
            },
        ],
    };

    return <Chart type='bar' data={data} height={500} width={800} />;
}