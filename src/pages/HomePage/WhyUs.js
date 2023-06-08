import React from 'react';
import { FaCartPlus, FaCertificate, FaDollarSign } from 'react-icons/fa';

const WhyUs = () => {
    return (
        <div className='py-5 mx-2 '>
            <h2 className='text-4xl text-center text-secondary font-bold my-5'>Our Services..!</h2>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 justify-items-center '>
                <div>
                    <div className="card w-96 bg-base-100 shadow-xl text-secondary max-w-xs md:max-w-sm">
                        <div className="card-body">
                            <div className="card-actions justify-center">
                                <FaCartPlus className='text-4xl'></FaCartPlus>
                            </div>
                            <p className='text-2xl font-bold text-center'>Easy To Pick</p>
                            <p className='text-center'>You can Easily choose from our Seller's.</p>
                        </div>
                    </div>
                </div>
                <div>
                    <div className="card w-96 bg-base-100 shadow-xl text-secondary max-w-xs md:max-w-sm">
                        <div className="card-body">
                            <div className="card-actions justify-center">
                                <FaCertificate className='text-4xl' />
                            </div>
                            <p className='text-2xl font-bold text-center'>Verified Seller</p>
                            <p className='text-center'>We provide 100% Verified Seller.</p>
                        </div>
                    </div>
                </div>
                <div>
                    <div className="card w-96 bg-base-100 shadow-xl text-secondary max-w-xs md:max-w-sm">
                        <div className="card-body">
                            <div className="card-actions justify-center">
                                <FaDollarSign className='text-4xl' />
                            </div>
                            <p className='text-2xl font-bold text-center'>Easy To Purchase</p>
                            <p className='text-center'>You can Pay Online or Offline.</p>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default WhyUs;