import React, { useState, useEffect, useRef } from 'react';
import DropDownCheck from './DropDownCheck';
import { districts, schoolStatus, schoolType, combinations } from '../data/searchData';
import { useQuery } from '@tanstack/react-query';
import { searchSchools } from '../api/searchSchools';
import { schoolContainer, schoolTitle, identifierSpan, districtSpan, colors, itemSpan, button, navButton } from './styles';
import SyncLoader from 'react-spinners/SyncLoader';
import { Link } from 'react-router-dom';

const CLASSES = {
    button: 'px-7 py-3 rounded-lg font-poppins text-white bg-accent-blue hover:bg-[#1A4CA3] mb-14 md:mb-0 cursor-pointer',
};

const SearchPageComponent: React.FC = () => {
    const [searchQuery, setSearchQuery] = useState<string>('');
    const [selectedDistricts, setSelectedDistricts] = useState<string[]>([]);
    const [selectedSchoolstatus, setSelectedSchoolstatus] = useState<string[]>([]);
    const [selectedSchooltype, setSelectedSchooltype] = useState<string[]>([]);
    const [selectedCombinations, setSelectedCombinations] = useState<string[]>([]);
    const [page, setPage] = useState(1);
    const [isSearchTriggered, setIsSearchTriggered] = useState(false);
    const limit = 12;
    const sectionRef = useRef<HTMLDivElement>(null);

    const { data, isLoading, error, refetch } = useQuery({
        queryKey: ['searchResults', { searchQuery, selectedDistricts, selectedSchoolstatus, selectedSchooltype, selectedCombinations, page }],
        queryFn: () => searchSchools({ query: searchQuery, district: selectedDistricts, school_status: selectedSchoolstatus, school_type: selectedSchooltype, combination_ids: selectedCombinations, page, limit }),
        keepPreviousData: true,
        enabled: isSearchTriggered
    });

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        setPage(1); // Reset to the first page on new search
        setIsSearchTriggered(true); // Trigger search
    };

    const handlePageChange = (newPage: number) => {
        if (newPage > 0 && newPage <= (data?.pagination.totalPages || 1)) {
            setPage(newPage);
            refetch(); // Trigger a new query when the page changes
        }
    };

    useEffect(() => {
        // Scroll to the specific section when the search results change
        if (sectionRef.current) {
            sectionRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    }, [data, page]);

    return (
        <div>
            <div className="text-xl md:text-3xl text-accent-blue text-center mt-9">
                Please Input Your Details For Search
            </div>
            <form onSubmit={handleSubmit} className='flex flex-col gap-3 md:gap-0 md:flex-row justify-evenly mt-8'>
                <input
                    type="search"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="input-global"
                    placeholder='search school'
                />

                <DropDownCheck
                    items={districts}
                    selectedItems={selectedDistricts}
                    onSelectionChange={setSelectedDistricts}
                    placeholder="Select districts"
                />

                <DropDownCheck
                    items={schoolStatus}
                    selectedItems={selectedSchoolstatus}
                    onSelectionChange={setSelectedSchoolstatus}
                    placeholder="Select school status"
                />

                <DropDownCheck
                    items={schoolType}
                    selectedItems={selectedSchooltype}
                    onSelectionChange={setSelectedSchooltype}
                    placeholder="Select school type"
                />

                <DropDownCheck
                    items={combinations}
                    selectedItems={selectedCombinations}
                    onSelectionChange={setSelectedCombinations}
                    placeholder="Select Combination"
                />

                <input type="submit" value="Search" className={CLASSES.button} />
            </form>

            {isSearchTriggered && (
                <section ref={sectionRef} className='my-28 mx-1 md:mx-9'>
                    {isLoading ? (
                        <div className="flex justify-center items-center min-h-[80vh]">
                            <SyncLoader color="#059377" size={25} />
                        </div>
                    ) : error ? (
                        <div className="flex justify-center items-center min-h-[80vh] text-red-600">
                            {error instanceof Error ? error.message : 'An error occurred.'}
                        </div>
                    ) : (
                        <>
                            <div className='grid grid-rows-1 md:grid-cols-3 gap-9 justify-center'>
                                {data?.schools.map((school) => (
                                    <div className={`${schoolContainer}`} key={school._id}>
                                        <p className={schoolTitle}>
                                            <Link to={`/school/${school._id}`}>{school.school_name}</Link>
                                        </p>
                                        <p>
                                            <span className={`${identifierSpan}`}>District:</span>
                                            <span className={`${districtSpan}`}>
                                                {school.district_name}
                                            </span>
                                        </p>
                                        <p>
                                            <span className={`${identifierSpan}`}>Levels:</span>
                                            <span>
                                                {school.combination_ids.map((combination, index: number) => (
                                                    <span
                                                        className={`${itemSpan}`}
                                                        style={{ backgroundColor: colors[index % colors.length] }}
                                                        key={combination._id}>
                                                        {combination.abbreviation}
                                                    </span>
                                                ))}
                                            </span>
                                        </p>
                                        <div className={`flex flex-col items-center`} >
                                            <Link to={`/school/${school._id}`}>
                                                <button className={button}>
                                                    Full Details
                                                </button>
                                            </Link>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <div className='flex justify-center mt-8'>
                                <button
                                    onClick={() => handlePageChange(page - 1)}
                                    disabled={page === 1}
                                    className={navButton}
                                >
                                    Previous
                                </button>
                                <span className="mx-4 pt-2">
                                    Page {data?.pagination.currentPage} of {data?.pagination.totalPages}
                                </span>
                                <button
                                    onClick={() => handlePageChange(page + 1)}
                                    disabled={page === data?.pagination.totalPages}
                                    className={navButton}
                                >
                                    Next
                                </button>
                            </div>
                        </>
                    )}
                </section>
            )}
        </div>
    );
};

export default SearchPageComponent;
