import { Footer } from "@/components/Footer";
import { ChatBot } from "@/components/ChatBot";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { Card, CardContent } from "@/components/ui/card";
import { Award, Target, Users, Heart } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { motion } from "framer-motion";
import { useTeamMembers } from "@/hooks/useTeam";

const values = [
  {
    icon: Award,
    title: "Excellence",
    description: "We strive for the highest standards in everything we do.",
  },
  {
    icon: Target,
    title: "Student Success",
    description: "Your success is our primary goal and motivation.",
  },
  {
    icon: Users,
    title: "Community",
    description: "Building a supportive community of learners.",
  },
  {
    icon: Heart,
    title: "Care",
    description: "We genuinely care about each student's journey.",
  },
];

const About = () => {
  const { data: team, isLoading } = useTeamMembers();

  return (
    <div className="min-h-screen bg-background">
      <Navbar bgColor="bg-gradient-secondary" />
      <main className="pt-20">
        {/* Hero */}
        <section className="py-24 bg-gradient-secondary">
          <div className="container mx-auto px-4 text-center">
            <motion.h1
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="font-display text-4xl md:text-5xl font-bold text-secondary-foreground mb-6"
              viewport={{ once: true }}
            >
              About <span className="text-primary">Nova Exams</span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-secondary-foreground/90 text-lg max-w-2xl mx-auto"
              viewport={{ once: true }}
            >
              Your trusted partner in international exam preparation and booking
              services, dedicated to helping Ethiopian students achieve their
              educational dreams.
            </motion.p>
          </div>
        </section>

        {/* Mission */}
        <section className="py-24">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
              >
                <span className="inline-block px-4 py-1 rounded-full bg-secondary/10 text-secondary font-medium text-sm mb-4">
                  Our Mission
                </span>
                <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-6">
                  Streamlining Exam Processes for{" "}
                  <span className="text-gradient-secondary">Success</span>
                </h2>
                <p className="text-muted-foreground text-lg leading-relaxed mb-6">
                  Nova Exams was founded with a simple mission: to make
                  international exam booking accessible, reliable, and
                  stress-free for Ethiopian students.
                </p>
                <p className="text-muted-foreground text-lg leading-relaxed">
                  We provide exam room services, expert mentorship, and seamless
                  exam purchasing, ensuring every student has the support they
                  need to succeed.
                </p>
              </motion.div>

              <div className="grid grid-cols-2 gap-4">
                {values.map((value, i) => (
                  <motion.div
                    key={value.title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: i * 0.1 }}
                    viewport={{ once: true }}
                  >
                    <Card className="bg-muted border-border shadow-sm hover:shadow-lg transition-shadow">
                      <CardContent className="p-6">
                        <div className="w-10 h-10 rounded-lg bg-gradient-secondary flex items-center justify-center mb-4">
                          <value.icon className="w-5 h-5 text-secondary-foreground" />
                        </div>
                        <h3 className="font-display font-semibold text-foreground mb-2">
                          {value.title}
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          {value.description}
                        </p>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Why Choose Us */}
        <section className="py-24 bg-muted">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-center max-w-2xl mx-auto mb-16"
              viewport={{ once: true }}
            >
              <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
                Why Choose <span className="text-gradient">Nova Exams?</span>
              </h2>
            </motion.div>
            <div className="grid md:grid-cols-3 gap-8">
              {[
                "Personalized service tailored to your needs",
                "Reliable and professional exam facilities",
                "Wide variety of internationally recognized exams",
                "Expert mentorship from high scorers",
                "Flexible scheduling options",
                "Transparent and competitive pricing",
              ].map((point, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: i * 0.05 }}
                  className="flex items-start gap-3"
                  viewport={{ once: true }}
                >
                  <div className="w-6 h-6 rounded-full bg-primary flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-primary-foreground text-sm font-bold">
                      {i + 1}
                    </span>
                  </div>
                  <p className="text-foreground">{point}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Team */}
        <section className="py-24">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-center max-w-2xl mx-auto mb-16"
              viewport={{ once: true }}
            >
              <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
                Meet Our <span className="text-gradient-secondary">Team</span>
              </h2>
            </motion.div>

            {isLoading ? (
              <p className="text-center text-muted-foreground">
                Loading team...
              </p>
            ) : (
              <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
                {team?.map((member, i) => (
                  <motion.div
                    key={member.id}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: i * 0.1 }}
                    className="flex"
                    viewport={{ once: true }}
                  >
                    <Card className="bg-card border-border shadow-md hover:shadow-lg transition-shadow flex flex-col w-full">
                      <CardContent className="p-6 flex flex-col items-center text-center flex-1">
                        <div className="w-24 h-24 rounded-full overflow-hidden mb-4 border-2 border-secondary flex items-center justify-center">
                          {member.image ? (
                            <img
                              src={member.image}
                              alt={member.name}
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <span className="w-full h-full flex items-center justify-center bg-purple-600 text-white font-bold text-2xl">
                              {member.name.charAt(0)}
                            </span>
                          )}
                        </div>
                        <h3 className="font-display font-semibold text-lg text-foreground">
                          {member.name}
                        </h3>
                        <p className="text-secondary text-sm mb-2">
                          {member.role}
                        </p>
                        <p className="text-muted-foreground text-sm line-clamp-3">
                          {member.bio}
                        </p>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        </section>
      </main>
      <Footer />
      <ChatBot />
      <WhatsAppButton />
    </div>
  );
};

export default About;
