import { useState } from "react";
import { TextField, Button, Box, Typography, Container } from "@mui/material";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  const host = "http://localhost:5000"; // Replace with your API host URL
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${host}/api/auth/createUser`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          password: formData.password,
        }),
      });

      const data = await response.json();
      console.log("Signup data:", data);

      if (response.ok) {
        // Save token and user details in localStorage
        const localData = {
          token: data.authToken,
          user: data.userId,
        };
        localStorage.setItem("dataWithTokenAndId", JSON.stringify(localData));

        // Navigate to the home page
        navigate("/Home");
        setTimeout(() => {
          window.alert("Signup Successful! Continue with our service.");
        }, 1000);
      } else {
        // Handle server errors or validation errors
        window.alert(data.message || "Signup failed. Please try again.");
      }
    } catch (error) {
      console.error("Error during signup:", error);
      window.alert("An error occurred. Please try again.");
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh", // Full screen height
        backgroundColor: "#7E99A3", // A soft greenish-blue background color
        display: "flex",
        justifyContent: "center",
        alignItems: "start",
      }}
    >
      <Container maxWidth="xs" sx={{ paddingTop: 5 }}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            backgroundColor: "#D9EAFD", // Light blue card color
            padding: 3,
            borderRadius: 2,
            boxShadow: 3,
            "&:hover": {
              boxShadow: "0px 4px 10px 2px rgba(0, 50, 133, 0.5)", // Subtle hover effect
            },
          }}
        >
          <Typography variant="h5" gutterBottom>
            Signup
          </Typography>
          <form onSubmit={handleSubmit} style={{ width: "100%" }}>
            <TextField
              label="Name"
              variant="outlined"
              name="name"
              value={formData.name}
              onChange={handleChange}
              fullWidth
              margin="normal"
              required
            />
            <TextField
              label="Email"
              variant="outlined"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              fullWidth
              margin="normal"
              required
            />
            <TextField
              label="Password"
              variant="outlined"
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              fullWidth
              margin="normal"
              required
            />
            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              sx={{ marginTop: 2 }}
            >
              Signup
            </Button>
          </form>
        </Box>
      </Container>
    </Box>
  );
};

export default SignUp;