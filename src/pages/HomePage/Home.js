import React from 'react';

import Slider from './Hero-Slider';

import CategoriesInfo from './Category/CategoriesInfo';
import Advertisement from './Advertisement/Advertisement';
import Extrasection from './Extrasection';
import WhyUs from './WhyUs';
import HeroBanner from './HeroBanner';
import useTitle from '../../hooks/useTitle';





const Home = () => {
    useTitle("Home");
    return (
        <div className='lg:max-w-screen-xl mx-auto '>
            <Slider></Slider>
            <CategoriesInfo></CategoriesInfo>
            <Advertisement></Advertisement>
            <Extrasection></Extrasection>
            <HeroBanner></HeroBanner>
            <WhyUs></WhyUs>




        </div>
    );
};

export default Home;