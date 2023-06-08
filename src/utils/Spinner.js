import React from 'react';
import { BounceLoader } from 'react-spinners';

const Spinner = () => {
    return (
        <div className='flex justify-center h-full'>
            <BounceLoader color="#0C7EB0"></BounceLoader>
        </div>
    );
};

export default Spinner;