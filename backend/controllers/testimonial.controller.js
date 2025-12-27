const prisma = require("../prisma/client");

exports.createTestimonial = async (req, res) => {
  const testimonial = await prisma.testimonial.create({ data: req.body });
  res.json(testimonial);
};

exports.getTestimonials = async (req, res) => {
  const testimonials = await prisma.testimonial.findMany();
  res.json(testimonials);
};

exports.updateTestimonial = async (req, res) => {
  const testimonial = await prisma.testimonial.update({
    where: { id: req.params.id },
    data: req.body,
  });
  res.json(testimonial);
};

exports.deleteTestimonial = async (req, res) => {
  await prisma.testimonial.delete({ where: { id: req.params.id } });
  res.json({ message: "Testimonial deleted" });
};
