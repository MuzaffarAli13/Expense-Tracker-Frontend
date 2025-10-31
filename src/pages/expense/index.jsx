import DashLayout from "../../components/layout/DashLayout";
import {
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Button,
  Stack,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { BASE_URL, toastAlert } from "../../utils";
import { apiEndPoints } from "../../constant/apiEndPoints";
import axios from "axios";
import Cookies from "js-cookie";
import { ExpenseModal } from "../../components/modals/ExpenseModal";
import { MdOutlineDelete } from "react-icons/md";
import { IoMdDownload } from "react-icons/io";
import { MdRemoveRoad } from "react-icons/md";
import { createTheme, ThemeProvider } from "@mui/material/styles";


const greenTheme = createTheme({
  palette: {
    primary: {
      main: "#2e7d32", 
      contrastText: "#ffffff",
    },
    secondary: {
      main: "#66bb6a", 
    },
    background: {
      default: "#f1f8e9", 
      paper: "#ffffff",
    },
  },
});

const Expense = () => {
  const [open, setOpen] = useState(false);
  const [isRefresh, setIsRefresh] = useState(false);
  const [data, setData] = useState([]);
  const [reafreshData, setRefreshData] = useState([]);


  const fetchData = async () => {
    try {
      const apiUrl = `${BASE_URL}${apiEndPoints.getExpense}`;
      const response = await axios.get(apiUrl, {
        headers: {
          Authorization: `Bearer ${Cookies.get("token")}`,
        },
      });
      setData(response.data?.data || []);
    } catch (error) {
      console.log(error);
    }
  };


  const expenseDeleteHanler = async (id) => {
    try {
      const apiUrl = `${BASE_URL}${apiEndPoints.deleteExpense(id)}`;
      await axios.delete(apiUrl, {
        headers: {
          Authorization: `Bearer ${Cookies.get("token")}`,
        },
      });
      toastAlert({
        type: "success",
        message: "Expense Deleted Successfully",
      });

      setData((prevData) => prevData.filter((item) => item._id !== id));
    } catch (error) {
      console.log(error);
      toastAlert({
        type: "error",
        message: error.message || "Expense Deleting Error",
      });
    }
  };

  const handleDowload = async () => {
    try {
      const apiUrl = `${BASE_URL}${apiEndPoints.downloadExpense}`;
      const response = await axios.get(apiUrl, {
        responseType: "blob",
        headers: {
          Authorization: `Bearer ${Cookies.get("token")}`,
        },
      });
      const blob = new Blob([response.data], {
        type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      });
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = "expense-report.xlsx";
      link.click();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.log(error);
    }
  };

  const handleRefresh = async (date) => {
    try {
      const apiUrl = `${BASE_URL}${apiEndPoints.refreshExpense(date)}`;
      const response = await axios.get(apiUrl, {
        headers: {
          Authorization: `Bearer ${Cookies.get("token")}`,
        },
      });
      setRefreshData(response.data?.data || []);
    } catch (error) {
      console.log("error", error);
    }
  };

  useEffect(() => {
    if (reafreshData.length > 0) {
      setData(reafreshData);
    } else {
      fetchData();
    }
  }, [isRefresh, reafreshData]);

  return (
    <ThemeProvider theme={greenTheme}>
      <DashLayout>
        <Stack direction={"row"} justifyContent={"space-between"}>
          <Typography sx={{ fontWeight: "bold", fontSize: { xs: 16, sm: 18 } }}>
            Expenses
          </Typography>
          <Button variant="contained" color="primary" onClick={() => setOpen(true)}>
            Add Expense
          </Button>
        </Stack>

        <Stack direction={"row"} justifyContent={"space-between"} marginTop={5}>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Button
              variant="text"
              color="primary"
              sx={{ marginTop: "20px" }}
              onClick={() => fetchData()}
            >
              <MdRemoveRoad />
            </Button>
            <TextField
              label="Filter by Date"
              variant="standard"
              type="date"
              onChange={(e) => handleRefresh(e.target.value)}
            />
          </Box>
          <Button variant="outlined" color="primary" onClick={handleDowload}>
            <IoMdDownload /> Expense Sheet
          </Button>
        </Stack>

        <TableContainer component={Paper} sx={{ boxShadow: 2, mt: 3 }}>
          <Table
            sx={{
              minWidth: 650,
              "& th": {
                bgcolor: "primary.main",
                color: "primary.contrastText",
                fontWeight: 700,
                fontSize: { xs: 14, sm: 16 },
                borderBottom: "2px solid #e0e0e0",
                letterSpacing: 1,
                textAlign: "center",
              },
              "& td": {
                fontSize: { xs: 13, sm: 15 },
                py: 1.5,
                textAlign: "center",
              },
            }}
            aria-label="expense table"
          >
            <TableHead>
              <TableRow>
                <TableCell>Expense</TableCell>
                <TableCell>Amount</TableCell>
                <TableCell>Category</TableCell>
                <TableCell>Description</TableCell>
                <TableCell>Date</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {data.map((expense) => (
                <TableRow key={expense._id}>
                  <TableCell>{expense?.amount}</TableCell>
                  <TableCell>{expense?.amount}</TableCell>
                  <TableCell>{expense?.category}</TableCell>
                  <TableCell>{expense?.description}</TableCell>
                  <TableCell>
                    {new Date(expense?.date).toLocaleDateString("en-US")}
                  </TableCell>
                  <TableCell>
                    <MdOutlineDelete
                      size={22}
                      color="#2e7d32"
                      style={{ cursor: "pointer" }}
                      onClick={() => expenseDeleteHanler(expense?._id)}
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        <ExpenseModal
          open={open}
          setOpen={setOpen}
          isRefresh={isRefresh}
          setIsRefresh={setIsRefresh}
        />
      </DashLayout>
    </ThemeProvider>
  );
};

export default Expense;
