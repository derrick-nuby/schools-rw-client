export interface SearchSchoolsParams {
  query?: string;
  district?: string[];
  school_status?: string[];
  school_type?: string[];
  combination_ids?: string[];
  limit?: number;
  page?: number;
}
