const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors()); // Allows frontend to communicate with backend
app.use(express.json()); // Parses JSON requests

// Sample API route
app.get("/api/data", (req, res) => {
  res.json({ message: "Hello from the backend!" });
});

// Start the server
const PORT = process.env.PORT || 5001;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
