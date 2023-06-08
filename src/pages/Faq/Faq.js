import React from 'react';
import useTitle from '../../hooks/useTitle';
import { Link } from 'react-router-dom';

const Faq = () => {
    useTitle('Faq');
    return (
        <div>
            <div className="hero h-[450px] lg:h-[550px]  bg-base-200 ">
                <div className="hero-content  text-center">
                    <div className="max-w-md">
                        <h1 className="text-5xl font-bold text-yellow-500">Hello Dear ! </h1>
                        <p className="py-6 text-xl font-black text-bold" >
                            It will be available in very soon.
                        </p>
                        <Link to='/'>  <button className="btn btn-outline">Back to Home</button></Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Faq;