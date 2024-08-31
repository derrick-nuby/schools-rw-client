// Define the types for the data structure returned by the API
interface Combination {
    _id: string;
    name: string;
    abbreviation: string;
    category_id: string;
    description: string;
}

interface School {
    _id: string;
    school_code: string;
    school_name: string;
    school_status: string;
    school_type: string;
    district_name: string;
    sector_name: string;
    cell_name: string;
    combination_ids: Combination[];
}

export interface SchoolsResponse {
    pagination: {
        totalSchools: number;
        currentPage: number;
        totalPages: number;
        resultsPerPage: number;
    };
    schools: School[];
}
