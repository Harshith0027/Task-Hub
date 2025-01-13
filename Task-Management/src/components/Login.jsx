import { useState } from "react";
import { TextField, Button, Box, Typography, Container } from "@mui/material";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const host = "https://task-hub-back-end.onrender.com";
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
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
      const response = await fetch(`${host}/api/auth/userLogin`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
        }),
      });
      const data = await response.json();
      if (data) {
        const localData = {
          token: data.authToken,
          user: data.userId,
        };
        localStorage.setItem("dataWithTokenAndId", JSON.stringify(localData));
        navigate("/Home");
        setTimeout(() => window.alert("Logged in Successfully"), 1000);
      }
    } catch (error) {
      window.alert("Invalid Credentials");
      console.error(error);
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        backgroundColor: "primary.dark",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Container maxWidth="xs">
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            backgroundColor: "background.paper",
            padding: 4,
            borderRadius: 2,
            boxShadow: 3,
            "&:hover": {
              boxShadow: 6,
            },
          }}
        >
          <Typography variant="h5" gutterBottom>
            Login
          </Typography>
          <form onSubmit={handleSubmit} style={{ width: "100%" }}>
            <TextField
              label="Email"
              variant="outlined"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              fullWidth
              margin="normal"
              autoFocus
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
              sx={{
                marginTop: 2,
                paddingY: 1.5,
              }}
            >
              Login
            </Button>
          </form>
        </Box>
      </Container>
    </Box>
  );
};

export default Login;
