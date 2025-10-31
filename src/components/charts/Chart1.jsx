import * as React from "react";
import { PieChart } from "@mui/x-charts/PieChart";

export default function Chart1({ totalAmount, totalIncome, totalExpense }) {
  const props = {
    width: 400,
    height: 300,
  };

  const dataObj = {
    totalAmount: Number(totalAmount),
    totalIncome: Number(totalIncome),
    totalExpense: Number(totalExpense),
  };

  const data = [
    { id: 0, value: dataObj.totalAmount, label: "Total Balance" },
    { id: 1, value: dataObj.totalIncome, label: "Total Income" },
    { id: 2, value: dataObj.totalExpense, label: "Total Expense" },
  ];

  return (
    <PieChart
      {...props}
      series={[
        {
          data,
          arcLabel: (item) => `${item.value}`,
          arcLabelMinAngle: 15,
          innerRadius: 50,
          outerRadius: 120,
          paddingAngle: 3,
          cornerRadius: 4,
          highlightScope: { faded: "global", highlighted: "item" },
          faded: {
            innerRadius: 40,
            additionalRadius: -20,
            color: "rgba(0,0,0,0.1)",
          },
          // 🎨 Modern Green Shades
          colors: ["#43A047", "#66BB6A", "#A5D6A7"],
        },
      ]}
      sx={{
        background: "linear-gradient(135deg, #E8F5E9, #F1F8E9)",
        borderRadius: 3,
        boxShadow: "0 4px 15px rgba(0,0,0,0.1)",
        padding: 2,
      }}
      slotProps={{
        legend: {
          direction: "column",
          position: { vertical: "middle", horizontal: "right" },
          padding: 8,
          labelStyle: {
            fontSize: 14,
            fontWeight: 500,
            color: "#2E7D32",
          },
        },
      }}
    />
  );
}
