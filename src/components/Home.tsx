import React, { useState } from 'react';
import HeroSection from './HeroSection';
import SchoolListings from './SchoolListings';
import { SearchSchoolsParams } from '../types/SearchSchoolsParams';

const Home: React.FC = () => {
    const [searchCriteria, setSearchCriteria] = useState<SearchSchoolsParams>({
        query: '',
        district: [],
        school_status: [],
        school_type: [],
        combination_ids: []
    });

    const handleSearch = (criteria: SearchSchoolsParams) => {
        setSearchCriteria(criteria);
    };

    return (
        <div>
            <HeroSection searchCriteria={searchCriteria} onSearch={handleSearch} />
            <SchoolListings searchCriteria={searchCriteria} />
        </div>
    );
};

export default Home;
