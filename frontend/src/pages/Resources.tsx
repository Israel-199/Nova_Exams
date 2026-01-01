import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ChatBot } from "@/components/ChatBot";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileText, Video, ExternalLink, Download } from "lucide-react";
import { motion } from "framer-motion";

const guides = [
  { title: "IELTS Preparation Guide", description: "Complete study guide with tips and strategies", type: "PDF" },
  { title: "TOEFL Speaking Templates", description: "Ready-to-use templates for all speaking tasks", type: "PDF" },
  { title: "Duolingo Quick Tips", description: "Essential tips for the Duolingo English Test", type: "PDF" },
  { title: "GRE Vocabulary List", description: "1000 most common GRE words", type: "PDF" },
];

const videos = [
  { title: "IELTS Writing Task 2 Masterclass", channel: "Nova Exams", url: "#" },
  { title: "How to Score 120 on TOEFL", channel: "Nova Exams", url: "#" },
  { title: "Duolingo Test Walkthrough", channel: "Nova Exams", url: "#" },
  { title: "TOLC Preparation Tips", channel: "Nova Exams", url: "#" },
];

const Resources = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar bgColor="bg-gradient-secondary" />
      <main className="pt-20">
        {/* Hero */}
        <section className="py-16 bg-gradient-secondary">
          <div className="container mx-auto px-4 text-center">
            <motion.h1
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="font-display text-4xl md:text-5xl font-bold text-secondary-foreground mb-6"
            >
              <span className="text-primary">Resources</span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-secondary-foreground/90 text-lg max-w-2xl mx-auto"
            >
              Free study materials, guides, and video content to help you
              prepare for your exams.
            </motion.p>
          </div>
        </section>

        {/* Downloadable Guides */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="mb-12"
            >
              <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-4">
                📚 Downloadable Guides
              </h2>
              <p className="text-muted-foreground">
                Comprehensive study materials prepared by our expert mentors.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 gap-6">
              {guides.map((guide, i) => (
                <motion.div
                  key={guide.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: i * 0.1 }}
                >
                  <Card className="bg-card border-border shadow-sm hover:shadow-lg transition-shadow">
                    <CardContent className="p-6 flex items-center gap-4">
                      <div className="w-12 h-12 rounded-xl bg-gradient-secondary flex items-center justify-center flex-shrink-0">
                        <FileText className="w-6 h-6 text-secondary-foreground" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-display font-semibold text-foreground">
                          {guide.title}
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          {guide.description}
                        </p>
                      </div>
                      <Button variant="outline" size="sm">
                        <Download className="w-4 h-4 mr-2" />
                        {guide.type}
                      </Button>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Video Resources */}
        <section className="py-16 bg-muted">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="mb-12"
            >
              <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-4">
                🎥 Video Resources
              </h2>
              <p className="text-muted-foreground">
                Watch our YouTube tutorials and preparation videos.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 gap-6">
              {videos.map((video, i) => (
                <motion.div
                  key={video.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: i * 0.1 }}
                >
                  <Card className="bg-card border-border shadow-sm hover:shadow-lg transition-shadow group cursor-pointer">
                    <CardContent className="p-6">
                      <motion.div
                        whileHover={{ scale: 1.05 }}
                        className="aspect-video bg-indigo rounded-lg mb-4 flex items-center justify-center group-hover:bg-secondary transition-colors"
                      >
                        <Video className="w-12 h-12 text-indigo-foreground" />
                      </motion.div>
                      <h3 className="font-display font-semibold text-foreground mb-1">
                        {video.title}
                      </h3>
                      <p className="text-sm text-muted-foreground flex items-center gap-1">
                        {video.channel}
                        <ExternalLink className="w-3 h-3" />
                      </p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16">
          <div className="container mx-auto px-4 text-center">
            <motion.h2
              initial={{ opacity: 0, y: -20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="font-display text-2xl md:text-3xl font-bold text-foreground mb-4"
            >
              Need More Help?
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-muted-foreground mb-8"
            >
              Our mentorship program provides personalized guidance for your
              exam preparation.
            </motion.p>
            <motion.div whileHover={{ scale: 1.05 }}>
              <Button variant="cta" size="lg" asChild>
                <a href="/booking">Get Mentorship</a>
              </Button>
            </motion.div>
          </div>
        </section>
      </main>
      <Footer />
      <ChatBot />
      <WhatsAppButton />
    </div>
  );
};

export default Resources;
