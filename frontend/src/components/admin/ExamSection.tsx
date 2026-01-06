import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Plus, Pencil, Trash2, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Exam } from "@/types/admin";
import { useAddExam, useUpdateExam, useDeleteExam, useExams } from "@/hooks/useExam";

const ExamsSection = () => {
  const [isExamDialogOpen, setIsExamDialogOpen] = useState(false);
  const [editingExam, setEditingExam] = useState<Exam | null>(null);

  const { toast } = useToast();

  // ✅ fetch exams directly from backend
  const { data: exams = [], isLoading, error } = useExams();

  const addExam = useAddExam();
  const updateExam = useUpdateExam();
  const deleteExam = useDeleteExam();

  const handleSaveExam = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    const payload = {
      examType: formData.get("examType") as Exam["examType"],
      mentorship: formData.get("mentorship") as string,
      examRoomService: Number(formData.get("examRoomService")) || 0,
      sum: Number(formData.get("sum")) || 0,
    };

    try {
      if (editingExam) {
        await updateExam.mutateAsync({ id: editingExam.id, ...payload });
        toast({ title: "Exam updated successfully" });
      } else {
        await addExam.mutateAsync(payload);
        toast({ title: "Exam added successfully" });
      }
      setEditingExam(null);
      setIsExamDialogOpen(false);
    } catch {
      toast({ title: "Error saving exam", variant: "destructive" });
    }
  };

  const handleDeleteExam = async (id: string) => {
    try {
      await deleteExam.mutateAsync(id);
      toast({ title: "Exam deleted" });
    } catch {
      toast({ title: "Error deleting exam", variant: "destructive" });
    }
  };

  return (
    <Card className="bg-white">
      <CardContent className="p-6">
        {/* Header with Add button */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold text-neutral-dark">Manage Exam Prices</h2>
          <Dialog open={isExamDialogOpen} onOpenChange={setIsExamDialogOpen}>
            <DialogTrigger asChild>
              <Button onClick={() => setEditingExam(null)} className="gap-2">
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
                  <Label htmlFor="examType">Exam Type</Label>
                  <Input
                    id="examType"
                    name="examType"
                    defaultValue={editingExam?.examType}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="mentorship">Mentorship</Label>
                  <Input
                    id="mentorship"
                    name="mentorship"
                    defaultValue={editingExam?.mentorship}
                    required
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="examRoomService">Exam Room Service (ETB)</Label>
                    <Input
                      id="examRoomService"
                      name="examRoomService"
                      type="number"
                      defaultValue={editingExam?.examRoomService}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="sum">Sum (ETB)</Label>
                    <Input
                      id="sum"
                      name="sum"
                      type="number"
                      defaultValue={editingExam?.sum}
                      required
                    />
                  </div>
                </div>
                <Button
                  type="submit"
                  className="w-full"
                  disabled={addExam.isPending || updateExam.isPending}
                >
                  {(addExam.isPending || updateExam.isPending) ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    "Save Exam"
                  )}
                </Button>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          {isLoading ? (
            <p className="text-center py-6">Loading exams...</p>
          ) : error ? (
            <p className="text-red-500 text-center py-6">Failed to load exams</p>
          ) : exams.length === 0 ? (
            <p className="text-muted-foreground text-center py-6">
              No exams yet. Click “Add Exam” to create one.
            </p>
          ) : (
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-4">Exam Type</th>
                  <th className="text-left py-3 px-4">Mentorship</th>
                  <th className="text-left py-3 px-4">Exam Room Service</th>
                  <th className="text-left py-3 px-4">Sum</th>
                  <th className="text-right py-3 px-4">Actions</th>
                </tr>
              </thead>
              <tbody>
                {exams.map((exam) => (
                  <tr key={exam.id} className="border-b hover:bg-muted/5">
                    <td className="py-4 px-4">{exam.examType}</td>
                    <td className="py-4 px-4">{exam.mentorship}</td>
                    <td className="py-4 px-4">{exam.examRoomService} ETB</td>
                    <td className="py-4 px-4">{exam.sum} ETB</td>
                    <td className="py-4 px-4 text-right">
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => {
                          setEditingExam(exam);
                          setIsExamDialogOpen(true);
                        }}
                        className="h-8 w-8 mr-2"
                      >
                        <Pencil className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="destructive"
                        size="icon"
                        onClick={() => handleDeleteExam(exam.id)}
                        className="h-8 w-8"
                        disabled={deleteExam.isPending}
                      >
                        {deleteExam.isPending ? (
                          <Loader2 className="h-4 w-4 animate-spin" />
                        ) : (
                          <Trash2 className="w-4 h-4" />
                        )}
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default ExamsSection;
