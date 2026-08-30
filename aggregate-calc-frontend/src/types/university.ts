// Replaces src/types/university.ts — brought in line with the actual
// `universities` table. Confirm the `ownership` string values match what's
// really stored (assumed "Federal" | "State" | "Private" below).

export type ScreeningType = "POST_UTME" | "NONE" | "NO_OLEVEL_POINTS";
export type Ownership = "Federal" | "State" | "Private";

export interface University {
  id: number;
  name: string;
  short_name: string;
  state: string;
  logo_url: string | null;
  screening_type: ScreeningType;
  ownership: Ownership;
  website: string | null;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}