const express = require("express");
const app = express();
const path = require("path");
const cors = require("cors");
const corsOptions = require("./config/corsOptions");
const { logger } = require("./middleware/logEvents");
const errorHandler = require("./middleware/errorHandler");
const PORT = process.env.PORT || 3000;

// Custom Middleware Function
app.use(logger);
app.use(cors(corsOptions));

// Built in middleware functions in express
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

//serves static assets such as HTML files, images, and so on
app.use(express.static(path.join(__dirname, "/public")));
app.use("/subdir", express.static(path.join(__dirname, "/public")));

//routes
app.use("/subdir", require("./routes/subdir"));
app.use("/", require("./routes/root"));
//API Route
app.use("/contact", require("./routes/api/contacts"));

//Handle undefined routes
app.all("*", (req, res) => {
  res.status(404);
  if (req.accepts("html")) {
    res.sendFile(path.join)(__dirname, "views", "404.html");
  } else if (req.accepts("json")) {
    res.json({ error: "404 Not Found" });
  } else {
    res.type("txt").send("404 Not Found");
  }
});

app.use(errorHandler);

app.listen(PORT, () => console.log(`Server is running on ${PORT}`));
