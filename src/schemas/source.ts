import { z } from "zod";
import { KebabCaseRegex } from "./common";

export const SourceItemSchema = z.object({
  id: z.string().regex(KebabCaseRegex, "Source ID must be kebab-case (e.g. src-001)"),
  title: z.string().min(2, "Title is required"),
  publisher: z.string().min(2, "Publisher is required"),
  url: z.string().url("Must be a valid URL").optional().or(z.literal("")),
  type: z.enum(["book", "government-record", "academic", "website", "interview", "journal"]),
  tier: z.enum(["A", "B", "C", "D"]),
  accessed_on: z.string().optional(),
  licence_note: z.string().optional(),
});

export const MasterSourcesSchema = z.object({
  sources: z.array(SourceItemSchema),
});

export type SourceItem = z.infer<typeof SourceItemSchema>;
