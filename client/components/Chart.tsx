"use client";

import React from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

interface AttendeesChartProps {
  confirmed: number;
  peopleLimit: number;
}

const AttendeesChart: React.FC<AttendeesChartProps> = ({
  confirmed,
  peopleLimit,
}) => {
  const data = {
    labels: ["Confirmed", "People Limit"],
    datasets: [
      {
        label: "Guests",
        data: [confirmed, peopleLimit],
        backgroundColor: ["#6366F1", "#4F46E5"],
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
      datalabels: {
        anchor: "end",
        align: "top",
        formatter: (value: number, context: any) => {
          const total = confirmed + peopleLimit;
          const percentage = ((value / total) * 100).toFixed(2);
          return `${percentage}%`;
        },
        color: "#fff",
        font: {
          weight: "bold",
        },
      },
    },
  };

  return <Bar data={data} options={options} />;
};

export default AttendeesChart;
