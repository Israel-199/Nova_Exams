require("dotenv").config();
const examRoutes = require("./routes/exam.routes");
const testimonialRoutes = require("./routes/testimonial.routes");
const blogRoutes = require("./routes/blogpost.routes");
const resourceRoutes = require("./routes/resource.routes");
const adminRoutes = require("./routes/admin.routes");

const allowedOrigins = [
  "http://localhost:3000",
  "https://nova-exams-y58f.vercel.app"
];

const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const axios = require("axios"); 

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());
app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin) || /\.vercel\.app$/.test(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
}));

app.use("/api/exams", examRoutes);
app.use("/api/testimonials", testimonialRoutes);
app.use("/api/blogs", blogRoutes);
app.use("/api/resources", resourceRoutes);
app.use("/api/admin", adminRoutes);

app.get("/", (req, res) => {
  res.send("Service is alive!");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);

  setInterval(() => {
    axios.get("https://nova-exams.onrender.com/")
      .then(() => console.log("Pinged self to stay awake"))
      .catch(err => console.error("Ping failed", err.message));
  }, 14 * 60 * 1000);
});
