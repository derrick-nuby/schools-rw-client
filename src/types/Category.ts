export interface IApplicableGrade {
  grade: string;
  description: string;
}

export interface ICategory {
  _id: string;
  name: string;
  description: string;
  applicable_grades: IApplicableGrade[];
}
