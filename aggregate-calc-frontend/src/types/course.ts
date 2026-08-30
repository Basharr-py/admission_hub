// Matches the actual response from GET /universities/{university_id}/courses
export interface Course {
  id: number;
  name: string;
  min_jscore: number;
  current_cutoff: number;
  university_id: number;
  course_catalog_id: number;
}