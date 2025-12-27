require("dotenv").config();
const examRoutes = require("./routes/exam.routes");
const testimonialRoutes = require("./routes/testimonial.routes");
const blogRoutes = require("./routes/blog.routes");
const resourceRoutes = require("./routes/resource.routes");
const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/exams", examRoutes);
app.use("/api/testimonials", testimonialRoutes);
app.use("/api/blogs", blogRoutes);
app.use("/api/resources", resourceRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
