import { useState, useEffect, useCallback } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import img1 from "@/assets/student-1.jpg";
import img2 from "@/assets/student-2.jpg";
import img3 from "@/assets/student-3.jpg";

const testimonials = [
  {
    id: 1,
    name: "Meron Tadesse",
    role: "IELTS Student",
    content:
      "Nova Exams made my IELTS booking process incredibly smooth. The mentorship program helped me achieve a band score of 8.0!",
    rating: 5,
    image: img1,
  },
  {
    id: 2,
    name: "Dawit Haile",
    role: "TOEFL Student",
    content:
      "The exam room facilities were top-notch. Professional environment and excellent support throughout my TOEFL exam.",
    rating: 5,
    image: img2,
  },
  {
    id: 3,
    name: "Sara Alemayehu",
    role: "Duolingo Student",
    content:
      "I was nervous about taking my Duolingo exam, but Nova Exams guided me every step of the way. Highly recommend!",
    rating: 5,
    image: img3,
  },
  {
    id: 4,
    name: "Yohannes Bekele",
    role: "TOLC Student",
    content:
      "Best exam service in Ethiopia. The team is professional, responsive, and genuinely cares about student success.",
    rating: 5,
    image: img2,
  },
];

export function TestimonialsSection() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const next = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  }, []);

  const prev = useCallback(() => {
    setCurrentIndex(
      (prev) => (prev - 1 + testimonials.length) % testimonials.length
    );
  }, []);

  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(next, 3000);
    return () => clearInterval(interval);
  }, [isPaused, next]);

  const getVisibleIndices = () => {
    const prevIndex =
      (currentIndex - 1 + testimonials.length) % testimonials.length;
    const nextIndex = (currentIndex + 1) % testimonials.length;
    return [prevIndex, currentIndex, nextIndex];
  };

  const visibleIndices = getVisibleIndices();

  return (
    <section className="py-24 bg-background  min-h-screen flex items-center justify-center">
      <div className="bg-white rounded-2xl shadow-[0_8px_30px_rgba(0,0,0,0.12)] p-8 md:p-12">
        {/* Testimonials Carousel */}
        <div className="container mx-auto px-4">
          {/* Section Header */}
          <div className="text-center max-w-2xl mx-auto mb-20 relative">
            <span className="inline-block px-4 py-1 rounded-full bg-secondary/10 text-secondary font-medium text-sm mb-4">
              Testimonials
            </span>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-8">
              What Our <span className="text-gradient">Students Say</span>
            </h2>
            <div className="relative">
              <h2 className="font-display font-semibold text-3xl md:text-4xl text-foreground relative z-10 bottom-3">
                Testimonials
              </h2>
              <span className="absolute inset-0 flex items-center justify-center text-2xl md:text-8xl font-bold text-muted/95 pointer-events-none select-none -top-4 font-display">
                Testimonials
              </span>
            </div>
          </div>

          {/* Outer White Box */}

          <div
            className="relative max-w-6xl mx-auto items-center justify-center flex flex-col"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
          >
            {/* Navigation Buttons */}
            <button
              onClick={prev}
              className="absolute left-0 md:-left-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-card text-foreground flex items-center justify-center hover:bg-secondary hover:text-secondary-foreground transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-110 border border-border"
              aria-label="Previous testimonial"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={next}
              className="absolute right-0 md:-right-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-card text-foreground flex items-center justify-center hover:bg-secondary hover:text-secondary-foreground transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-110 border border-border"
              aria-label="Next testimonial"
            >
              <ChevronRight className="w-5 h-5" />
            </button>

            {/* Cards Container */}
            <div className="flex items-center justify-center gap-4 md:gap-6 px-12 md:px-16">
              {visibleIndices.map((index, position) => {
                const testimonial = testimonials[index];
                const isCenter = position === 1;

                return (
                  <Card
                    key={`card-${position}`}
                    className={cn(
                      "flex-shrink-0 bg-card border-border transition-all duration-500 w-full md:w-[340px]",
                      isCenter
                        ? "scale-100 opacity-100 shadow-2xl z-10 border-secondary"
                        : "hidden md:block scale-95 opacity-50 shadow-md hover:opacity-70"
                    )}
                  >
                    <CardContent className="p-6 md:p-8 min-h-[150px] md:min-h-[200px]">
                      <div key={testimonial.id} className="animate-fade-in">
                        <div className="flex items-center gap-3 mb-5">
                          {/* Avatar image */}
                          <img
                            src={testimonial.image}
                            alt={testimonial.name}
                            className="w-12 h-12 rounded-full object-cover shadow-lg"
                          />

                          <div>
                            <h4 className="font-semibold text-foreground text-base font-display">
                              {testimonial.name}
                            </h4>
                            <p className="text-secondary text-sm">
                              {testimonial.role}
                            </p>
                          </div>
                        </div>

                        {/* Rating stars */}
                        <div className="flex items-center mb-4">
                          {Array.from({ length: testimonial.rating }).map(
                            (_, i) => (
                              <svg
                                key={i}
                                xmlns="http://www.w3.org/2000/svg"
                                fill="currentColor"
                                viewBox="0 0 24 24"
                                className="w-5 h-5 text-yellow-400"
                              >
                                <path d="M12 .587l3.668 7.431 8.2 1.193-5.934 5.782 1.402 8.174L12 18.896l-7.336 3.871 1.402-8.174L.132 9.211l8.2-1.193z" />
                              </svg>
                            )
                          )}
                        </div>

                        <p className="text-muted-foreground leading-relaxed text-base">
                          {testimonial.content}
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>

            {/* Dots */}
            <div className="flex items-center justify-center gap-3 mt-12">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={cn(
                    "rounded-full transition-all duration-500 ease-out",
                    index === currentIndex
                      ? "w-8 h-3 bg-secondary"
                      : "w-3 h-3 bg-muted-foreground/30 hover:bg-secondary/50 hover:scale-125"
                  )}
                  aria-label={`Go to testimonial ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
