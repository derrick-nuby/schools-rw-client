import React from 'react';
import Search from './Search';
import { SearchSchoolsParams } from '../types/SearchSchoolsParams';

interface HeroSectionProps {
    searchCriteria: SearchSchoolsParams;
    onSearch: (criteria: SearchSchoolsParams) => void;
}

const HeroSection: React.FC<HeroSectionProps> = ({ onSearch }) => {
    return (
        <section>
            <div className="h-[100vh] bg-hero-img bg-cover bg-center bg-no-repeat flex justify-center">
                <div className="absolute inset-0 bg-black/70"></div>
                <div className="h-[110vh] md:h-[80%] z-10 bg-white md:rounded-lg px-2 md:px-8 py-5 md:mt-[5%]">
                    <div className='text-center'>
                        <div className="text-3xl md:text-7xl text-accent-blue mt-3 md:mt-7">
                            amashuri.rw
                        </div>
                        <p className='pt-2 md:pt-5 md:text-xl text-center'>
                            The Ultimate Secondary School Finder in Rwanda – Effortlessly Search by Combination, District, Public or Private, and More. <br className="hidden md:block" /> Access Comprehensive School Details, Contact Information, Apply and Secure Your Child's Future Today!
                        </p>
                    </div>
                    <Search onSearch={onSearch} />
                </div>
            </div>
        </section>
    );
};

export default HeroSection;
