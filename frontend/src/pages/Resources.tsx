import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ChatBot } from "@/components/ChatBot";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileText, Video, Download } from "lucide-react";
import { motion } from "framer-motion";
import { api } from "@/lib/api";

import { useResources } from "@/hooks/useResources";
import { Resource } from "@/types/admin";

const Resources = () => {
  const { data: resources = [], isLoading, error } = useResources();

  const guides = resources.filter((r: Resource) => r.type === "pdf");
  const videos = resources.filter((r: Resource) => r.type === "video");

  const API_BASE = api.defaults.baseURL;

  const isYouTube = (url?: string) =>
    !!url && (url.includes("youtube.com") || url.includes("youtu.be"));

  const toEmbedUrl = (url: string) => {
    if (url.includes("watch?v=")) return url.replace("watch?v=", "embed/");
    if (url.includes("youtu.be")) {
      const id = url.split("youtu.be/")[1]?.split("?")[0];
      return `https://www.youtube.com/embed/${id}`;
    }
    return url;
  };

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

            {isLoading ? (
              <p className="text-center text-muted-foreground">
                Loading guides...
              </p>
            ) : error ? (
              <p className="text-center text-red-500">
                Failed to load resources
              </p>
            ) : guides.length === 0 ? (
              <p className="text-center text-muted-foreground">
                No guides available.
              </p>
            ) : (
              <div className="grid md:grid-cols-2 gap-6">
                {guides.map((guide, i) => (
                  <motion.div
                    key={guide.id}
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
                        <Button variant="outline" size="sm" asChild>
                          <a
                            href={`${API_BASE}/resources/${guide.id}/download`}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <Download className="w-4 h-4 mr-2" />
                            PDF
                          </a>
                        </Button>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            )}
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
                Watch our tutorials and preparation videos.
              </p>
            </motion.div>

            {isLoading ? (
              <p className="text-center text-muted-foreground">
                Loading videos...
              </p>
            ) : error ? (
              <p className="text-center text-red-500">
                Failed to load resources
              </p>
            ) : videos.length === 0 ? (
              <p className="text-center text-muted-foreground">
                No videos available.
              </p>
            ) : (
              <div className="grid md:grid-cols-2 gap-6">
                {videos.map((video, i) => (
                  <motion.div
                    key={video.id}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: i * 0.1 }}
                  >
                    <Card className="bg-card border-border shadow-sm hover:shadow-lg transition-shadow group">
                      <CardContent className="p-6">
                        {isYouTube(video.sourceUrl) ? (
                          <div className="aspect-video mb-4">
                            <iframe
                              width="100%"
                              height="100%"
                              src={toEmbedUrl(video.sourceUrl)}
                              title={video.title}
                              frameBorder="0"
                              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                              allowFullScreen
                            />
                          </div>
                        ) : video.sourceUrl ? (
                          <video
                            controls
                            className="w-full rounded-lg mb-4"
                            src={video.sourceUrl}
                          />
                        ) : (
                          <motion.div
                            whileHover={{ scale: 1.05 }}
                            className="aspect-video bg-indigo rounded-lg mb-4 flex items-center justify-center group-hover:bg-secondary transition-colors"
                          >
                            <Video className="w-12 h-12 text-indigo-foreground" />
                          </motion.div>
                        )}

                        <h3 className="font-display font-semibold text-foreground mb-1">
                          {video.title}
                        </h3>
                        <p className="text-sm text-muted-foreground mb-3">
                          {video.description}
                        </p>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        </section>
        {/* CTA */}
        <section className="py-16">
          <div className="container mx-auto px-4 text-center overflow-x-hidden overflow-y-hidden">
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
              className="text-muted-foreground mb-8 text-lg"
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
