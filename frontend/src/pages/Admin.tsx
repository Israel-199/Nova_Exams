import { useState } from "react";
// import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import {
  Plus,
  Pencil,
  Trash2,
  DollarSign,
  MessageSquare,
  FileText,
  Upload,
} from "lucide-react";
import { toast } from "sonner";
import img1 from "@/assets/student-1.jpg";
import img2 from "@/assets/student-2.jpg";
import img3 from "@/assets/student-3.jpg";

// Mock data
const initialExams = [
  {
    id: 1,
    name: "SAT",
    price: 15000,
    description: "Scholastic Assessment Test",
  },
  {
    id: 2,
    name: "IELTS",
    price: 12000,
    description: "International English Language Testing System",
  },
  {
    id: 3,
    name: "TOEFL",
    price: 10000,
    description: "Test of English as a Foreign Language",
  },
  {
    id: 4,
    name: "GRE",
    price: 18000,
    description: "Graduate Record Examination",
  },
  {
    id: 5,
    name: "GMAT",
    price: 20000,
    description: "Graduate Management Admission Test",
  },
];

const initialTestimonials = [
  {
    id: 1,
    name: "Hana Kebede",
    exam: "SAT",
    score: "1520",
    content: "Nova Exams helped me achieve my dream score!",
    image: img1,
  },
  {
    id: 2,
    name: "Sara Tesfaye",
    exam: "IELTS",
    score: "8.5",
    content: "The mentorship program was incredibly helpful.",
    image: img3,
  },
  {
    id: 3,
    name: "Daniel Mekonnen",
    exam: "TOEFL",
    score: "115",
    content: "Best preparation center in Ethiopia!",
    image: img2,
  },
];

const initialBlogPosts = [
  {
    id: 1,
    title: "How to Score 1500+ on SAT",
    category: "SAT Tips",
    excerpt: "Master strategies for the SAT exam...",
    date: "2024-01-15",
  },
  {
    id: 2,
    title: "IELTS Writing Task 2 Guide",
    category: "IELTS Tips",
    excerpt: "Complete guide to ace your writing...",
    date: "2024-01-10",
  },
  {
    id: 3,
    title: "GRE vs GMAT: Which to Choose?",
    category: "Study Abroad",
    excerpt: "Comparing the two major graduate exams...",
    date: "2024-01-05",
  },
];

const Admin = () => {
  const [exams, setExams] = useState(initialExams);
  const [testimonials, setTestimonials] = useState(initialTestimonials);
  const [blogPosts, setBlogPosts] = useState(initialBlogPosts);

  const [editingExam, setEditingExam] = useState<
    (typeof initialExams)[0] | null
  >(null);
  const [editingTestimonial, setEditingTestimonial] = useState<
    (typeof initialTestimonials)[0] | null
  >(null);
  const [editingBlog, setEditingBlog] = useState<
    (typeof initialBlogPosts)[0] | null
  >(null);

  const [isExamDialogOpen, setIsExamDialogOpen] = useState(false);
  const [isTestimonialDialogOpen, setIsTestimonialDialogOpen] = useState(false);
  const [isBlogDialogOpen, setIsBlogDialogOpen] = useState(false);

  // Exam handlers

  const handleSaveExam = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const examData = {
      id: editingExam?.id || Date.now(),
      name: formData.get("name") as string,
      price: Number(formData.get("price")),
      description: formData.get("description") as string,
    };

    if (editingExam) {
      setExams(exams.map((ex) => (ex.id === editingExam.id ? examData : ex)));
      toast.success("Exam updated successfully!");
    } else {
      setExams([...exams, examData]);
      toast.success("Exam added successfully!");
    }
    setEditingExam(null);
    setIsExamDialogOpen(false);
  };

  const handleDeleteExam = (id: number) => {
    setExams(exams.filter((ex) => ex.id !== id));
    toast.success("Exam deleted successfully!");
  };

  // Testimonial handlers
  const handleSaveTestimonial = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const testimonialData = {
      id: editingTestimonial?.id || Date.now(),
      name: formData.get("name") as string,
      exam: formData.get("exam") as string,
      score: formData.get("score") as string,
      content: formData.get("content") as string,
      image: formData.get("image") as string,
    };

    if (editingTestimonial) {
      setTestimonials(
        testimonials.map((t) =>
          t.id === editingTestimonial.id ? testimonialData : t
        )
      );
      toast.success("Testimonial updated successfully!");
    } else {
      setTestimonials([...testimonials, testimonialData]);
      toast.success("Testimonial added successfully!");
    }
    setEditingTestimonial(null);
    setIsTestimonialDialogOpen(false);
  };

  const handleDeleteTestimonial = (id: number) => {
    setTestimonials(testimonials.filter((t) => t.id !== id));
    toast.success("Testimonial deleted successfully!");
  };

  // Blog handlers
  const handleSaveBlog = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const blogData = {
      id: editingBlog?.id || Date.now(),
      title: formData.get("title") as string,
      category: formData.get("category") as string,
      excerpt: formData.get("excerpt") as string,
      date: formData.get("date") as string,
    };

    if (editingBlog) {
      setBlogPosts(
        blogPosts.map((b) => (b.id === editingBlog.id ? blogData : b))
      );
      toast.success("Blog post updated successfully!");
    } else {
      setBlogPosts([...blogPosts, blogData]);
      toast.success("Blog post added successfully!");
    }
    setEditingBlog(null);
    setIsBlogDialogOpen(false);
  };

  const handleDeleteBlog = (id: number) => {
    setBlogPosts(blogPosts.filter((b) => b.id !== id));
    toast.success("Blog post deleted successfully!");
  };

  return (
    <div className="min-h-screen bg-background">
      {/* <Navbar /> */}
      <main className="pt-20">
        <div className="container mx-auto px-4 py-12">
          <div className="mb-8">
            <h1 className="text-4xl font-display font-bold text-foreground mb-2">
              Admin Dashboard
            </h1>
            <p className="text-muted-foreground">
              Manage exams, testimonials, and blog posts
            </p>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <Card className="bg-gradient-to-br from-primary/10 to-primary/5 border-primary/20">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  Total Exams
                </CardTitle>
                <DollarSign className="h-5 w-5 text-primary" />
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-foreground">
                  {exams.length}
                </div>
              </CardContent>
            </Card>
            <Card className="bg-gradient-to-br from-magenta/10 to-magenta/5 border-magenta/20">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  Testimonials
                </CardTitle>
                <MessageSquare className="h-5 w-5 text-magenta" />
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-foreground">
                  {testimonials.length}
                </div>
              </CardContent>
            </Card>
            <Card className="bg-gradient-to-br from-indigo/10 to-indigo/5 border-indigo/20">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  Blog Posts
                </CardTitle>
                <FileText className="h-5 w-5 text-indigo" />
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-foreground">
                  {blogPosts.length}
                </div>
              </CardContent>
            </Card>
          </div>

          <Tabs defaultValue="exams" className="space-y-6">
            <TabsList className="bg-muted/50 p-1">
              <TabsTrigger
                value="exams"
                className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
              >
                Exam Prices
              </TabsTrigger>
              <TabsTrigger
                value="testimonials"
                className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
              >
                Testimonials
              </TabsTrigger>
              <TabsTrigger
                value="blog"
                className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
              >
                Blog Posts
              </TabsTrigger>
            </TabsList>

            {/* Exams Tab */}
            <TabsContent value="exams">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                  <CardTitle>Manage Exam Prices</CardTitle>
                  <Dialog
                    open={isExamDialogOpen}
                    onOpenChange={setIsExamDialogOpen}
                  >
                    <DialogTrigger asChild>
                      <Button
                        onClick={() => setEditingExam(null)}
                        className="gap-2"
                      >
                        <Plus className="h-4 w-4" /> Add Exam
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="bg-card">
                      <DialogHeader>
                        <DialogTitle>
                          {editingExam ? "Edit Exam" : "Add New Exam"}
                        </DialogTitle>
                      </DialogHeader>
                      <form onSubmit={handleSaveExam} className="space-y-4">
                        <div className="space-y-2">
                          <Label htmlFor="name">Exam Name</Label>
                          <Input
                            id="name"
                            name="name"
                            defaultValue={editingExam?.name}
                            required
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="price">Price (ETB)</Label>
                          <Input
                            id="price"
                            name="price"
                            type="number"
                            defaultValue={editingExam?.price}
                            required
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="description">Description</Label>
                          <Textarea
                            id="description"
                            name="description"
                            defaultValue={editingExam?.description}
                            required
                          />
                        </div>
                        <Button type="submit" className="w-full">
                          Save Exam
                        </Button>
                      </form>
                    </DialogContent>
                  </Dialog>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Exam Type</TableHead>
                        <TableHead>Price (ETB)</TableHead>
                        <TableHead>Description</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {exams.map((exam) => (
                        <TableRow key={exam.id}>
                          <TableCell className="font-medium">
                            {exam.name}
                          </TableCell>
                          <TableCell>{exam.price.toLocaleString()}</TableCell>
                          <TableCell className="max-w-xs truncate">
                            {exam.description}
                          </TableCell>
                          <TableCell className="text-right">
                            <div className="flex justify-end gap-2">
                              <Button
                                variant="outline"
                                size="icon"
                                onClick={() => {
                                  setEditingExam(exam);
                                  setIsExamDialogOpen(true);
                                }}
                              >
                                <Pencil className="h-4 w-4" />
                              </Button>
                              <Button
                                variant="destructive"
                                size="icon"
                                onClick={() => handleDeleteExam(exam.id)}
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Testimonials Tab */}
            <TabsContent value="testimonials">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                  <CardTitle>Manage Testimonials</CardTitle>
                  <Dialog
                    open={isTestimonialDialogOpen}
                    onOpenChange={setIsTestimonialDialogOpen}
                  >
                    <DialogTrigger asChild>
                      <Button
                        onClick={() => setEditingTestimonial(null)}
                        className="gap-2"
                      >
                        <Plus className="h-4 w-4" /> Add Testimonial
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="bg-card">
                      <DialogHeader>
                        <DialogTitle>
                          {editingTestimonial
                            ? "Edit Testimonial"
                            : "Add New Testimonial"}
                        </DialogTitle>
                      </DialogHeader>
                      <form
                        onSubmit={handleSaveTestimonial}
                        className="space-y-4"
                      >
                        <div className="space-y-2">
                          <Label htmlFor="t-name">Student Name</Label>
                          <Input
                            id="t-name"
                            name="name"
                            defaultValue={editingTestimonial?.name}
                            required
                          />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="exam">Exam</Label>
                            <Input
                              id="exam"
                              name="exam"
                              defaultValue={editingTestimonial?.exam}
                              required
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="score">Score</Label>
                            <Input
                              id="score"
                              name="score"
                              defaultValue={editingTestimonial?.score}
                              required
                            />
                          </div>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="content">Testimonial</Label>
                          <Textarea
                            id="content"
                            name="content"
                            defaultValue={editingTestimonial?.content}
                            required
                          />
                        </div>
                        <div className="space-y-2">
                          {" "}
                          <Label
                            htmlFor="image"
                            className="flex items-center gap-2"
                          >
                            {" "}
                            <Upload className="h-4 w-4 text-muted-foreground" />{" "}
                            Upload Image
                          </Label>{" "}
                          <Input
                            id="image"
                            name="image"
                            type="file"
                            accept="image/*"
                          />{" "}
                        </div>{" "}
                        <Button type="submit" className="w-full">
                          {" "}
                          Save Testimonial{" "}
                        </Button>
                      </form>
                    </DialogContent>
                  </Dialog>
                </CardHeader>

                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Image</TableHead>
                        <TableHead>Student</TableHead>
                        <TableHead>Exam</TableHead>
                        <TableHead>Score</TableHead>
                        <TableHead>Testimonial</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {testimonials.map((testimonial) => (
                        <TableRow key={testimonial.id}>
                          {/* ✅ Image cell */}
                          <TableCell>
                            {testimonial.image ? (
                              <img
                                src={testimonial.image}
                                alt={testimonial.name}
                                className="w-12 h-12 rounded-full object-cover"
                              />
                            ) : (
                              <span className="text-muted-foreground text-sm">
                                No image
                              </span>
                            )}
                          </TableCell>

                          <TableCell className="font-medium">
                            {testimonial.name}
                          </TableCell>
                          <TableCell>{testimonial.exam}</TableCell>
                          <TableCell>{testimonial.score}</TableCell>
                          <TableCell className="max-w-xs truncate">
                            {testimonial.content}
                          </TableCell>
                          <TableCell className="text-right">
                            <div className="flex justify-end gap-2">
                              <Button
                                variant="outline"
                                size="icon"
                                onClick={() => {
                                  setEditingTestimonial(testimonial);
                                  setIsTestimonialDialogOpen(true);
                                }}
                              >
                                <Pencil className="h-4 w-4" />
                              </Button>
                              <Button
                                variant="destructive"
                                size="icon"
                                onClick={() =>
                                  handleDeleteTestimonial(testimonial.id)
                                }
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Blog Tab */}
            <TabsContent value="blog">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                  <CardTitle>Manage Blog Posts</CardTitle>
                  <Dialog
                    open={isBlogDialogOpen}
                    onOpenChange={setIsBlogDialogOpen}
                  >
                    <DialogTrigger asChild>
                      <Button
                        onClick={() => setEditingBlog(null)}
                        className="gap-2"
                      >
                        <Plus className="h-4 w-4" /> Add Post
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="bg-card">
                      <DialogHeader>
                        <DialogTitle>
                          {editingBlog ? "Edit Blog Post" : "Add New Blog Post"}
                        </DialogTitle>
                      </DialogHeader>
                      <form onSubmit={handleSaveBlog} className="space-y-4">
                        <div className="space-y-2">
                          <Label htmlFor="title">Title</Label>
                          <Input
                            id="title"
                            name="title"
                            defaultValue={editingBlog?.title}
                            required
                          />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="category">Category</Label>
                            <Input
                              id="category"
                              name="category"
                              defaultValue={editingBlog?.category}
                              required
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="date">Date</Label>
                            <Input
                              id="date"
                              name="date"
                              type="date"
                              defaultValue={editingBlog?.date}
                              required
                            />
                          </div>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="excerpt">Excerpt</Label>
                          <Textarea
                            id="excerpt"
                            name="excerpt"
                            defaultValue={editingBlog?.excerpt}
                            required
                          />
                        </div>
                        <Button type="submit" className="w-full">
                          Save Post
                        </Button>
                      </form>
                    </DialogContent>
                  </Dialog>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Title</TableHead>
                        <TableHead>Category</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead>Excerpt</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {blogPosts.map((post) => (
                        <TableRow key={post.id}>
                          <TableCell className="font-medium">
                            {post.title}
                          </TableCell>
                          <TableCell>{post.category}</TableCell>
                          <TableCell>{post.date}</TableCell>
                          <TableCell className="max-w-xs truncate">
                            {post.excerpt}
                          </TableCell>
                          <TableCell className="text-right">
                            <div className="flex justify-end gap-2">
                              <Button
                                variant="outline"
                                size="icon"
                                onClick={() => {
                                  setEditingBlog(post);
                                  setIsBlogDialogOpen(true);
                                }}
                              >
                                <Pencil className="h-4 w-4" />
                              </Button>
                              <Button
                                variant="destructive"
                                size="icon"
                                onClick={() => handleDeleteBlog(post.id)}
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Admin;
