import React from 'react';
import { useLoaderData, useNavigation } from 'react-router-dom';
import Spinner from '../../../utils/Spinner';
import Product from './Product';
import useTitle from '../../../hooks/useTitle';



const Category = () => {
    const items = useLoaderData()
    const navigation = useNavigation()

    const { category_id, name } = items;
    useTitle('Category')




    if (navigation.state === 'loading') {
        return <Spinner></Spinner>
    }

    return (
        <div className='lg:px-20 py-10'>{items.category_id}
            <h1 className='text-2xl font-semibold text-secondary text-center'>You are showing the  {category_id} <span className='font-bold'>{name}</span> category.</h1>
            <div className='gap-10 grid grid-cols-1  md:grid-cols-2 lg:grid-cols-3 my-12'>
                {
                    items.map(item => <Product
                        key={item._id}
                        item={item}
                    ></Product>)
                }
            </div>


            {items.length}

        </div>
    );
};

export default Category;