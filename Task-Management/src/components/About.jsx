import { Box, Card, CardContent, CardHeader, Typography, Container } from "@mui/material";

const About = () => {
  return (
    <Box
      sx={{
        minHeight: "100vh", // Full window height
        backgroundColor: "#81BFDA", // Sky blue background
        display: "flex",
        justifyContent: "center",
        alignItems: "start",
      }}
    >
      <Container sx={{ mt: 3 }}>
        <Card
          sx={{
            borderRadius: "10px", // Rounded corners
            boxShadow: "2", // Subtle shadow
            "&:hover": {
              boxShadow: "0px 4px 10px 2px rgba(234, 179, 8, 0.5)", // Hover effect
            },
            // Responsive styling using breakpoints
            "@media (max-width: 768px)": {
              maxWidth: "100%", // Full width on smaller screens
            },
            "@media (min-width: 768px)": {
              maxWidth: "600px", // Set a max width on tablets and small desktops
            },
            "@media (min-width: 1024px)": {
              maxWidth: "800px", // Max width for larger screens (desktops)
            },
          }}
        >
          <CardHeader
            title="About This Application"
            sx={{
              backgroundColor: "#859F3D", // Green header
              color: "#000", // Black text
              borderTopLeftRadius: "10px",
              borderTopRightRadius: "10px",
            }}
          />
          <CardContent
            sx={{
              backgroundColor: "#FFF4B7", // Light yellow content background
              borderBottomLeftRadius: "10px",
              borderBottomRightRadius: "10px",
            }}
          >
            <Typography variant="h5" gutterBottom sx={{ textAlign: "center" }}>
              Cloud Notes
            </Typography>
            <Typography variant="body1" gutterBottom>
              This application is designed to help users manage their tasks efficiently and securely. 
              You can create, edit, and delete tasks, ensuring that your tasks are always at your fingertips.
            </Typography>
            <Typography variant="body1" gutterBottom>
              Developed by <strong>Harshith</strong>, this application aims to provide a user-friendly interface 
              along with robust features for Task management.
            </Typography>
            <Typography variant="body1" gutterBottom>
              Thank you for using Task Hub! Your time is our pleasure.
            </Typography>
          </CardContent>
        </Card>
      </Container>
    </Box>
  );
};

export default About;