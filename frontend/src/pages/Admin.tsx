import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft, Loader2 } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";

import AdminStats from "@/components/admin/AdminStats";
import ExamsSection from "../components/admin/ExamSection";
import TestimonialsSection from "../components/admin/TestimonialSection";
import BlogPostsSection from "../components/admin/BlogPostsSection";
import ResourcesSection from "../components/admin/ResourceSection";
import { useExams } from "../hooks/useExam";
import { useLogout, useSession } from "../hooks/useAuth";

const Admin = () => {
  const { toast } = useToast();
  const navigate = useNavigate();

  // ✅ React Query fetches exams from backend
  const {
    data: exams = [],
    isLoading: isExamsLoading,
    error: examsError,
  } = useExams();

  const logout = useLogout();
  const { data: user } = useSession();

  const handleLogoutClick = async () => {
    const confirmed = window.confirm("Are you sure you want to log out?");
    if (confirmed) {
      await logout();
      toast({ title: "Logged out", description: "Session cleared" });
      navigate("/login");
    }
  };

  return (
    <div className="min-h-screen bg-background relative">
      {/* Logout button */}
      <div className="absolute top-4 right-4 z-50">
        <button
          onClick={handleLogoutClick}
          className="px-5 py-2 rounded-lg border border-red-700
                     bg-red-500 text-white font-medium
                     cursor-pointer transition-all duration-200
                     hover:bg-red-600 hover:shadow-lg
                     active:bg-red-700 active:scale-95
                     focus:outline-none focus:ring-2 focus:ring-red-400"
        >
          Logout
        </button>
      </div>

      <main>
        <div className="container mx-auto px-4 py-12 relative">
          {/* Back link */}
          <div className="absolute top-4 left-4">
            <Link
              to="/"
              className="flex items-center space-x-2 rounded-md px-3 py-2 bg-muted text-muted-foreground hover:bg-primary transition-colors"
            >
              <ArrowLeft className="h-5 w-5" />
              <span className="font-medium">Back</span>
            </Link>
          </div>

          {/* Header */}
          <div className="mb-8 mt-5">
            <h1 className="text-4xl font-display font-bold text-foreground mb-2">
              Admin Dashboard
            </h1>
            {user ? (
              <p className="text-lg font-medium text-foreground">
                Welcome back, {user.name || user.email}!
              </p>
            ) : (
              <p className="text-lg font-medium text-foreground">Not logged in</p>
            )}
            <p className="text-muted-foreground">
              Manage exams, testimonials, blog posts and resources
            </p>
          </div>

          {/* Stats Cards */}
          <AdminStats
            examsCount={exams.length}
            testimonialsCount={0}
            blogPostsCount={0}
            resourcesCount={0}
          />

          {/* Tabs */}
          <Tabs defaultValue="exams" className="space-y-6">
            <TabsList className="bg-muted/50 p-1">
              <TabsTrigger value="exams">Exam Prices</TabsTrigger>
              <TabsTrigger value="testimonials">Testimonials</TabsTrigger>
              <TabsTrigger value="blog">Blog Posts</TabsTrigger>
              <TabsTrigger value="resources">Resources</TabsTrigger>
            </TabsList>

            <TabsContent value="exams">
              {isExamsLoading ? (
                <div className="flex justify-center py-10">
                  <Loader2 className="w-6 h-6 animate-spin text-muted-foreground" />
                </div>
              ) : examsError ? (
                <p className="text-red-500 text-center">Failed to load exams</p>
              ) : (
                <ExamsSection/>
              )}
            </TabsContent>

            <TabsContent value="testimonials">
              <TestimonialsSection testimonials={[]} setTestimonials={() => {}} />
            </TabsContent>

            <TabsContent value="blog">
              <BlogPostsSection blogPosts={[]} setBlogPosts={() => {}} />
            </TabsContent>

            <TabsContent value="resources">
              <ResourcesSection resources={[]} setResources={() => {}} />
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  );
};

export default Admin;
