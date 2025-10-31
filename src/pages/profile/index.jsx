import React, { useEffect, useRef, useState } from "react";
import DashLayout from "../../components/layout/DashLayout";
import {
  Box,
  Button,
  Stack,
  TextField,
  Typography,
  Avatar,
  Paper,
} from "@mui/material";
import { IoMdDownload } from "react-icons/io";
import { BASE_URL, toastAlert } from "../../utils";
import { apiEndPoints } from "../../constant/apiEndPoints";
import axios from "axios";
import Cookies from "js-cookie";

const Profile = () => {
  const inputRef = useRef();
  const [image, setImage] = useState();
  const [user, setUser] = useState({});
  const [refresh, setRefresh] = useState(false);

  const handleClick = () => {
    inputRef.current.click();
  };

  const handleImageChange = async (event) => {
    setImage(event.target.files[0]);
    try {
      const apiUrl = `${BASE_URL}${apiEndPoints.uploadPofileImage}`;
      const formData = new FormData();
      formData.append("image", event.target.files[0]);
      await axios.post(apiUrl, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${Cookies.get("token")}`,
        },
      });
      toastAlert({
        type: "success",
        message: "Profile Image Uploaded Successfully",
      });
      setRefresh(!refresh);
    } catch (error) {
      toastAlert({
        type: "error",
        message: "Error uploading image",
      });
    }
  };

  const fetchUserProfile = async () => {
    try {
      const apiUrl = `${BASE_URL}${apiEndPoints.getUser}`;
      const response = await axios.get(apiUrl, {
        headers: {
          Authorization: `Bearer ${Cookies.get("token")}`,
        },
      });
      Cookies.set("image", response.data.data.profileImageUrl);
      setUser(response.data.data);
    } catch (error) {
      console.log("error", error);
    }
  };

  useEffect(() => {
    fetchUserProfile();
  }, [refresh]);

  return (
    <DashLayout>
      <Paper
        elevation={4}
        sx={{
          width: { xs: "90%", md: "70%" },
          mx: "auto",
          mt: 4,
          borderRadius: 4,
          background: "linear-gradient(135deg, #16a34a, #15803d)",
          color: "white",
          p: { xs: 3, md: 5 },
          textAlign: "center",
        }}
      >
        <Typography
          variant="h5"
          fontWeight={700}
          sx={{ mb: 2, letterSpacing: 1 }}
        >
          {user?.fullName || "User"}'s Profile
        </Typography>

        <Avatar
          src={user?.profileImageUrl || "/src/assets/fall back image.png"}
          alt="Profile Image"
          sx={{
            width: 150,
            height: 150,
            mx: "auto",
            mb: 2,
            border: "3px solid white",
            boxShadow: "0px 0px 15px rgba(0,0,0,0.3)",
          }}
        />

        <Typography variant="h6" sx={{ mb: 1 }}>
          {user?.fullName || "User Name"}
        </Typography>
        <Typography variant="body2" sx={{ opacity: 0.8, mb: 3 }}>
          {user?.email || "user@example.com"}
        </Typography>

        <Button
          variant="contained"
          onClick={handleClick}
          startIcon={<IoMdDownload />}
          sx={{
            backgroundColor: "white",
            color: "#16a34a",
            fontWeight: 600,
            px: 3,
            "&:hover": {
              backgroundColor: "#16a34a",
              color: "white",
            },
          }}
        >
          Upload New Image
        </Button>

        {image && (
          <Typography sx={{ mt: 2, color: "#d9f99d", fontSize: "14px" }}>
            {image?.name || "File Selected"}
          </Typography>
        )}

        <TextField
          inputRef={inputRef}
          sx={{ display: "none" }}
          type="file"
          onChange={handleImageChange}
        />
      </Paper>
    </DashLayout>
  );
};

export default Profile;
