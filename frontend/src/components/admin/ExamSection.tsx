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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Plus, Pencil, Trash2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Exam } from "@/types/admin";

interface ExamsSectionProps {
  exams: Exam[];
  setExams: React.Dispatch<React.SetStateAction<Exam[]>>;
}

const ExamsSection = ({ exams, setExams }: ExamsSectionProps) => {
  const [examDialogOpen, setExamDialogOpen] = useState(false);
  const [editingExam, setEditingExam] = useState<Exam | null>(null);
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

  const { toast } = useToast();

  const handleAddExam = () => {
    if (!examForm.examType || !examForm.mentorship) {
      toast({ title: "Please fill all fields", variant: "destructive" });
      return;
    }
    const newExam = {
      examType: examForm.examType,
      mentorship: examForm.mentorship,
      examRoomService: Number(examForm.examRoomService) || 0,
      sum: Number(examForm.sum) || 0,
    };

    if (editingExam) {
      setExams(exams.map((e) => (e.id === editingExam.id ? { ...e, ...newExam } : e)));
      toast({ title: "Exam updated successfully" });
    } else {
      setExams([...exams, { id: Date.now().toString(), ...newExam }]);
      toast({ title: "Exam added successfully" });
    }

    setExamForm({ examType: "Duolingo", mentorship: "", examRoomService: "", sum: "" });
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
    toast({ title: "Exam deleted" });
  };

  return (
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
  );
};

export default ExamsSection;