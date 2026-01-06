import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Plus, Pencil, Trash2, Upload } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Testimonial } from "@/types/admin";

interface TestimonialsSectionProps {
  testimonials: Testimonial[];
  setTestimonials: React.Dispatch<React.SetStateAction<Testimonial[]>>;
}

const TestimonialsSection = ({ testimonials, setTestimonials }: TestimonialsSectionProps) => {
  const [isTestimonialDialogOpen, setIsTestimonialDialogOpen] = useState(false);
  const [editingTestimonial, setEditingTestimonial] = useState<Testimonial | null>(null);

  const { toast } = useToast();

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
      toast({ title: "Testimonial updated successfully!" });
    } else {
      setTestimonials([...testimonials, testimonialData]);
      toast({ title: "Testimonial added successfully!" });
    }
    setEditingTestimonial(null);
    setIsTestimonialDialogOpen(false);
  };

  const handleDeleteTestimonial = (id: number) => {
    setTestimonials(testimonials.filter((t) => t.id !== id));
    toast({ title: "Testimonial deleted successfully!" });
  };

  return (
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
  );
};

export default TestimonialsSection;