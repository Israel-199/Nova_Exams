require("dotenv").config();
const examRoutes = require("./routes/exam.routes");
const testimonialRoutes = require("./routes/testimonial.routes");
const blogRoutes = require("./routes/blogpost.routes");
const resourceRoutes = require("./routes/resource.routes");
const adminRoutes = require("./routes/admin.routes");
const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");

const app = express();
app.use(express.urlencoded({ extended: true }));

app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use(cors({ origin: "http://localhost:3000" ,credentials:true}));

app.use("/api/exams", examRoutes);
app.use("/api/testimonials", testimonialRoutes);
app.use("/api/blogs", blogRoutes);
app.use("/api/resources", resourceRoutes);
app.use("/api/admin", adminRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
