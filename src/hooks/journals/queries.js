import { useQuery } from "@tanstack/react-query";
import * as journalsAPI from "../../api/journalsAPI.js";

export function useJournals() {
  return useQuery({
    queryKey: ["journals"],
    queryFn: journalsAPI.getAllJournals,
  });
}

export function useJournal(id) {
  return useQuery({
    queryKey: ["journal", id],
    queryFn: () => journalsAPI.getJournalById(id),
    enabled: !!id,
  });
}

export function useJournalByStudent(studentId) {
  return useQuery({
    queryKey: ["journal", "by-student", studentId],
    queryFn: () => journalsAPI.getJournalByStudent(studentId),
    enabled: !!studentId,
  });
}