import React from 'react';
import { Link } from 'react-router-dom';

import banner from './../../assets/banner.jpeg'

const HeroBanner = () => {
    return (
        <div className="hero mt-8 lg:mt-12 ">
            <div className="hero-content flex-col md:flex-row-reverse">
                <img src={banner} className="md:w-1/2  rounded-lg shadow-2xl" alt='' />
                <div className='md:w-1/3'>
                    <h1 className="lg:text-4xl text-2xl mt-3 md:mt-0 font-bold ">Wood Sell Furniture ...!</h1>
                    <p className="py-3 lg:py-6 text-justify">Search For Second Hand Furniture Near Me at Wood Sell Furniture ,, Find Second Hand Furniture Near Me. Now with us! Latest Today. Fast Response. More Relevant.</p>
                    <Link to='/faq'><button className='btn btn-outline btn-secondary w-full font-bold mt-5 mx-auto'>Read More</button></Link>
                </div>
            </div>
        </div>
    );
};

export default HeroBanner;