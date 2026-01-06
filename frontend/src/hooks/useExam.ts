import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "@/lib/api";

// Fetch all exams
export function useExams() {
  return useQuery({
    queryKey: ["exams"],
    queryFn: async () => {
      const res = await api.get("/api/exams"); // plural
      return res.data.data; // actual array of exams
    },
  });
}

// Add exam
export function useAddExam() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (exam: {
      examType: string;
      mentorship: string;
      examRoomService: number;
      sum: number;
    }) => {
      const res = await api.post("/api/exams", exam);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["exams"] });
    },
  });
}

// Update exam
export function useUpdateExam() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (exam: {
      id: string;
      examType: string;
      mentorship: string;
      examRoomService: number;
      sum: number;
    }) => {
      const res = await api.patch(`/api/exams/${exam.id}`, exam);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["exams"] });
    },
  });
}

// Delete exam
export function useDeleteExam() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      const res = await api.delete(`/api/exams/${id}`); // ✅ plural
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["exams"] });
    },
  });
}
