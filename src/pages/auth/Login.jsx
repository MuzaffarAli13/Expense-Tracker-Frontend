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
import Cookies from "js-cookie";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { BASE_URL, toastAlert } from "../../utils";
import { apiEndPoints } from "../../constant/apiEndPoints";

const Login = () => {
  const navigate = useNavigate();
  const [Loading, setLoading] = useState(false);
  const { control, handleSubmit } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data) => {
    try {
      setLoading(true);
      const api = `${BASE_URL}${apiEndPoints.login}`;
      const response = await axios.post(api, data);
      toastAlert({
        type: "success",
        message: "Login Successful!",
      });
      Cookies.set("token", response.data.token);
      Cookies.set("name", response.data.data.fullName);
      Cookies.set("image", response.data?.data?.profileImageUrl || "");
      setLoading(false);
      navigate("/dashboard");
    } catch (error) {
      setLoading(false);
      toastAlert({
        type: "error",
        message: error.message || "Network error",
      });
    }
  };

  return (
    <Paper
      elevation={4}
      sx={{
        width: 400,
        mx: "auto",
        mt: 10,
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
        Welcome Back
      </Typography>

      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <Stack spacing={2}>
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
            {Loading ? "Logging in..." : "Login"}
          </Button>

          <Box mt={2}>
            <Typography color="text.secondary">
              Don’t have an account?
            </Typography>
            <Link
              style={{
                color: "#2e7d32",
                fontWeight: "bold",
                textDecoration: "none",
              }}
              to={"/signup"}
            >
              Create one
            </Link>
          </Box>
        </Stack>
      </form>
    </Paper>
  );
};

export default Login;
