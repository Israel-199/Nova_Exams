// import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ChatBot } from "@/components/ChatBot";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Calendar, Clock, User, Search } from "lucide-react";
import { useState } from "react";
import { Navbar } from "@/components/Navbar";

const posts = [
  {
    id: 1,
    title: "10 Tips to Ace Your IELTS Speaking Test",
    excerpt: "Master the IELTS speaking section with these proven strategies from our expert mentors.",
    category: "IELTS",
    author: "Yonas Tesfaye",
    date: "Dec 10, 2024",
    readTime: "5 min read",
  },
  {
    id: 2,
    title: "Duolingo vs TOEFL: Which Test Is Right for You?",
    excerpt: "A comprehensive comparison to help you choose the best English proficiency test for your goals.",
    category: "Guides",
    author: "Tigist Hailu",
    date: "Dec 5, 2024",
    readTime: "8 min read",
  },
  {
    id: 3,
    title: "How to Prepare for TOLC in 30 Days",
    excerpt: "A structured study plan to help you prepare effectively for the Italian university admission test.",
    category: "TOLC",
    author: "Abebe Kebede",
    date: "Nov 28, 2024",
    readTime: "6 min read",
  },
  {
    id: 4,
    title: "Understanding GRE Score Requirements",
    excerpt: "What scores do top universities really look for? We break down the numbers.",
    category: "GRE",
    author: "Yonas Tesfaye",
    date: "Nov 20, 2024",
    readTime: "7 min read",
  },
];

const categories = ["All", "IELTS", "TOEFL", "Duolingo", "TOLC", "GRE", "Guides"];

const Blog = () => {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredPosts = posts.filter((post) => {
    const matchesSearch = post.title.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = activeCategory === "All" || post.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-background">
      {/* <Navbar /> */}
      <Navbar/>
      <main className="pt-20">
        {/* Hero */}
        <section className="py-16 bg-gradient-secondary">
          <div className="container mx-auto px-4 text-center">
            <h1 className="font-display text-4xl md:text-5xl font-bold text-secondary-foreground mb-6">
              Nova <span className="text-primary">Blog</span>
            </h1>
            <p className="text-secondary-foreground/90 text-lg max-w-2xl mx-auto">
              Expert tips, study guides, and resources to help you succeed in your exams.
            </p>
          </div>
        </section>

        {/* Blog Content */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            {/* Search & Filters */}
            <div className="flex flex-col md:flex-row gap-4 mb-12">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input
                  placeholder="Search articles..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="pl-10"
                />
              </div>
              <div className="flex flex-wrap gap-2">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                      activeCategory === cat
                        ? "bg-secondary text-secondary-foreground"
                        : "bg-muted text-muted-foreground hover:bg-muted/80"
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {/* Posts Grid */}
            <div className="grid md:grid-cols-2 gap-6">
              {filteredPosts.map((post) => (
                <Card key={post.id} className="bg-card border-border hover:border-secondary/50 transition-colors group cursor-pointer">
                  <CardHeader>
                    <div className="flex items-center gap-2 mb-2">
                      <Badge className="bg-primary/10 text-primary hover:bg-primary/20">{post.category}</Badge>
                    </div>
                    <CardTitle className="font-display text-xl group-hover:text-secondary transition-colors">
                      {post.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground mb-4">{post.excerpt}</p>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <User className="w-4 h-4" />
                        {post.author}
                      </span>
                      <span className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        {post.date}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        {post.readTime}
                      </span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {filteredPosts.length === 0 && (
              <div className="text-center py-12">
                <p className="text-muted-foreground">No articles found. Try a different search term.</p>
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

export default Blog;
