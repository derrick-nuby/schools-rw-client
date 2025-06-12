import React, { useState } from 'react';
import Search from '../components/Search';
import SchoolListings from '../components/SchoolListings';
import { SearchSchoolsParams } from '../types/SearchSchoolsParams';

const SchoolsPage: React.FC = () => {
  const [criteria, setCriteria] = useState<SearchSchoolsParams>({
    query: '',
    district: [],
    school_status: [],
    school_type: [],
    combination_ids: [],
  });

  return (
    <div className="container mx-auto px-4">
      <Search onSearch={setCriteria} />
      <SchoolListings searchCriteria={criteria} />
    </div>
  );
};

export default SchoolsPage;
