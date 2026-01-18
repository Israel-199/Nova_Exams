import { useState } from "react";
import { X, Star, Award, ArrowRight, CheckCircle } from "lucide-react";
import student1 from "@/assets/student-1.jpg";
import student2 from "@/assets/student-2.jpg";
import student3 from "@/assets/student-3.jpg";
import { WireframeMesh } from "./WireframeMesh";
import { Link } from "react-router-dom";
import { Button } from "../components/ui/button";
import { Navbar } from "./Navbar";
import { motion } from "framer-motion";

const features = [
  "Expert Exam Guidance",
  "Flexible Scheduling",
  "Efficient mentorship",
];

export function HeroSection() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <section className="relative min-h-screen w-full bg-hero overflow-hidden">
      <WireframeMesh />
      <div className="sparkle-lg top-32 left-20 animate-sparkle">
        <X className="w-4 h-4" strokeWidth={3} />
      </div>
      <div
        className="sparkle-lg top-1/3 left-1/4 animate-sparkle"
        style={{ animationDelay: "0.5s" }}
      >
        <span className="text-primary/40 text-2xl">✦</span>
      </div>
      <div
        className="sparkle-lg top-2/3 left-16 animate-sparkle"
        style={{ animationDelay: "1s" }}
      >
        <span className="text-teal/40 text-lg">+</span>
      </div>
      <div
        className="sparkle-lg bottom-1/3 right-1/3 animate-sparkle"
        style={{ animationDelay: "0.7s" }}
      >
        <span className="text-primary/50 text-xl">✦</span>
      </div>
      <Navbar />

      <div className="container mx-auto px-4 pt-12 lg:pt-20 pb-32 lg:pb-40">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="relative z-10">
            <div className="inline-block px-4 py-2 rounded-full bg-primary/20 border border-primary/30 mb-6 animate-fade-in mt-10">
              <span className="text-primary font-medium text-sm">
                🎓 Your #1 Go-To For Proficiency Exams
              </span>
            </div>
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-secondary-foreground leading-tight mb-6">
              Seamless English
              <br />
              Proficiency <span className="text-primary">Exam Services</span> -
              at{" "}
              <span className="underline-yellow cursor-pointer">
                Nova Exams
              </span>
            </h1>
            <p
              className="text-lg md:text-xl text-secondary-foreground/90 mb-8 leading-relaxed animate-slide-up"
              style={{ animationDelay: "0.1s" }}
            >
              Book international exams like Duolingo, TOEFL, IELTS, and TOLC
              with ease. We provide exam room services, expert mentorship, and
              seamless exam purchasing.
            </p>

            <div
              className="flex flex-col sm:flex-row gap-4 animate-slide-up"
              style={{ animationDelay: "0.3s" }}
            >
              <Button variant="hero" size="lg" asChild>
                <Link to="/booking">
                  Book Your Exam Now
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </Button>
              <Button
                variant="heroOutline"
                size="lg"
                asChild
                className="bg-secondary-foreground/10 backdrop-blur-sm"
              >
                <Link to="/about">Learn More About Us</Link>
              </Button>
            </div>

            <div
              className="flex flex-wrap gap-4 mb-10 animate-slide-up mt-10"
              style={{ animationDelay: "0.2s" }}
            >
              {features.map((feature) => (
                <div
                  key={feature}
                  className="flex items-center gap-2 text-secondary-foreground/90"
                >
                  <CheckCircle className="w-5 h-5 text-primary" />
                  <span className="font-medium">{feature}</span>
                </div>
              ))}
            </div>

            <div
              className="grid grid-cols-3 gap-8 mt-16 pt-8 border-t border-secondary-foreground/20 animate-fade-in"
              style={{ animationDelay: "0.4s" }}
            >
              {[
                { number: "500+", label: "Students Served" },
                { number: "98%", label: "Success Rate" },
                { number: "6+", label: "Exams Offered" },
              ].map((stat) => (
                <div key={stat.label} className="text-center sm:text-left">
                  <div className="text-2xl md:text-3xl font-display font-bold text-primary">
                    {stat.number}
                  </div>
                  <div className="text-sm text-secondary-foreground/70">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="relative hidden lg:block h-[500px]">
            <motion.div
              className="absolute left-0 top-8 w-64 h-80 rounded-2xl overflow-hidden shadow-2xl"
              animate={{ y: [0, -20, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            >
              <img
                src={student1}
                alt="Student"
                className="w-full h-full object-cover"
              />
            </motion.div>

            <motion.div
              className="absolute right-0 top-0 w-48 h-60 rounded-2xl overflow-hidden shadow-2xl"
              animate={{ y: [0, -15, 0] }}
              transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
            >
              <img
                src={student2}
                alt="Student"
                className="w-full h-full object-cover"
              />
            </motion.div>

            <motion.div
              className="absolute right-8 bottom-0 w-56 h-72 rounded-2xl overflow-hidden shadow-2xl"
              animate={{ y: [0, -25, 0] }}
              transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
            >
              <img
                src={student3}
                alt="Student"
                className="w-full h-full object-cover"
              />
            </motion.div>

            <motion.div
              className="absolute right-20 top-32 floating-card flex items-center gap-3"
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            >
              <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center overflow-hidden">
                <img
                  src={student2}
                  alt="Meron"
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <p className="font-semibold text-foreground text-sm">
                  Abel Tadesse
                </p>
                <p className="text-muted-foreground text-xs">Toefl student</p>
                <div className="flex gap-0.5 mt-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-3 h-3 fill-primary text-primary"
                    />
                  ))}
                </div>
                <p className="text-muted-foreground text-xs mt-1">
                  Scored 100 🎉
                </p>
              </div>
            </motion.div>

            <motion.div
              className="absolute left-8 bottom-32 floating-card flex items-center gap-3"
              animate={{ y: [0, -12, 0] }}
              transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
            >
              <div className="w-10 h-10 rounded-full bg-teal/20 flex items-center justify-center">
                <Award className="w-5 h-5 text-teal" />
              </div>
              <div>
                <p className="font-bold text-foreground text-lg">500+</p>
                <p className="text-muted-foreground text-xs">
                  Exams Booked Successfully
                </p>
              </div>
            </motion.div>
            <motion.div
              className="absolute right-12 bottom-12 floating-card flex items-center gap-2"
              animate={{ y: [0, -15, 0] }}
              transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
            >
              <div className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center">
                <Award className="w-4 h-4 text-secondary-foreground" />
              </div>
              <div>
                <p className="font-semibold text-secondary text-sm">
                  Congrats!
                </p>
                <p className="text-muted-foreground text-xs">
                  Admission Secured Abroad
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
