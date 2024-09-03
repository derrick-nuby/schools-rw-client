import React from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { ISchool } from '../types/School.ts';
import { ICombination } from '../types/Combination.ts';
import { fetchSchoolById } from '../api/fetchSchoolById';

interface SchoolResponse {
    message: string;
    school: ISchool;
}

const SchoolDetailsComponent: React.FC = () => {
    const { id } = useParams<{ id: string; }>();

    const {
        data,
        // error,
        isLoading,
        isError
    } = useQuery<SchoolResponse, Error>({
        queryKey: ['school', id],
        queryFn: () => fetchSchoolById(id as string),
        enabled: !!id,
        retry: 2,
    });

    if (isLoading) return <div>Loading...</div>;
    if (isError) return <div>Failed to fetch school details. Please try again later.</div>;
    if (!data || !data.school) return <div>No school data found.</div>;

    const { school } = data;

    return (
        <div className="school-details-container">
            <h1 className="school-name">{school.school_name}</h1>
            <div className="school-info">
                <p><strong>School Code:</strong> {school.school_code}</p>
                <p><strong>Status:</strong> {school.school_status}</p>
                <p><strong>Type:</strong> {school.school_type}</p>
                <p><strong>District:</strong> {school.district_name}</p>
                <p><strong>Sector:</strong> {school.sector_name}</p>
                <p><strong>Cell:</strong> {school.cell_name}</p>
                <div className="combinations">
                    <h2>Levels</h2>
                    {school.combination_ids.map((combination: ICombination) => (
                        <div className="combination" key={combination._id}>
                            <p><strong>Name:</strong> {combination.name}</p>
                            <p><strong>Abbreviation:</strong> {combination.abbreviation}</p>
                            <p><strong>Description:</strong> {combination.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default SchoolDetailsComponent;