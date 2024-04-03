"use client";

import React, { useEffect, useRef } from "react";
import Chart from "chart.js/auto";

interface Props {
  data: {
    id: number;
    item_name: string;
    owner: string;
    status: string;
    comments: string | null;
    type: string;
  }[];
}

const ChartComponent: React.FC<Props> = ({ data }) => {
  const chartRef = useRef<HTMLCanvasElement>(null);
  const chartInstanceRef = useRef<Chart | null>(null);

  useEffect(() => {
    if (chartRef.current) {
      const ctx = chartRef.current.getContext("2d");
      if (ctx) {
        if (chartInstanceRef.current) {
          chartInstanceRef.current.destroy();
        }

        const filteredData = data.filter(
          (item) =>
            (item.status === "Yes" || item.status === "No") &&
            (item.type === "Required resources" ||
              item.type === "Initial Planning")
        );

        const groupedData = filteredData.reduce((acc, item) => {
          const key = `${item.status}-${item.type}`;
          if (!acc[key]) {
            acc[key] = 0;
          }
          acc[key]++;
          return acc;
        }, {} as { [key: string]: number });

        const labels = Object.keys(groupedData).map((key) => {
          const [status, type] = key.split("-");
          return `${status} - ${type}`;
        });

        const counts = Object.values(groupedData);

        chartInstanceRef.current = new Chart(ctx, {
          type: "bar",
          data: {
            labels: labels,
            datasets: [
              {
                label: "Count",
                data: counts,
                backgroundColor: "rgba(54, 162, 235, 0.5)",
                borderColor: "rgba(54, 162, 235, 1)",
                borderWidth: 1,
              },
            ],
          },
          options: {
            scales: {
              y: {
                beginAtZero: true,
                ticks: {
                  stepSize: 1,
                  callback: (value) => (value === 1 ? "Yes" : "No"),
                },
              },
              x: {
                title: {
                  display: true,
                  text: "Type",
                },
              },
            },
          },
        });
      }
    }
  }, [data]);

  return <canvas ref={chartRef} />;
};

export default ChartComponent;
