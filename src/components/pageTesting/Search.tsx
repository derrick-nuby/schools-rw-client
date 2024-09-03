import React, { useState } from 'react';
import DropDownCheck from '../DropDownCheck';
import { districts, schoolStatus, schoolType, combinations } from '../../data/searchData';
import { SearchSchoolsParams } from '../../types/SearchSchoolsParams';

interface SearchProps {
    onSearch: (criteria: SearchSchoolsParams) => void;
}

const CLASSES = {
    button: 'px-7 py-3 rounded-lg font-poppins text-white bg-accent-blue hover:bg-[#1A4CA3] mb-14 md:mb-0 cursor-pointer',
};

const Search: React.FC<SearchProps> = ({ onSearch }) => {
    const [searchQuery, setSearchQuery] = useState<string>('');
    const [selectedDistricts, setSelectedDistricts] = useState<string[]>([]);
    const [selectedSchoolstatus, setSelectedSchoolstatus] = useState<string[]>([]);
    const [selectedSchooltype, setSelectedSchooltype] = useState<string[]>([]);
    const [selectedCombinations, setSelectedCombinations] = useState<string[]>([]);

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        onSearch({
            query: searchQuery,
            district: selectedDistricts,
            school_status: selectedSchoolstatus,
            school_type: selectedSchooltype,
            combination_ids: selectedCombinations,
            page: 1,
        });
    };

    return (
        <div>
            <div className="text-xl md:text-3xl text-accent-blue text-center mt-9">
                Search
            </div>
            <form onSubmit={handleSubmit} className='flex flex-col gap-3 md:gap-0 md:flex-row justify-evenly mt-8 mx-2'>
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
