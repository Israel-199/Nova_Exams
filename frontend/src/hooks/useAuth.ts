import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { api } from "@/lib/api";

export function useSession() {
  return useQuery({
    queryKey: ["session"],
    queryFn: async () => {
      const res = await api.get("/auth/session");
      return res.data.user; // { id, email, isAdmin }
    },
    retry: false, // don't spam retries if not logged in
  });
}

export function useLogin() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: { email: string; password: string }) => {
      const res = await api.post("/auth/login", data);
      return res.data;
    },
    onSuccess: () => {
      // ✅ refresh session info after login
      queryClient.invalidateQueries({ queryKey: ["session"] });
    },
  });
}
