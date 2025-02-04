
import React, { useState, useEffect } from "react";
import { Alert, AlertTitle, Button, TextField, Box, Grid } from "@mui/material";

const UserDataForm: React.FC = () => {
  const [formData, setFormData] = useState({
    name: "",
    address: "",
    email: "",
    phone: "",
  });
  const [showAlert, setShowAlert] = useState(false);
  const [phoneError, setPhoneError] = useState(false);
  const [isDirty, setIsDirty] = useState(false); // Track if the form is dirty

  const handleShowAlert = () => setShowAlert(true);
  const handleCloseAlert = () => setShowAlert(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setIsDirty(true); // Mark form as dirty when any input changes
  };

  const validatePhoneNumber = (phone: string) => {
    const phonePattern = /^[0-9]{10}$/;
    return phonePattern.test(phone);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!validatePhoneNumber(formData.phone)) {
      setPhoneError(true); // Show phone error if the phone number is invalid
      return;
    }

    const userId = generateUserId();
    const userDataString = localStorage.getItem("UserData");
    let UserData = userDataString ? JSON.parse(userDataString) : [];

    UserData.push({ ...formData, userId });
    localStorage.setItem("UserData", JSON.stringify(UserData));

    setFormData({ name: "", address: "", email: "", phone: "" });
    setPhoneError(false);
    setIsDirty(false); // Reset dirty flag after successful form submission
    handleShowAlert();
  };

  const generateUserId = () => new Date().getTime().toString();

  // Before the user unloads the page, check if there are unsaved changes
  useEffect(() => {
    const handleBeforeUnload = (event: BeforeUnloadEvent) => {
      if (isDirty) {
        event.returnValue = "You have unsaved changes. Are you sure you want to leave?";
      }
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => window.removeEventListener("beforeunload", handleBeforeUnload);
  }, [isDirty]);

  const hasUnsavedChanges = () => {
    return Object.values(formData).some((value) => value !== "");
  };

  return (
    <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "100vh", backgroundColor: "#e8eff7" }}>
      <Box
        sx={{
          width: "100%",
          maxWidth: 480,
          padding: 4,
          borderRadius: 3,
          boxShadow: 6,
          backgroundColor: "#ffffff",
          border: "2px solid #2C6E91", // Adding border for a more defined look
        }}
      >
        <h2 style={{ textAlign: "center", fontSize: "1.6rem", color: "#2C6E91", marginBottom: "24px", fontWeight: "600" }}>User Data Form</h2>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <TextField
                label="Name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                required
                fullWidth
                sx={{
                  backgroundColor: "#f9fafb",
                  borderRadius: "8px",
                  boxShadow: "0 2px 6px rgba(0, 0, 0, 0.1)",
                  "& .MuiOutlinedInput-root": {
                    "&:hover fieldset": {
                      borderColor: "#2C6E91", // Green border on hover
                    },
                  },
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Address"
                name="address"
                value={formData.address}
                onChange={handleInputChange}
                required
                multiline
                rows={4}
                fullWidth
                sx={{
                  backgroundColor: "#f9fafb",
                  borderRadius: "8px",
                  boxShadow: "0 2px 6px rgba(0, 0, 0, 0.1)",
                  "& .MuiOutlinedInput-root": {
                    "&:hover fieldset": {
                      borderColor: "#2C6E91", // Green border on hover
                    },
                  },
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                required
                type="email"
                fullWidth
                sx={{
                  backgroundColor: "#f9fafb",
                  borderRadius: "8px",
                  boxShadow: "0 2px 6px rgba(0, 0, 0, 0.1)",
                  "& .MuiOutlinedInput-root": {
                    "&:hover fieldset": {
                      borderColor: "#2C6E91", // Green border on hover
                    },
                  },
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Phone"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                required
                type="tel"
                fullWidth
                sx={{
                  backgroundColor: "#f9fafb",
                  borderRadius: "8px",
                  boxShadow: "0 2px 6px rgba(0, 0, 0, 0.1)",
                  "& .MuiOutlinedInput-root": {
                    "&:hover fieldset": {
                      borderColor: "#2C6E91", // Green border on hover
                    },
                  },
                }}
                error={phoneError}
                helperText={phoneError ? "Please enter a valid 10-digit phone number." : ""}
              />
            </Grid>
            <Grid item xs={12}>
              <Button
                variant="contained"
                color="primary"
                type="submit"
                fullWidth
                sx={{
                  background: "linear-gradient(135deg, #2C6E91, #1d4f74)",
                  color: "white",
                  fontWeight: "bold",
                  borderRadius: "8px",
                  padding: "14px",
                  boxShadow: "0 4px 10px rgba(0, 0, 0, 0.2)",
                  "&:hover": {
                    background: "linear-gradient(135deg, #1d4f74, #2C6E91)",
                  },
                }}
              >
                Save
              </Button>
            </Grid>
          </Grid>
        </form>
        {showAlert && (
          <Alert
            severity="success"
            onClose={handleCloseAlert}
            sx={{
              marginTop: "20px",
              backgroundColor: "#e0ffe0",
              borderRadius: "8px",
              color: "#28a745",
              padding: "14px",
            }}
          >
            <AlertTitle>Success</AlertTitle>
            Form submitted successfully!
          </Alert>
        )}
      </Box>
    </Box>
  );
};

export default UserDataForm;
