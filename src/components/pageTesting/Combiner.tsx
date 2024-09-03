import React, { useState } from 'react';
import Search from './Search';
import SchoolListings from './SchoolListings';
import { SearchSchoolsParams } from '../../types/SearchSchoolsParams';

const Combiner: React.FC = () => {
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
            <Search onSearch={handleSearch} />
            <SchoolListings searchCriteria={searchCriteria} />
        </div>
    );
};

export default Combiner;