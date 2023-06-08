import React from 'react';
import { Player } from '@lottiefiles/react-lottie-player';
import { Link } from 'react-router-dom';


const ExtraSection = () => {
    return (
        <div className='bg-primary py-1 mx-2'>
            <div className='lg:px-20 grid lg:grid-cols-2 gap-y-1 lg:gap-y-5 justify-items-center'>
                <div className='max-w-xs lg:max-w-lg lg:my-16 my-10 px-4 md:px-0'>
                    <Player
                        src='https://assets6.lottiefiles.com/private_files/lf30_phcng6qv.json'
                        className="player"
                        loop
                        autoplay
                        // style={{ height: '20em', width: '20em' }}
                    />
                </div>
                <div className='flex flex-col justify-center items-center max-w-xs lg:max-w-lg  lg:my-14'>
                    <h1 className='text-white text-xl lg:text-4xl font-bold '>Now this time to be<br /> <span className='text-white '> Buyer or Seller</span>...!!</h1>
                    
                    <div className='py-8'>
                        <h3 className=' lg:ml-20 text-white  font-semibold text-xl lg:text-3xl'>Sell What You Have,</h3>
                        <h3 className='lg:ml-20 text-white  font-semibold text-xl lg:text-3xl'>Buy What You Need!</h3>
                        <h3 className='lg:ml-10  font-black text-xl lg:text-4xl text-white '>We Care Your Money.</h3>
                        <div className='mx-auto'>
                            <button className='btn btn-outline btn-secondary w-full font-bold mt-5'> <Link to="/allproducts">SHOW All Products</Link></button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ExtraSection;

//! https://lottiefiles.com/
// https://lottiefiles.com/search?q=furniture&category=animations