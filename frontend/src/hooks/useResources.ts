import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "@/lib/api";
import { Resource } from "@/types/admin";

// Fetch all resources
export function useResources() {
  return useQuery<Resource[], Error>({
    queryKey: ["resources"],
    queryFn: async () => {
      const res = await api.get("/resources");
      return res.data.data; // backend returns { success, data: [...] }
    },
  });
}

// Add resource
export function useAddResource() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (resourceData: Partial<Resource>) => {
      const res = await api.post("/resources", resourceData);
      return res.data.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["resources"] });
    },
  });
}

// Update resource
export function useUpdateResource() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, resourceData }: { id: string; resourceData: Partial<Resource> }) => {
      const res = await api.patch(`/resources/${id}`, resourceData);
      return res.data.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["resources"] });
    },
  });
}

// Delete resource
export function useDeleteResource() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      const res = await api.delete(`/resources/${id}`);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["resources"] });
    },
  });
}
