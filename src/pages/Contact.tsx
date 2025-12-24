// import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ChatBot } from "@/components/ChatBot";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { Mail, Phone, MapPin, Clock } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

const contactInfo = [
  { icon: Mail, label: "Email", value: "info@novaexams.com" },
  { icon: Phone, label: "Phone", value: "+251 911 123 456" },
  { icon: MapPin, label: "Address", value: "Addis Ababa, Ethiopia" },
  { icon: Clock, label: "Hours", value: "Mon-Sat: 8AM - 6PM" },
];

const Contact = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Message Sent!",
      description: "We'll get back to you within 24 hours.",
    });
    setFormData({ name: "", email: "", phone: "", subject: "", message: "" });
  };

  return (
    <div className="min-h-screen bg-background">
      {/* <Navbar /> */}
      <main className="pt-20">
        {/* Hero */}
        <section className="py-24 bg-gradient-secondary">
          <div className="container mx-auto px-4 text-center">
            <h1 className="font-display text-4xl md:text-5xl font-bold text-secondary-foreground mb-6">
              Contact <span className="text-primary">Us</span>
            </h1>
            <p className="text-secondary-foreground/90 text-lg max-w-2xl mx-auto">
              Have questions? We're here to help. Reach out to us and we'll respond as soon as possible.
            </p>
          </div>
        </section>

        {/* Contact Form & Info */}
        <section className="py-24">
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-12">
              {/* Contact Info */}
              <div>
                <h2 className="font-display text-2xl font-bold text-foreground mb-8">
                  Get in Touch
                </h2>
                <div className="grid sm:grid-cols-2 gap-4 mb-8">
                  {contactInfo.map((item) => (
                    <Card key={item.label} className="bg-muted border-border">
                      <CardContent className="p-4 flex items-center gap-4">
                        <div className="w-10 h-10 rounded-lg bg-gradient-secondary flex items-center justify-center">
                          <item.icon className="w-5 h-5 text-secondary-foreground" />
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">{item.label}</p>
                          <p className="font-medium text-foreground">{item.value}</p>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>

                <h3 className="font-display text-xl font-bold text-foreground mb-4">
                  Our Services
                </h3>
                <ul className="space-y-2 text-muted-foreground">
                  <li>• Exam Room Service - Professional exam facilities</li>
                  <li>• Exam Mentorship - Expert guidance and preparation</li>
                  <li>• Exam Purchase - Seamless exam booking</li>
                </ul>
              </div>

              {/* Contact Form */}
              <Card className="bg-card border-border">
                <CardContent className="p-8">
                  <h2 className="font-display text-2xl font-bold text-foreground mb-6">
                    Send Us a Message
                  </h2>
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <label className="text-sm font-medium text-foreground mb-2 block">Name</label>
                        <Input
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          placeholder="Your name"
                          required
                        />
                      </div>
                      <div>
                        <label className="text-sm font-medium text-foreground mb-2 block">Email</label>
                        <Input
                          type="email"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          placeholder="Your email"
                          required
                        />
                      </div>
                    </div>
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <label className="text-sm font-medium text-foreground mb-2 block">Phone</label>
                        <Input
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          placeholder="Your phone"
                        />
                      </div>
                      <div>
                        <label className="text-sm font-medium text-foreground mb-2 block">Subject</label>
                        <Input
                          value={formData.subject}
                          onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                          placeholder="Subject"
                          required
                        />
                      </div>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-foreground mb-2 block">Message</label>
                      <Textarea
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        placeholder="Your message"
                        rows={5}
                        required
                      />
                    </div>
                    <Button type="submit" variant="cta" size="lg" className="w-full">
                      Send Message
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <ChatBot />
      <WhatsAppButton />
    </div>
  );
};

export default Contact;
