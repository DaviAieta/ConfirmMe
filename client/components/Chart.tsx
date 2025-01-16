"use client";

import React from "react";
import { Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
} from "chart.js";

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale
);

interface AttendeesChartProps {
  confirmed: number;
  peopleLimit: number;
}

const AttendeesChart: React.FC<AttendeesChartProps> = ({
  confirmed,
  peopleLimit,
}) => {
  const pieData = {
    labels: ["Confirmed", "Remaining"],
    datasets: [
      {
        data: [confirmed, peopleLimit - confirmed],
        backgroundColor: ["#6366F1", "#E5E7EB"],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true,
        position: "bottom" as const,
      },
    },
  };

  return (
    <div className="flex flex-col items-center w-full space-y-8">
      <div className="flex flex-col items-center w-[250px] h-[280px]">
        <div className="relative w-full h-full">
          <Pie data={pieData} options={options} />
        </div>
        <div className="mt-2 text-center">
          <p className="text-sm font-medium">
            <span className="text-indigo-500">Confirmed: </span>
            {((confirmed / peopleLimit) * 100).toFixed(2)}%
          </p>
          <p className="text-sm font-medium">
            <span className="text-gray-400">Remaining: </span>
            {(((peopleLimit - confirmed) / peopleLimit) * 100).toFixed(2)}%
          </p>
        </div>
      </div>
    </div>
  );
};

export default AttendeesChart;
