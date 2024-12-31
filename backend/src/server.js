const express = require("express");
const bodyParser = require("body-parser");
const { PrismaClient } = require("@prisma/client");
const cors = require("cors");
const prisma = new PrismaClient();
const App = express();

// Middleware
App.use(bodyParser.json());
App.use(
  cors({
    origin: "http://localhost:3001",
  })
);

// Root route
App.get("/", (req, res) => {
  res.send("Server is running");
});

// Address routes
App.post("/addresses", async (req, res) => {
  const { houseNumber, apartment, label } = req.body;

  if (!houseNumber) {
    return res.status(400).json({
      error: "Required field missing: houseNumber is mandatory",
    });
  }

  try {
    const address = await prisma.address.create({
      data: {
        houseNumber,
        apartment,
        label: label || "HOME", // Default to HOME if no label is provided
      },
    });
    res.status(201).json(address);
  } catch (error) {
    console.error("Error adding address:", error);
    res.status(500).json({ error: "Error adding address" });
  }
});

App.get("/addresses", async (req, res) => {
  try {
    const addresses = await prisma.address.findMany({
      orderBy: { createdAt: "desc" },
    });
    res.status(200).json(addresses);
  } catch (error) {
    console.error("Error retrieving addresses:", error);
    res.status(500).json({ error: "Error retrieving addresses" });
  }
});

// Start the server
const PORT = 3000;
App.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
