const express = require("express");
const path = require("path");

const app = express();
const PORT = 3000;

app.use(express.json());

// serve frontend
app.use(express.static(path.join(__dirname, "../public")));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../public/index.html"));
});

app.get("/api/pricing", (req, res) => {
  res.json([
    { type: "Group Lesson", price: "R250" },
    { type: "Private Lesson", price: "R450" },
  ]);
});

app.post("/api/intake", (req, res) => {
  const { childName, age, naps } = req.body;

  console.log("Child:", childName);
  console.log("Age:", age);
  console.log("Naps:", naps);

  res.json({
    message: "Registration successful",
  });
});

app.post("/api/booking", (req, res) => {
  const { day, time } = req.body;

  console.log("Booking:", day, time);

  res.json({
    message: "Booking confirmed",
  });
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
