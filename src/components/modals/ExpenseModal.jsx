import * as React from "react";
import {
  Backdrop,
  Box,
  Modal,
  Fade,
  Button,
  Typography,
  CircularProgress,
  Stack,
  TextField,
} from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import axios from "axios";
import Cookies from "js-cookie";
import { BASE_URL, toastAlert } from "../../utils";
import { apiEndPoints } from "../../constant/apiEndPoints";


const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: { xs: "90vw", sm: 400, md: 500 },
  bgcolor: "background.paper",
  borderRadius: 4,
  boxShadow: 8,
  p: { xs: 2, sm: 4 },
  border: "none",
  outline: "none",
};

export const ExpenseModal = ({ open, setOpen, isRefresh, setIsRefresh }) => {
  const [loading, setLoading] = React.useState(false);
  const handleClose = () => setOpen(false);

  const { control, handleSubmit, reset } = useForm({
    defaultValues: {
      amount: "",
      category: "",
      description: "",
      date: "",
    },
  });

  const onSubmit = async (data) => {
    try {
      console.log("data", data);
      setLoading(true);
      const apiUrl = `${BASE_URL}${apiEndPoints.addExpense}`;
      const response = await axios.post(apiUrl, data, {
        headers: {
          Authorization: `Bearer ${Cookies.get("token")}`,
        },
      });
      console.log("response", response);

      setLoading(false);

      toastAlert({
        type: "success",
        message: response.data.message || "Expense Addedd Successfully",
      });
      reset();
      handleClose();
      setIsRefresh(!isRefresh);
    } catch (err) {
      setLoading(false);
      toastAlert({
        type: "error",
        message: err.message || "Expense Adding Error",
      });
    }
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      closeAfterTransition
      slots={{ backdrop: Backdrop }}
      slotProps={{ backdrop: { timeout: 500 } }}
    >
      <Fade in={open}>
        <Box sx={style}>
          <Stack gap={1.5} component="form" onSubmit={handleSubmit(onSubmit)}>
            <Typography
              variant="h4"
              align="center"
              fontWeight={700}
              color="primary"
            >
              Add Expense
            </Typography>

            <Controller
              control={control}
              name="amount"
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Amount"
                  variant="outlined"
                  fullWidth
                  required
                />
              )}
            />

            <Controller
              control={control}
              name="category"
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Category"
                  variant="outlined"
                  fullWidth
                  required
                  type="text"
                />
              )}
            />
            <Controller
              control={control}
              name="description"
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Description"
                  variant="outlined"
                  fullWidth
                  required
                  type="text"
                />
              )}
            />
             <Controller
              control={control}
              name="date"
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Date"
                  variant="outlined"
                  fullWidth
                  required
                  type="date"
                />
              )}
            />
            <Button
              variant="contained"
              color="primary"
              type="submit"
              sx={{ mt: 2, color: "white" }}
            >
              {loading ? (
                <CircularProgress color="inherit" size={20} />
              ) : (
                "Add Expense"
              )}
            </Button>
          </Stack>
        </Box>
      </Fade>
    </Modal>
  );
};
