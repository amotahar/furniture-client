import React, { useState } from 'react';
import { useLoaderData, useNavigation } from 'react-router-dom';
import Spinner from '../../utils/Spinner';
import AllProductsCard from './AllProductsCard';
import useTitle from '../../hooks/useTitle';
import BookingModal from '../../components/BookingModal';

const AllProducts = () => {

    const products = useLoaderData()
    const navigation = useNavigation()

    const { _id } = products;
    const [item, setItem] = useState(null);
    useTitle("All Products");




    if (navigation.state === 'loading') {
        return <Spinner></Spinner>
    }

    return (
        <div className='lg:px-20 py-10'>{ }
            <h1 className='text-2xl font-semibold text-secondary text-center'>Choose Your Products With <span className='font-bold text-yellow-600' >Wood Sell</span> !!</h1>
            <div className='gap-10 grid grid-cols-1  md:grid-cols-2 lg:grid-cols-3 justify-items-center my-12'>
                {
                    products.map(product => <AllProductsCard
                        key={product._id}
                        product={product}
                        setItem={setItem}
                    ></AllProductsCard>)
                }
            </div>


            {item &&
                <BookingModal
                    item={item}
                    setItem={setItem}
                ></BookingModal>}

        </div>
    );
};

export default AllProducts;