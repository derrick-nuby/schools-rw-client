import React from 'react';
import Search from './Search';

const Home: React.FC = () => {
    return (
        <section>
            <div className="heroSection bg-hero-img bg-cover bg-center bg-no-repeat h-screen flex justify-center">
                <div className="absolute inset-0 bg-black/70"></div>
                <div className="relative mb-16 z-10 bg-white rounded-lg px-8 py-5 mt-[5%]">
                    <div className='text-center'>
                        <div className="text-3xl md:text-7xl text-accent-blue mt-7">
                            Schools.rw
                        </div>
                        <p className='pt-2 md:pt-5 md:text-xl text-center'>The Ultimate Secondary School Finder in Rwanda – Effortlessly Search by Combination, District, Public or Private, and More. <br className="hidden md:block" /> Access Comprehensive School Details, Contact Information, Apply and Secure Your Child's Future Today!</p>
                    </div>
                    <div>
                        <div className="text-xl md:text-3xl text-accent-blue text-center mt-9">
                            Search
                        </div>
                        <div className="search">
                            <Search />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Home;
