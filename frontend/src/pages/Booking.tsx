import { useState } from "react";
// import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ChatBot } from "@/components/ChatBot";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, Calendar, CreditCard } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { ConsultationBooking } from "@/components/ConsultationBooking";

const exams = [
  { id: "duolingo", name: "Duolingo", basePrice: 5500, description: "Quick English proficiency test" },
  { id: "toefl", name: "TOEFL", basePrice: 8500, description: "Globally recognized English test" },
  { id: "ielts", name: "IELTS", basePrice: 9000, description: "World's most popular English test" },
  { id: "tolc", name: "TOLC", basePrice: 4000, description: "Italian university admission test" },
  { id: "gre", name: "GRE", basePrice: 12000, description: "Graduate school admission test" },
  { id: "gmat", name: "GMAT", basePrice: 15000, description: "Business school admission test" },
];

const MENTORSHIP_PRICE = 2000;

const Booking = () => {
  const { toast } = useToast();
  const [selectedExam, setSelectedExam] = useState<string | null>(null);
  const [wantsMentorship, setWantsMentorship] = useState(false);
  const [step, setStep] = useState(1);

  const selectedExamData = exams.find((e) => e.id === selectedExam);
  const totalPrice = selectedExamData
    ? selectedExamData.basePrice + (wantsMentorship ? MENTORSHIP_PRICE : 0)
    : 0;

  const handleProceed = () => {
    if (step === 1 && !selectedExam) {
      toast({
        title: "Please select an exam",
        description: "Choose the exam you want to book.",
        variant: "destructive",
      });
      return;
    }
    if (step < 3) {
      setStep(step + 1);
    } else {
      toast({
        title: "Booking Initiated!",
        description: "Redirecting to payment... (Demo)",
      });
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* <Navbar /> */}
      <main className="pt-20">
        {/* Hero */}
        <section className="py-16 bg-gradient-secondary">
          <div className="container mx-auto px-4 text-center">
            <h1 className="font-display text-4xl md:text-5xl font-bold text-secondary-foreground mb-6">
              Book Your <span className="text-primary">Exam</span>
            </h1>
            <p className="text-secondary-foreground/90 text-lg max-w-2xl mx-auto">
              Follow the simple steps below to book your exam with optional mentorship.
            </p>
          </div>
        </section>

        {/* Booking Steps */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            {/* Progress Steps */}
            <div className="flex items-center justify-center gap-4 mb-12">
              {[
                { num: 1, label: "Select Exam" },
                { num: 2, label: "Options" },
                { num: 3, label: "Payment" },
              ].map((s, i) => (
                <div key={s.num} className="flex items-center">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${
                      step >= s.num
                        ? "bg-gradient-secondary text-secondary-foreground"
                        : "bg-muted text-muted-foreground"
                    }`}
                  >
                    {step > s.num ? <CheckCircle className="w-5 h-5" /> : s.num}
                  </div>
                  <span className={`ml-2 hidden sm:inline ${step >= s.num ? "text-foreground" : "text-muted-foreground"}`}>
                    {s.label}
                  </span>
                  {i < 2 && <div className={`w-12 h-1 mx-4 ${step > s.num ? "bg-secondary" : "bg-muted"}`} />}
                </div>
              ))}
            </div>

            <div className="max-w-4xl mx-auto">
              {/* Step 1: Select Exam */}
              {step === 1 && (
                <div>
                  <h2 className="font-display text-2xl font-bold text-foreground mb-6 text-center">
                    Choose Your Exam
                  </h2>
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {exams.map((exam) => (
                      <Card
                        key={exam.id}
                        className={`cursor-pointer transition-all ${
                          selectedExam === exam.id
                            ? "border-secondary ring-2 ring-secondary"
                            : "border-border hover:border-secondary/50"
                        }`}
                        onClick={() => setSelectedExam(exam.id)}
                      >
                        <CardHeader className="pb-2">
                          <div className="flex items-center justify-between">
                            <Badge className="bg-primary text-primary-foreground">{exam.name}</Badge>
                            {selectedExam === exam.id && (
                              <CheckCircle className="w-5 h-5 text-secondary" />
                            )}
                          </div>
                          <CardTitle className="text-lg font-display">{exam.name} Exam</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <p className="text-sm text-muted-foreground mb-3">{exam.description}</p>
                          <p className="font-bold text-foreground">
                            ETB {exam.basePrice.toLocaleString()}
                          </p>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              )}

              {/* Step 2: Options */}
              {step === 2 && (
                <div className="max-w-lg mx-auto">
                  <h2 className="font-display text-2xl font-bold text-foreground mb-6 text-center">
                    Additional Options
                  </h2>
                  <Card className="mb-6">
                    <CardContent className="p-6">
                      <div className="flex items-start gap-4">
                        <Checkbox
                          id="mentorship"
                          checked={wantsMentorship}
                          onCheckedChange={(checked) => setWantsMentorship(checked as boolean)}
                        />
                        <div className="flex-1">
                          <label htmlFor="mentorship" className="font-display font-semibold text-foreground cursor-pointer">
                            Add Mentorship Program
                          </label>
                          <p className="text-sm text-muted-foreground mt-1">
                            Get expert guidance and preparation tips from high scorers. Includes study materials and practice sessions.
                          </p>
                          <p className="text-secondary font-bold mt-2">+ETB {MENTORSHIP_PRICE.toLocaleString()}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="bg-muted">
                    <CardContent className="p-6">
                      <h3 className="font-display font-semibold text-foreground mb-4">Included Services:</h3>
                      <ul className="space-y-2">
                        <li className="flex items-center gap-2 text-foreground">
                          <CheckCircle className="w-4 h-4 text-secondary" />
                          Exam-based preparation
                        </li>
                        <li className="flex items-center gap-2 text-foreground">
                          <CheckCircle className="w-4 h-4 text-secondary" />
                          Professional Exam Environment
                        </li>
                        <li className="flex items-center gap-2 text-foreground">
                          <CheckCircle className="w-4 h-4 text-secondary" />
                          Technical Support
                        </li>
                      </ul>
                    </CardContent>
                  </Card>
                </div>
              )}

              {/* Step 3: Payment */}
              {step === 3 && (
                <div className="max-w-lg mx-auto">
                  <h2 className="font-display text-2xl font-bold text-foreground mb-6 text-center">
                    Confirm & Pay
                  </h2>
                  <Card className="mb-6">
                    <CardContent className="p-6">
                      <h3 className="font-display font-semibold text-foreground mb-4">Order Summary</h3>
                      <div className="space-y-3 mb-6">
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">{selectedExamData?.name} Exam</span>
                          <span className="text-foreground">ETB {selectedExamData?.basePrice.toLocaleString()}</span>
                        </div>
                        {wantsMentorship && (
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Mentorship Program</span>
                            <span className="text-foreground">ETB {MENTORSHIP_PRICE.toLocaleString()}</span>
                          </div>
                        )}
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Exam Room Service</span>
                          <span className="text-foreground">Included</span>
                        </div>
                        <div className="border-t border-border pt-3 flex justify-between font-bold">
                          <span className="text-foreground">Total</span>
                          <span className="text-secondary text-xl">ETB {totalPrice.toLocaleString()}</span>
                        </div>
                      </div>

                      <div className="flex items-center gap-3 p-4 bg-muted rounded-lg">
                        <CreditCard className="w-6 h-6 text-secondary" />
                        <div>
                          <p className="font-medium text-foreground">Pay with Chapa</p>
                          <p className="text-sm text-muted-foreground">Secure payment processing</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              )}

              {/* Navigation Buttons */}
              <div className="flex justify-between mt-8">
                {step > 1 && (
                  <Button variant="outline" onClick={() => setStep(step - 1)}>
                    Back
                  </Button>
                )}
                <Button
                  variant="hero"
                  size="lg"
                  onClick={handleProceed}
                  className={step === 1 ? "w-full" : "ml-auto"}
                >
                  {step === 3 ? "Proceed to Payment" : "Continue"}
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Consultation Booking Section */}
        <ConsultationBooking />
      </main>
      <Footer />
      <ChatBot />
      <WhatsAppButton />
    </div>
  );
};

export default Booking;
