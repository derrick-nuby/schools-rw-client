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
      <div className="bg-hero-img bg-cover bg-center bg-no-repeat flex justify-center">
        <div className="z-10 bg-white md:rounded-lg px-2 my-0 md:my-[2%] md:px-8 py-5 w-full md:w-[85%] pb-2 md:pb-20">
          <div className="text-center">
            <div className="text-3xl md:text-7xl text-accent-blue mt-3 md:mt-7">
              amashuri.rw
            </div>
            <p className="pt-2 md:pt-5 md:text-xl text-center mx-3 md:mx-9">
              The Ultimate Secondary School Finder in Rwanda – Effortlessly
              Search by Combination, District, Public or Private, and More.{' '}
              <br className="hidden md:block" /> Access Comprehensive School
              Details, Contact Information, Apply and Secure Your Child's Future
              Today!
            </p>
          </div>
          <Search onSearch={onSearch} />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
