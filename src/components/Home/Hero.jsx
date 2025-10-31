import React from "react";
import { Box, Stack, Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import heroImg from "../../assets/banner.png";

const Hero = () => {
  const navigate = useNavigate();

  return (
    <Stack
      direction={{ xs: "column", md: "row" }}
      alignItems="center"
      justifyContent="space-between"
      sx={{
        minHeight: "90vh",
        px: { xs: 3, md: 10 },
        py: { xs: 10, md: 0 },
        background: "linear-gradient(135deg, #e8f5e9 0%, #c8e6c9 100%)",
        color: "#1b5e20",
      }}
    >
      {/* Left Text Section */}
      <Box
        sx={{
          maxWidth: { xs: "100%", md: "45%" },
          textAlign: { xs: "center", md: "left" },
        }}
      >
        <Typography
          variant="h2"
          sx={{
            fontWeight: 800,
            mb: 2,
            lineHeight: 1.1,
            background: "linear-gradient(90deg, #2e7d32, #66bb6a)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          Manage Your Money Smartly
        </Typography>

        <Typography
          variant="h6"
          sx={{
            mb: 4,
            color: "#388e3c",
            fontWeight: 400,
          }}
        >
          Simplify budgeting and track every expense effortlessly — make your
          finances work for you.
        </Typography>

        <Button
          variant="contained"
          size="large"
          sx={{
            background: "linear-gradient(90deg, #2e7d32 0%, #1b5e20 100%)",
            borderRadius: "9999px",
            px: 4,
            py: 1.5,
            textTransform: "none",
            fontSize: "1rem",
            fontWeight: 600,
            boxShadow: "0 4px 10px rgba(46,125,50,0.3)",
            "&:hover": {
              background: "linear-gradient(90deg, #1b5e20 0%, #2e7d32 100%)",
              boxShadow: "0 6px 14px rgba(27,94,32,0.4)",
            },
          }}
          onClick={() => navigate("/login")}
        >
          Get Started
        </Button>
      </Box>

      {/* Right Image Section */}
      <Box
        component="img"
        src={heroImg}
        alt="Smart finance management illustration"
        sx={{
          width: { xs: "100%", md: "45%" },
          mt: { xs: 5, md: 0 },
          borderRadius: 4,
          boxShadow: "0 8px 24px rgba(46,125,50,0.25)",
        }}
      />
    </Stack>
  );
};

export default Hero;
