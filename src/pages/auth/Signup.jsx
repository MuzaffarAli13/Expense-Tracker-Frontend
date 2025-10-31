import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import {
  Button,
  Stack,
  TextField,
  Typography,
  Paper,
  Box,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { BASE_URL, toastAlert } from "../../utils";
import { apiEndPoints } from "../../constant/apiEndPoints";
import axios from "axios";

const Signup = () => {
  const navigate = useNavigate();
  const [Loading, setLoading] = useState(false);
  const { control, handleSubmit } = useForm({
    defaultValues: {
      fullName: "",
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data) => {
    try {
      setLoading(true);
      const api = `${BASE_URL}${apiEndPoints.registerUser}`;
      const response = await axios.post(api, data);
      toastAlert({
        type: "success",
        message: response.data.message || "Signup Success",
      });
      setLoading(false);
      navigate("/login");
    } catch (error) {
      setLoading(false);
      toastAlert({
        type: "error",
        message: error.message || "Signup Error!",
      });
    }
  };

  return (
    <Paper
      elevation={4}
      sx={{
        width: 400,
        mx: "auto",
        mt: 8,
        p: 5,
        borderRadius: 3,
        background: "linear-gradient(135deg, #e8f5e9, #c8e6c9)",
        textAlign: "center",
      }}
    >
      <Typography
        variant="h4"
        mb={3}
        fontWeight={700}
        sx={{ color: "#2e7d32", letterSpacing: 1 }}
      >
        Create Account
      </Typography>

      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <Stack spacing={2}>
          <Controller
            name="fullName"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="Full Name"
                type="text"
                fullWidth
                variant="outlined"
                sx={{
                  backgroundColor: "white",
                  borderRadius: 2,
                }}
              />
            )}
          />

          <Controller
            name="email"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="Email"
                type="email"
                fullWidth
                variant="outlined"
                sx={{
                  backgroundColor: "white",
                  borderRadius: 2,
                }}
              />
            )}
          />

          <Controller
            name="password"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="Password"
                type="password"
                fullWidth
                variant="outlined"
                sx={{
                  backgroundColor: "white",
                  borderRadius: 2,
                }}
              />
            )}
          />

          <Button
            type="submit"
            variant="contained"
            size="large"
            disabled={Loading}
            sx={{
              mt: 1,
              background:
                "linear-gradient(90deg, #43a047 0%, #1b5e20 100%)",
              borderRadius: 2,
              textTransform: "capitalize",
              fontSize: "1rem",
              "&:hover": {
                background:
                  "linear-gradient(90deg, #388e3c 0%, #2e7d32 100%)",
              },
            }}
          >
            {Loading ? "Signing up..." : "Signup"}
          </Button>

          <Box mt={2}>
            <Typography color="text.secondary">
              Already have an account?
            </Typography>
            <Link
              style={{
                color: "#2e7d32",
                fontWeight: "bold",
                textDecoration: "none",
              }}
              to={"/login"}
            >
              Login
            </Link>
          </Box>
        </Stack>
      </form>
    </Paper>
  );
};

export default Signup;
