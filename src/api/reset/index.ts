import { useMutation } from "@tanstack/react-query";
import { API } from "@/api/api";

export const useReset = () =>
  useMutation({
    mutationFn: () => API.post("api/mocks/v1/reset"),
  });
