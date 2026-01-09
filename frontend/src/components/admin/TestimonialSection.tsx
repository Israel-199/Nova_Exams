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
import { Plus, Pencil, Trash2, Upload, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Testimonial } from "@/types/admin";
import {
  useTestimonials,
  useAddTestimonial,
  useUpdateTestimonial,
  useDeleteTestimonial,
} from "@/hooks/useTestimonial";

const TestimonialsSection = () => {
  const [isTestimonialDialogOpen, setIsTestimonialDialogOpen] = useState(false);
  const [editingTestimonial, setEditingTestimonial] = useState<Testimonial | null>(null);

  const { toast } = useToast();


  const { data: testimonials = [], isLoading ,error} = useTestimonials();
  const addTestimonial = useAddTestimonial();
  const updateTestimonial = useUpdateTestimonial();
  const deleteTestimonial = useDeleteTestimonial();

   if (isLoading) {
      return (
        <div className="flex items-center justify-center min-h-[400px]">
          <Loader2 className="w-8 h-8 animate-spin text-secondary" />
        </div>
      );
    }

  const handleSaveTestimonial = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    if (editingTestimonial) {
      updateTestimonial.mutate(
        { id: editingTestimonial.id, formData },
        {
          onSuccess: () => {
            toast({ title: "Testimonial updated successfully!" });
            setIsTestimonialDialogOpen(false);
            setEditingTestimonial(null);
          },
          onError: () => toast({ title: "Failed to update testimonial" }),
        }
      );
    } else {
      addTestimonial.mutate(formData, {
        onSuccess: () => {
          toast({ title: "Testimonial added successfully!" });
          setIsTestimonialDialogOpen(false);
        },
        onError: () => toast({ title: "Failed to add testimonial" }),
      });
    }
  };

  const handleDeleteTestimonial = (id: string) => {
    deleteTestimonial.mutate(id, {
      onSuccess: () => toast({ title: "Testimonial deleted successfully!" }),
      onError: () => toast({ title: "Failed to delete testimonial" }),
    });
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
                {editingTestimonial ? "Edit Testimonial" : "Add New Testimonial"}
              </DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSaveTestimonial} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="student">Student Name</Label>
                <Input
                  id="student"
                  name="student"
                  defaultValue={editingTestimonial?.student}
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
                <Label htmlFor="testimonial">Testimonial</Label>
                <Textarea
                  id="testimonial"
                  name="testimonial"
                  defaultValue={editingTestimonial?.testimonial}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="image" className="flex items-center gap-2">
                  <Upload className="h-4 w-4 text-muted-foreground" />
                  Upload Image
                </Label>
                <Input id="image" name="image" type="file" accept="image/*" />
              </div>
              <Button
                type="submit"
                className="w-full"
                disabled={addTestimonial.isPending || updateTestimonial.isPending}
              >
                {addTestimonial.isPending || updateTestimonial.isPending
                  ? "Saving..."
                  : "Save Testimonial"}
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </CardHeader>

      <CardContent>
        {isLoading ? (
          <p className="text-muted-foreground text-center">Loading testimonials...</p>
        ) : error ? (
            <p className="text-red-500 text-center py-6">Failed to load testimonials</p>
          ) : testimonials.length === 0 ? (
            <p className="text-muted-foreground text-center py-6">
              No testimonials yet. Click “Add Testimonial” to create one.
            </p>
          ) : (
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
                        alt={testimonial.student}
                        className="w-12 h-12 rounded-full object-cover"
                      />
                    ) : (
                      <span className="text-muted-foreground text-sm">No image</span>
                    )}
                  </TableCell>
                  <TableCell className="font-medium">{testimonial.student}</TableCell>
                  <TableCell>{testimonial.exam}</TableCell>
                  <TableCell>{testimonial.score}</TableCell>
                  <TableCell className="max-w-xs truncate">{testimonial.testimonial}</TableCell>
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
                        onClick={() => handleDeleteTestimonial(testimonial.id)}
                        disabled={deleteTestimonial.isPending}
                      >
                        {deleteTestimonial.isPending ? (
                          <span className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full" />
                        ) : (
                          <Trash2 className="h-4 w-4" />
                        )}
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </CardContent>
    </Card>
  );
};

export default TestimonialsSection;
