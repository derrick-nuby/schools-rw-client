import React from 'react';
import HeroSection from './HeroSection';
import SchoolListings from './SchoolListings';

const Home: React.FC = () => {
    return (
        <div>
            <HeroSection />
            <SchoolListings />
        </div>
    );
};

export default Home;
