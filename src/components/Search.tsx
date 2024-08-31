import React, { useState } from 'react';
import DropDownCheck from './DropDownCheck';
import { districts, schoolStatus, schoolType, combinations } from '../data/searchData';
import { useMutation } from '@tanstack/react-query';
import { searchSchools } from '../api/searchSchools';

const CLASSES = {
    button: 'px-7 py-3 rounded-lg font-poppins text-white bg-accent-blue hover:bg-[#1A4CA3] mb-14 md:mb-0',
};

const Search: React.FC = () => {
    const [searchQuery, setSearchQuery] = useState<string>('');
    const [selectedDistricts, setSelectedDistricts] = useState<string[]>([]);
    const [selectedSchoolstatus, setSelectedSchoolstatus] = useState<string[]>([]);
    const [selectedSchooltype, setSelectedSchooltype] = useState<string[]>([]);
    const [selectedCombinations, setSelectedCombinations] = useState<string[]>([]);



    const mutation = useMutation({
        mutationFn: () => searchSchools({ query: searchQuery, district: selectedDistricts, school_status: selectedSchoolstatus, school_type: selectedSchooltype, combination_ids: selectedCombinations }),
        onSuccess: (data) => {
            console.log('Search Results:', data);
        },
        onError: (error) => {
            console.error('Search Error:', error);
        }
    });


    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        console.log({
            search: searchQuery,
            districts: selectedDistricts,
            schoolStatus: selectedSchoolstatus,
            schoolType: selectedSchooltype,
            combinations: selectedCombinations
        });
        mutation.mutate();
    };

    return (
        <div>
            <div className="text-xl md:text-3xl text-accent-blue text-center mt-9">
                Search
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
        </div>
    );
};

export default Search;
