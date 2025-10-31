import React, { useEffect, useState } from "react";
import DashLayout from "../../components/layout/DashLayout";
import axios from "axios";
import { BASE_URL } from "../../utils";
import { apiEndPoints } from "../../constant/apiEndPoints";
import Cookies from "js-cookie";
import { Box, Stack, Typography } from "@mui/material";
import { MdOutlinePayment, MdOutlineAccountBalance } from "react-icons/md";
import { FaMoneyBillWave } from "react-icons/fa";
import Chart1 from "../../components/charts/Chart1";
import { BarChart } from "@mui/x-charts";

const green = {
  main: "#16a34a",
  light: "#4ade80",
  dark: "#15803d",
};

const Dashboard = () => {
  const [data, setData] = useState({});

  const fecthData = async () => {
    try {
      const apiUrl = `${BASE_URL}${apiEndPoints.getTracker}`;
      const response = await axios.get(apiUrl, {
        headers: {
          Authorization: `Bearer ${Cookies.get("token")}`,
        },
      });
      setData(response.data?.data[0] || {});
    } catch (error) {
      console.log("tracker error", error);
    }
  };

  useEffect(() => {
    fecthData();
  }, []);

  const StatCard = ({ icon, title, value }) => (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="space-between"
      width={{ xs: "100%", sm: "30%" }}
      p={3}
      boxShadow={3}
      borderRadius={3}
      bgcolor="white"
      sx={{
        borderTop: `4px solid ${green.main}`,
        transition: "0.3s",
        "&:hover": { transform: "translateY(-3px)", boxShadow: 5 },
      }}
    >
      <Box display="flex" alignItems="center" gap={1}>
        {icon}
        <Typography fontWeight={600} color={green.dark}>
          {title}
        </Typography>
      </Box>
      <Typography fontWeight={700} color={green.main}>
        ${value?.toLocaleString() || 0}
      </Typography>
    </Box>
  );

  return (
    <DashLayout>
      <Stack
        direction={{ xs: "column", sm: "row" }}
        justifyContent="space-between"
        alignItems="center"
        spacing={3}
        sx={{ p: { xs: 2, sm: 3 }, mt: 3 }}
      >
        <StatCard
          icon={<MdOutlinePayment size={30} color={green.main} />}
          title="Total Income:"
          value={data?.totalIncome}
        />
        <StatCard
          icon={<FaMoneyBillWave size={30} color={green.main} />}
          title="Total Expense:"
          value={data?.totalExpense}
        />
        <StatCard
          icon={<MdOutlineAccountBalance size={30} color={green.main} />}
          title="Total Balance:"
          value={data?.totalAmount}
        />
      </Stack>

      <Stack
        sx={{ p: { xs: 2, sm: 3 }, mt: 3 }}
        direction={{ xs: "column", sm: "row" }}
        justifyContent="space-between"
        alignItems="center"
        spacing={3}
      >
        <BarChart
          xAxis={[{ data: ["Total Balance", "Total Income", "Total Expenses"] }]}
          series={[
            {
              data: [
                Math.abs(data?.totalAmount || 0),
                data?.totalIncome || 0,
                data?.totalExpense || 0,
              ],
              label: "Finance Overview",
              color: green.main,
            },
          ]}
          height={300}
          sx={{
            "& .MuiChartsLegend-root": { display: "none" },
            "& .MuiBarElement-root": {
              fill: green.light,
            },
          }}
        />

      </Stack>
    </DashLayout>
  );
};

export default Dashboard;
