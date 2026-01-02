import { useState } from "react";
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
  LinkIcon,
  Video,
  FileDown,
  Book,
  ArrowLeft,
} from "lucide-react";
import { toast } from "sonner";
import img1 from "@/assets/student-1.jpg";
import img2 from "@/assets/student-2.jpg";
import img3 from "@/assets/student-3.jpg";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Link, redirect } from "react-router-dom";

interface Resource {
  id: string;
  type: "pdf" | "video";
  title: string;
  description: string;
  url: string;
  videoType?: "youtube" | "social" | "upload";
}
interface Exam {
  id: string;
  examType: "Duolingo" | "TOEFL" | "Pearson" | "IELTS Home" | "Others";
  mentorship: string;
  examRoomService: number;
  sum: number;
}

const initialResources: Resource[] = [
  {
    id: "1",
    type: "pdf",
    title: "IELTS Preparation Guide",
    description: "Complete study guide with tips and strategies",
    url: "#",
  },
  {
    id: "2",
    type: "pdf",
    title: "TOEFL Speaking Templates",
    description: "Ready-to-use templates for all speaking tasks",
    url: "#",
  },
  {
    id: "3",
    type: "pdf",
    title: "Duolingo Quick Tips",
    description: "Essential tips for the Duolingo English Test",
    url: "#",
  },
  {
    id: "4",
    type: "pdf",
    title: "GRE Vocabulary List",
    description: "1000 most common GRE words",
    url: "#",
  },
  {
    id: "5",
    type: "video",
    title: "IELTS Writing Task 2 Masterclass",
    description: "Nova Exams",
    url: "https://youtube.com/watch?v=example1",
    videoType: "youtube",
  },
  {
    id: "6",
    type: "video",
    title: "How to Score 120 on TOEFL",
    description: "Nova Exams",
    url: "https://youtube.com/watch?v=example2",
    videoType: "youtube",
  },
];

const initialExams: Exam[] = [
  {
    id: "1",
    examType: "Duolingo",
    mentorship: "2 days (in person)",
    examRoomService: 5000,
    sum: 8000,
  },
  {
    id: "2",
    examType: "TOEFL",
    mentorship: "1 Week",
    examRoomService: 8000,
    sum: 15000,
  },
  {
    id: "3",
    examType: "Pearson",
    mentorship: "1 Month language Training",
    examRoomService: 10000,
    sum: 25000,
  },
  {
    id: "4",
    examType: "IELTS Home",
    mentorship: "2 Weeks",
    examRoomService: 12000,
    sum: 20000,
  },
  {
    id: "5",
    examType: "Others",
    mentorship: "Contact the center",
    examRoomService: 0,
    sum: 0,
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
  const [resources, setResources] = useState<Resource[]>(initialResources);
  const [resourceDialogOpen, setResourceDialogOpen] = useState(false);
  const [examDialogOpen, setExamDialogOpen] = useState(false);

  const [editingExam, setEditingExam] = useState<Exam | null>(null);
  const [editingTestimonial, setEditingTestimonial] = useState<
    (typeof initialTestimonials)[0] | null
  >(null);
  const [editingBlog, setEditingBlog] = useState<
    (typeof initialBlogPosts)[0] | null
  >(null);
  const [editingResource, setEditingResource] = useState<Resource | null>(null);
  const [isTestimonialDialogOpen, setIsTestimonialDialogOpen] = useState(false);
  const [isBlogDialogOpen, setIsBlogDialogOpen] = useState(false);

  const [resourceForm, setResourceForm] = useState({
    type: "pdf" as "pdf" | "video",
    title: "",
    description: "",
    url: "",
    videoType: "youtube" as "youtube" | "social" | "upload",
    videoFile: null as File | null,
    pdfFile: null as File | null,
    pdfUploadMode: "url" as "url" | "upload",
  });

  const [examForm, setExamForm] = useState({
    examType: "Duolingo" as
      | "Duolingo"
      | "TOEFL"
      | "Pearson"
      | "IELTS Home"
      | "Others",
    mentorship: "",
    examRoomService: "",
    sum: "",
  });

  const handleAddExam = () => {
    if (!examForm.examType || !examForm.mentorship) {
      toast.error("Please fill all fields");
      return;
    }
    const newExam = {
      examType: examForm.examType,
      mentorship: examForm.mentorship,
      examRoomService: Number(examForm.examRoomService) || 0,
      sum: Number(examForm.sum) || 0,
    };

    if (editingExam) {
      setExams(
        exams.map((e) => (e.id === editingExam.id ? { ...e, ...newExam } : e))
      );
      toast.success("Exam updated successfully");
    } else {
      setExams([...exams, { id: Date.now().toString(), ...newExam }]);
      toast.success("Exam added successfully");
    }

    setExamForm({
      examType: "Duolingo",
      mentorship: "",
      examRoomService: "",
      sum: "",
    });
    setEditingExam(null);
    setExamDialogOpen(false);
  };

  const handleEditExam = (exam: Exam) => {
    setEditingExam(exam);
    setExamForm({
      examType: exam.examType,
      mentorship: exam.mentorship,
      examRoomService: exam.examRoomService.toString(),
      sum: exam.sum.toString(),
    });
    setExamDialogOpen(true);
  };

  const handleDeleteExam = (id: string) => {
    setExams(exams.filter((e) => e.id !== id));
    toast.success("Exam deleted");
  };

  const handleVideoFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Create a local URL for the video file
      const videoUrl = URL.createObjectURL(file);
      setResourceForm({ ...resourceForm, videoFile: file, url: videoUrl });
    }
  };

  // Handle PDF file upload
  const handlePdfFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Create a local URL for the PDF file
      const pdfUrl = URL.createObjectURL(file);
      setResourceForm({ ...resourceForm, pdfFile: file, url: pdfUrl });
    }
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

  const handleAddResource = () => {
    if (!resourceForm.title || !resourceForm.description) {
      toast.error("Please fill all fields");
      return;
    }

    if (editingResource) {
      setResources(
        resources.map((r) =>
          r.id === editingResource.id ? { ...r, ...resourceForm } : r
        )
      );
      toast.success("Resource updated successfully");
    } else {
      setResources([
        ...resources,
        { id: Date.now().toString(), ...resourceForm },
      ]);
      toast.success("Resource added successfully");
    }
    setResourceForm({
      type: "pdf",
      title: "",
      description: "",
      url: "",
      videoType: "youtube",
      videoFile: null,
      pdfFile: null,
      pdfUploadMode: "url",
    });
    setEditingResource(null);
    setResourceDialogOpen(false);
  };
  const handleDeleteResource = (id: string) => {
    setResources(resources.filter((r) => r.id !== id));
    toast.success("Resource deleted");
  };

  const pdfResources = resources.filter((r) => r.type === "pdf");
  const videoResources = resources.filter((r) => r.type === "video");

  return (
    <div className="min-h-screen bg-background relative">
      <div className="absolute top-4 right-4">
        <Button onClick={() => {}} variant="destructive">
          Logout
        </Button>
      </div>

      <main>
        <div className="container mx-auto px-4 py-12 relative">
          <div className="absolute top-4 left-4">
            <Link
              to="/"
              className="absolute  flex items-center space-x-2 rounded-md px-3 py-2 bg-muted text-muted-foreground hover:bg-primary transition-colors"
            >
              <ArrowLeft className="h-5 w-5" />
              <span className="font-medium">Back</span>
            </Link>
          </div>
          <div className="mb-8 mt-5">
            <h1 className="text-4xl font-display font-bold text-foreground mb-2">
              Admin Dashboard
            </h1>
            <p className="text-muted-foreground">
              Manage exams, testimonials, blog posts and resources
            </p>
          </div>
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
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
            <Card className="bg-gradient-to-br from-indigo/10 to-indigo/5 border-indigo/20">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  Resources
                </CardTitle>
                <Book className="h-5 w-5 text-indigo" />
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-foreground">
                  {resources.length}
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
              <TabsTrigger
                value="Resources"
                className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
              >
                Resources
              </TabsTrigger>
            </TabsList>

            {/* Exams Tab */}
            <TabsContent value="exams">
              <Card className="bg-white">
                <CardContent className="p-6">
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-semibold text-neutral-dark">
                      Manage Exam Prices
                    </h2>
                    <Dialog
                      open={examDialogOpen}
                      onOpenChange={setExamDialogOpen}
                    >
                      <DialogTrigger asChild>
                        <Button
                          className="gap-2"
                          onClick={() => {
                            setEditingExam(null);
                            setExamForm({
                              examType: "Duolingo",
                              mentorship: "",
                              examRoomService: "",
                              sum: "",
                            });
                          }}
                        >
                          <Plus className="w-4 h-4 mr-2" />
                          Add Exam
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="bg-card">
                        <DialogHeader>
                          <DialogTitle>
                            {editingExam ? "Edit Exam" : "Add New Exam"}
                          </DialogTitle>
                        </DialogHeader>
                        <div className="space-y-4 mt-4">
                          <div>
                            <Label>Exam Type</Label>
                            <Select
                              value={examForm.examType}
                              onValueChange={(
                                value:
                                  | "Duolingo"
                                  | "TOEFL"
                                  | "Pearson"
                                  | "IELTS Home"
                                  | "Others"
                              ) =>
                                setExamForm({ ...examForm, examType: value })
                              }
                            >
                              <SelectTrigger>
                                <SelectValue placeholder="Select exam type" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="Duolingo">
                                  Duolingo
                                </SelectItem>
                                <SelectItem value="TOEFL">TOEFL</SelectItem>
                                <SelectItem value="Pearson">Pearson</SelectItem>
                                <SelectItem value="IELTS Home">
                                  IELTS Home
                                </SelectItem>
                                <SelectItem value="Others">Others</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          <div>
                            <Label>Mentorship</Label>
                            <Input
                              value={examForm.mentorship}
                              onChange={(e) =>
                                setExamForm({
                                  ...examForm,
                                  mentorship: e.target.value,
                                })
                              }
                              placeholder="e.g., 2 days (in person)"
                            />
                          </div>
                          <div>
                            <Label>Exam Room Service (ETB)</Label>
                            <Input
                              type="number"
                              value={examForm.examRoomService}
                              onChange={(e) =>
                                setExamForm({
                                  ...examForm,
                                  examRoomService: e.target.value,
                                })
                              }
                              placeholder="e.g., 5000"
                            />
                          </div>
                          <div>
                            <Label>Sum (ETB)</Label>
                            <Input
                              type="number"
                              value={examForm.sum}
                              onChange={(e) =>
                                setExamForm({
                                  ...examForm,
                                  sum: e.target.value,
                                })
                              }
                              placeholder="e.g., 8000"
                            />
                          </div>
                          <Button onClick={handleAddExam} className="w-full">
                            {editingExam ? "Update Exam" : "Add Exam"}
                          </Button>
                        </div>
                      </DialogContent>
                    </Dialog>
                  </div>

                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b">
                          <th className="text-left py-3 px-4 text-muted-foreground font-medium">
                            Exam Type
                          </th>
                          <th className="text-left py-3 px-4 text-muted-foreground font-medium">
                            Mentorship
                          </th>
                          <th className="text-left py-3 px-4 text-muted-foreground font-medium">
                            Exam Room Service
                          </th>
                          <th className="text-left py-3 px-4 text-muted-foreground font-medium">
                            Sum
                          </th>
                          <th className="text-right py-3 px-4 text-muted-foreground font-medium">
                            Actions
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {exams.map((exam) => (
                          <tr
                            key={exam.id}
                            className="border-b hover:bg-muted/5"
                          >
                            <td className="py-4 px-4 font-medium text-neutral-dark">
                              {exam.examType}
                            </td>
                            <td className="py-4 px-4 text-neutral-dark">
                              {exam.mentorship}
                            </td>
                            <td className="py-4 px-4 text-neutral-dark">
                              {exam.examType === "Others"
                                ? "-"
                                : exam.examRoomService.toLocaleString() +
                                  " ETB"}
                            </td>
                            <td className="py-4 px-4 text-neutral-dark">
                              {exam.examType === "Others"
                                ? "-"
                                : exam.sum.toLocaleString() + " ETB"}
                            </td>
                            <td className="py-4 px-4">
                              <div className="flex justify-end gap-2">
                                <Button
                                  variant="outline"
                                  size="icon"
                                  onClick={() => handleEditExam(exam)}
                                  className="h-8 w-8"
                                >
                                  <Pencil className="w-4 h-4" />
                                </Button>
                                <Button
                                  variant="destructive"
                                  size="icon"
                                  onClick={() => handleDeleteExam(exam.id)}
                                  className="h-8 w-8 border-destructive/30 hover:bg-destructive/10"
                                >
                                  <Trash2 className="w-4 h-4" />
                                </Button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
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
            <TabsContent value="Resources">
              <Card className="bg-white">
                <CardContent className="p-6">
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-semibold text-neutral-dark">
                      Manage Resources
                    </h2>
                    <Dialog
                      open={resourceDialogOpen}
                      onOpenChange={setResourceDialogOpen}
                    >
                      <DialogTrigger asChild>
                        <Button
                          className="bg-accent text-accent-foreground hover:bg-accent/90"
                          onClick={() => {
                            setEditingResource(null);
                            setResourceForm({
                              type: "pdf",
                              title: "",
                              description: "",
                              url: "",
                              videoType: "youtube",
                              videoFile: null,
                              pdfFile: null,
                              pdfUploadMode: "url",
                            });
                          }}
                        >
                          <Plus className="w-4 h-4 mr-2" />
                          Add Resource
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="bg-white">
                        <DialogHeader>
                          <DialogTitle>
                            {editingResource
                              ? "Edit Resource"
                              : "Add New Resource"}
                          </DialogTitle>
                        </DialogHeader>
                        <div className="space-y-4 mt-4">
                          <div>
                            <Label>Resource Type</Label>
                            <Select
                              value={resourceForm.type}
                              onValueChange={(value: "pdf" | "video") =>
                                setResourceForm({
                                  ...resourceForm,
                                  type: value,
                                })
                              }
                            >
                              <SelectTrigger>
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="pdf">
                                  PDF Document
                                </SelectItem>
                                <SelectItem value="video">Video</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          <div>
                            <Label>Title</Label>
                            <Input
                              value={resourceForm.title}
                              onChange={(e) =>
                                setResourceForm({
                                  ...resourceForm,
                                  title: e.target.value,
                                })
                              }
                              placeholder="Resource title"
                            />
                          </div>
                          <div>
                            <Label>Description</Label>
                            <Input
                              value={resourceForm.description}
                              onChange={(e) =>
                                setResourceForm({
                                  ...resourceForm,
                                  description: e.target.value,
                                })
                              }
                              placeholder="Brief description"
                            />
                          </div>
                          {resourceForm.type === "pdf" && (
                            <div>
                              <Label>PDF Source</Label>
                              <Select
                                value={resourceForm.pdfUploadMode}
                                onValueChange={(value: "url" | "upload") =>
                                  setResourceForm({
                                    ...resourceForm,
                                    pdfUploadMode: value,
                                  })
                                }
                              >
                                <SelectTrigger>
                                  <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="url">URL Link</SelectItem>
                                  <SelectItem value="upload">
                                    Upload File
                                  </SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                          )}
                          {resourceForm.type === "video" && (
                            <div>
                              <Label>Video Source</Label>
                              <Select
                                value={resourceForm.videoType}
                                onValueChange={(
                                  value: "youtube" | "social" | "upload"
                                ) =>
                                  setResourceForm({
                                    ...resourceForm,
                                    videoType: value,
                                  })
                                }
                              >
                                <SelectTrigger>
                                  <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="youtube">
                                    YouTube Link
                                  </SelectItem>
                                  <SelectItem value="social">
                                    Social Media Link
                                  </SelectItem>
                                  <SelectItem value="upload">
                                    Upload File
                                  </SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                          )}
                          {resourceForm.type === "pdf" &&
                          resourceForm.pdfUploadMode === "upload" ? (
                            <div>
                              <Label>Upload PDF File</Label>
                              <div className="mt-2">
                                <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-muted-foreground/30 rounded-lg cursor-pointer hover:bg-muted/10 transition-colors">
                                  <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                    <Upload className="w-8 h-8 mb-2 text-muted-foreground" />
                                    {resourceForm.pdfFile ? (
                                      <p className="text-sm text-primary font-medium">
                                        {resourceForm.pdfFile.name}
                                      </p>
                                    ) : (
                                      <>
                                        <p className="mb-1 text-sm text-muted-foreground">
                                          <span className="font-semibold">
                                            Click to upload
                                          </span>{" "}
                                          or drag and drop
                                        </p>
                                        <p className="text-xs text-muted-foreground">
                                          PDF files only (MAX. 50MB)
                                        </p>
                                      </>
                                    )}
                                  </div>
                                  <input
                                    type="file"
                                    className="hidden"
                                    accept=".pdf,application/pdf"
                                    onChange={handlePdfFileChange}
                                  />
                                </label>
                              </div>
                            </div>
                          ) : resourceForm.type === "video" &&
                            resourceForm.videoType === "upload" ? (
                            <div>
                              <Label>Upload Video File</Label>
                              <div className="mt-2">
                                <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-muted-foreground/30 rounded-lg cursor-pointer hover:bg-muted/10 transition-colors">
                                  <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                    <Upload className="w-8 h-8 mb-2 text-muted-foreground" />
                                    {resourceForm.videoFile ? (
                                      <p className="text-sm text-primary font-medium">
                                        {resourceForm.videoFile.name}
                                      </p>
                                    ) : (
                                      <>
                                        <p className="mb-1 text-sm text-muted-foreground">
                                          <span className="font-semibold">
                                            Click to upload
                                          </span>{" "}
                                          or drag and drop
                                        </p>
                                        <p className="text-xs text-muted-foreground">
                                          MP4, WebM, MOV (MAX. 100MB)
                                        </p>
                                      </>
                                    )}
                                  </div>
                                  <input
                                    type="file"
                                    className="hidden"
                                    accept="video/*"
                                    onChange={handleVideoFileChange}
                                  />
                                </label>
                              </div>
                            </div>
                          ) : (
                            <div>
                              <Label>
                                {resourceForm.type === "pdf"
                                  ? "PDF URL"
                                  : "Video URL"}
                              </Label>
                              <Input
                                value={resourceForm.url}
                                onChange={(e) =>
                                  setResourceForm({
                                    ...resourceForm,
                                    url: e.target.value,
                                  })
                                }
                                placeholder={
                                  resourceForm.type === "pdf"
                                    ? "https://example.com/file.pdf"
                                    : "https://youtube.com/watch?v=..."
                                }
                              />
                            </div>
                          )}
                          <Button
                            onClick={handleAddResource}
                            className="w-full bg-accent text-accent-foreground hover:bg-accent/90"
                          >
                            {editingResource
                              ? "Update Resource"
                              : "Add Resource"}
                          </Button>
                        </div>
                      </DialogContent>
                    </Dialog>
                  </div>

                  {/* PDF Resources */}
                  <div className="mb-8">
                    <h3 className="text-lg font-semibold text-neutral-dark mb-4 flex items-center gap-2">
                      <FileDown className="w-5 h-5 text-primary" />
                      Downloadable Guides ({pdfResources.length})
                    </h3>
                    <div className="grid gap-3">
                      {pdfResources.map((resource) => (
                        <div
                          key={resource.id}
                          className="p-4 border rounded-lg flex justify-between items-center hover:bg-muted/5"
                        >
                          <div className="flex items-center gap-4">
                            <div className="p-2 bg-primary/10 rounded-lg">
                              <FileDown className="w-5 h-5 text-primary" />
                            </div>
                            <div>
                              <p className="font-medium text-neutral-dark">
                                {resource.title}
                              </p>
                              <p className="text-sm text-muted-foreground">
                                {resource.description}
                              </p>
                            </div>
                          </div>
                          <div className="flex justify-end gap-2">
                            <Button
                              variant="outline"
                              size="icon"
                              onClick={() => {
                                setEditingResource(resource);
                                setResourceDialogOpen(true);
                              }}
                            >
                              <Pencil className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="destructive"
                              size="icon"
                              onClick={() => handleDeleteResource(resource.id)}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Video Resources */}
                  <div>
                    <h3 className="text-lg font-semibold text-neutral-dark mb-4 flex items-center gap-2">
                      <Video className="w-5 h-5 text-tertiary" />
                      Video Resources ({videoResources.length})
                    </h3>
                    <div className="grid md:grid-cols-2 gap-4">
                      {videoResources.map((resource) => (
                        <div
                          key={resource.id}
                          className="border rounded-lg overflow-hidden hover:shadow-md transition-shadow"
                        >
                          <div className="aspect-video bg-neutral-dark flex items-center justify-center relative">
                            <Video className="w-12 h-12 text-white/50" />
                            <div className="absolute top-2 right-2 flex gap-1">
                              <span className="px-2 py-0.5 bg-white/20 text-white text-xs rounded-full flex items-center gap-1">
                                <LinkIcon className="w-3 h-3" />
                                {resource.videoType === "youtube"
                                  ? "YouTube"
                                  : resource.videoType === "social"
                                  ? "Social"
                                  : "Upload"}
                              </span>
                            </div>
                          </div>
                          <div className="p-4 bg-white">
                            <div className="flex justify-between items-start">
                              <div>
                                <p className="font-medium text-neutral-dark">
                                  {resource.title}
                                </p>
                                <p className="text-sm text-primary">
                                  {resource.description} ↗
                                </p>
                              </div>
                              <div className="flex justify-end gap-2">
                                <Button
                                  variant="outline"
                                  size="icon"
                                  onClick={() => {
                                    setEditingResource(resource);
                                    setResourceDialogOpen(true);
                                  }}
                                >
                                  <Pencil className="h-4 w-4" />
                                </Button>
                                <Button
                                  variant="destructive"
                                  size="icon"
                                  onClick={() =>
                                    handleDeleteResource(resource.id)
                                  }
                                >
                                  <Trash2 className="h-4 w-4" />
                                </Button>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
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
