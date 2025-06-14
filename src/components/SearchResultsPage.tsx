import React, { useEffect, useState, useRef } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Link, useSearchParams } from 'react-router-dom';
import SyncLoader from 'react-spinners/SyncLoader';
import { searchSchools } from '../api/searchSchools';
import {
  schoolContainer,
  schoolTitle,
  identifierSpan,
  districtSpan,
  colors,
  itemSpan,
  button,
  navButton,
  statusSpan,
} from './styles';
import { ISchool } from '../types/School';
import { ICombination } from '../types/Combination';

const SearchResultsPage: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const sectionRef = useRef<HTMLDivElement>(null);
  const [searchParams] = useSearchParams();

  const query = searchParams.get('query') || undefined;
  const limit = searchParams.get('limit')
    ? Number(searchParams.get('limit'))
    : undefined;
  const district = searchParams.getAll('district');
  const school_status = searchParams.getAll('school_status');
  const school_type = searchParams.getAll('school_type');
  const combination_ids = searchParams.getAll('combination_ids');

  const { data, error, isError, isLoading } = useQuery({
    queryKey: [
      'searchSchools',
      currentPage,
      query,
      district,
      school_status,
      school_type,
      combination_ids,
      limit,
    ],
    queryFn: () =>
      searchSchools({
        query,
        page: currentPage,
        limit,
        district,
        school_status,
        school_type,
        combination_ids,
      }),
    retry: 3,
  });

  useEffect(() => {
    if (sectionRef.current) {
      sectionRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [currentPage]);

  // useEffect(() => {
  //     setCurrentPage(1);
  // }, []);

  const handlePageChange = (newPage: number) => {
    if (newPage > 0 && newPage <= data?.pagination?.totalPages) {
      setCurrentPage(newPage);
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[80vh]">
        <SyncLoader color="#059377" size={25} />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex justify-center items-center min-h-[80vh] text-red-600">
        {error instanceof Error ? error.message : 'An error occurred.'}
      </div>
    );
  }

  const schools = data?.schools || [];

  return (
    <section ref={sectionRef} className="my-28 mx-4 md:mx-9">
      <div className="grid grid-rows-1 md:grid-cols-3 gap-9 justify-center">
        {schools.map((school: ISchool) => (
          <div className={`${schoolContainer}`} key={school._id}>
            <p className={schoolTitle}>
              <Link to={`/school/${school._id}`}>{school.school_name}</Link>
            </p>
            <p>
              <span className={`${identifierSpan}`}>District:</span>
              <span className={`${districtSpan}`}>{school.district_name}</span>
            </p>
            <p>
              <span className={`${identifierSpan}`}>Combinations:</span>
              <span className="break-all">
                {school.combination_ids.map((combination: ICombination, index: number) => (
                  <span
                    className={`${itemSpan}`}
                    style={{ backgroundColor: colors[index % colors.length] }}
                    key={combination._id}
                  >
                    {combination.abbreviation}
                  </span>
                ))}
              </span>
            </p>
            <p>
              <span className={`${identifierSpan}`}>Status:</span>
              <span className={`${statusSpan}`}>{school.school_status}</span>
            </p>
            <p>
              <span className={`${identifierSpan}`}>Type:</span>
              <span className={`${districtSpan}`}>{school.school_type}</span>
            </p>
            <div className={`flex flex-col items-center`}>
              <Link to={`/school/${school._id}`}>
                <button className={button}>Full Details</button>
              </Link>
            </div>
          </div>
        ))}
      </div>
      <div className="flex justify-center mt-8">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className={navButton}
        >
          Previous
        </button>
        <span className="mx-4 pt-2">
          Page {currentPage} of {data?.pagination?.totalPages}
        </span>
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === data?.pagination?.totalPages}
          className={navButton}
        >
          Next
        </button>
      </div>
    </section>
  );
};

export default SearchResultsPage;
