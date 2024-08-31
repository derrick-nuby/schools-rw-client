import { ICombination } from "./combination";
export interface ISchool {
    _id: string; // Use string for ObjectId
    school_code: string;
    school_name: string;
    school_status: string;
    school_type: string;
    district_name: string;
    sector_name: string;
    cell_name: string;
    combination_ids: ICombination[];
}