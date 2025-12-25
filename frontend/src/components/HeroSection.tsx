import { useState } from "react";
import { Menu, X, Users, Play, Cloud, Star, Award, ArrowRight, CheckCircle } from "lucide-react";
import student1 from "@/assets/student-1.jpg";
import student2 from "@/assets/student-2.jpg";
import student3 from "@/assets/student-3.jpg";
import { WireframeMesh } from "./WireframeMesh";
import { Link } from "react-router-dom";
import {Button} from "../components/ui/button"
import { Navbar } from "./Navbar";


const features = [
  "Expert Exam Guidance",
  "Flexible Scheduling",
  "Efficient mentorship",
];

export function HeroSection() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <section className="relative min-h-screen bg-hero overflow-hidden">
      {/* 3D Wireframe Mesh Background */}
      <WireframeMesh />
      
      {/* Decorative sparkles */}
      <div className="sparkle-lg top-32 left-20 animate-sparkle">
        <X className="w-4 h-4" strokeWidth={3} />
      </div>
      <div className="sparkle-lg top-1/3 left-1/4 animate-sparkle" style={{ animationDelay: "0.5s" }}>
        <span className="text-primary/40 text-2xl">✦</span>
      </div>
      <div className="sparkle-lg top-2/3 left-16 animate-sparkle" style={{ animationDelay: "1s" }}>
        <span className="text-teal/40 text-lg">+</span>
      </div>
      <div className="sparkle-lg bottom-1/3 right-1/3 animate-sparkle" style={{ animationDelay: "0.7s" }}>
        <span className="text-primary/50 text-xl">✦</span>
      </div>

      {/* Navigation */}
       <Navbar/>
      {/* Hero Content */}
      <div className="container mx-auto px-4 pt-12 lg:pt-20 pb-32 lg:pb-40">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="relative z-10">
            <div className="inline-block px-4 py-2 rounded-full bg-primary/20 border border-primary/30 mb-6 animate-fade-in mt-10">
            <span className="text-primary font-medium text-sm">
              🎓 Your #1 Go-To For Proficiency Exams
            </span>
          </div>
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-secondary-foreground leading-tight mb-6">
              Seamless English 
              <br />
              Proficiency <span className="text-primary">Exam Services</span>-at{" "}
              <span className="underline-yellow cursor-pointer">Nova Exams</span>

            </h1>
           <p className="text-lg md:text-xl text-secondary-foreground/90 mb-8 leading-relaxed animate-slide-up" style={{ animationDelay: "0.1s" }}>
            Book international exams like Duolingo, TOEFL, IELTS, and TOLC with ease. 
            We provide exam room services, expert mentorship, and seamless exam purchasing.
          </p>

            {/* CTA Buttons */}
           <div className="flex flex-col sm:flex-row gap-4 animate-slide-up" style={{ animationDelay: "0.3s" }}>
            <Button variant="hero" size="lg" asChild>
              <Link to="/booking">
                Book Your Exam Now
                <ArrowRight className="w-5 h-5" />
              </Link>
            </Button>
            <Button variant="heroOutline" size="lg" asChild className="bg-secondary-foreground/10 backdrop-blur-sm">
              <Link to="/about">Learn More About Us</Link>
            </Button>
          </div>

            {/* Stats */}
              <div className="flex flex-wrap gap-4 mb-10 animate-slide-up mt-10" style={{ animationDelay: "0.2s" }}>
            {features.map((feature) => (
              <div key={feature} className="flex items-center gap-2 text-secondary-foreground/90">
                <CheckCircle className="w-5 h-5 text-primary" />
                <span className="font-medium">{feature}</span>
              </div>
            ))} 
          </div>
   
     <div className="grid grid-cols-3 gap-8 mt-16 pt-8 border-t border-secondary-foreground/20 animate-fade-in" style={{ animationDelay: "0.4s" }}>
            {[
              { number: "500+", label: "Students Served" },
              { number: "98%", label: "Success Rate" },
              { number: "6+", label: "Exams Offered" },
            ].map((stat) => (
              <div key={stat.label} className="text-center sm:text-left">
                <div className="text-2xl md:text-3xl font-display font-bold text-primary">
                  {stat.number}
                </div>
                <div className="text-sm text-secondary-foreground/70">{stat.label}</div>
              </div>
            ))}
          </div>
           </div>
          {/* Right Content - Floating Cards */}
          <div className="relative hidden lg:block h-[500px]">
            {/* Main student image */}
            <div className="absolute left-0 top-8 w-64 h-80 rounded-2xl overflow-hidden shadow-2xl animate-float">
              <img
                src={student1}
                alt="Student"
                className="w-full h-full object-cover"
              />
            </div>

            {/* Second student image */}
            <div className="absolute right-0 top-0 w-48 h-60 rounded-2xl overflow-hidden shadow-2xl animate-float-delayed">
              <img
                src={student2}
                alt="Student"
                className="w-full h-full object-cover"
              />
            </div>

            {/* Third student image */}
            <div className="absolute right-8 bottom-0 w-56 h-72 rounded-2xl overflow-hidden shadow-2xl animate-float-slow">
              <img
                src={student3}
                alt="Student"
                className="w-full h-full object-cover"
              />
            </div>

            {/* Profile Card */}
            {/* Testimonial Card */}
{/* Testimonial Card (Meron Tadesse) */}
<div className="absolute right-20 top-32 floating-card flex items-center gap-3 animate-float-delayed">
  <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center overflow-hidden">
    <img src={student2} alt="Meron" className="w-full h-full object-cover" />
  </div>
  <div>
    <p className="font-semibold text-foreground text-sm">Abel Tadesse</p>
    <p className="text-muted-foreground text-xs">IELTS Student</p>
    <div className="flex gap-0.5 mt-1">
      {[...Array(5)].map((_, i) => (
        <Star key={i} className="w-3 h-3 fill-primary text-primary" />
      ))}
    </div>
    <p className="text-muted-foreground text-xs mt-1">Scored Band 8.0 🎉</p>
  </div>
</div>

{/* Exams Booked Highlight */}
<div className="absolute left-8 bottom-32 floating-card flex items-center gap-3 animate-float">
  <div className="w-10 h-10 rounded-full bg-teal/20 flex items-center justify-center">
    <Award className="w-5 h-5 text-teal" />
  </div>
  <div>
    <p className="font-bold text-foreground text-lg">5,000+</p>
    <p className="text-muted-foreground text-xs">Exams Booked Successfully</p>
  </div>
</div>

{/* Admission Success Card (nudged left & down for gap) */}
<div className="absolute right-12 bottom-12 floating-card animate-float-slow">
  <div className="flex items-center gap-2">
    <div className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center">
      <Award className="w-4 h-4 text-secondary-foreground" />
    </div>
    <div>
      <p className="font-semibold text-secondary text-sm">Congrats!</p>
      <p className="text-muted-foreground text-xs">Admission Secured Abroad</p>
    </div>
  </div>
</div>

          </div>
        </div>
      </div>

      {/* Wave SVG */}
      <div className="absolute bottom-0 left-0 right-0 z-10">
        <svg
          viewBox="0 0 1440 120"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-auto"
          preserveAspectRatio="none"
        >
          <path
            d="M0 120L60 110C120 100 240 80 360 75C480 70 600 80 720 85C840 90 960 90 1080 85C1200 80 1320 70 1380 65L1440 60V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z"
            className="fill-background"
          />
        </svg>
      </div>

      {/* Gradient overlay for depth */}
      <div className="absolute inset-0 bg-gradient-to-br from-hero via-transparent to-indigo/30 pointer-events-none" />
    </section>
  );
}
