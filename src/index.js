const express = require("express");
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

// routes
app.use("/users", require("./routes/userRoutes"));
app.use("/mentors", require("./routes/mentorRoutes"));
app.use("/reviews", require("./routes/reviewRoutes"));
app.use("/recommend", require("./routes/recommendRoutes"));

// health
app.get("/", (req, res) => res.send("Mentor Review Backend — Running"));

// error handler simple
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ error: "internal server error" });
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
