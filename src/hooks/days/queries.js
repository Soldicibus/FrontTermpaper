import { useQuery } from "@tanstack/react-query";
import * as daysAPI from "../../api/daysAPI.js";

export function useDays() {
  return useQuery({
    queryKey: ["days"],
    queryFn: daysAPI.getAllDays,
  });
}

export function useDay(id) {
  return useQuery({
    queryKey: ["day", id],
    queryFn: () => daysAPI.getDayById(id),
    enabled: !!id,
  });
}