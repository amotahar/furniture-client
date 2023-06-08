import React, { useContext, useEffect, useState } from 'react';
import CategoryCard from './CategoryCard';
import { AuthContext } from '../../../context/AuthProvider';
import Spinner from '../../../utils/Spinner';
import axios from 'axios';

const CategoriesInfo = () => {
    const [categories, setCategories] = useState([])
    const { loading, setLoading } = useContext(AuthContext)
    useEffect(() => {
        axios.get(`http://localhost:5000/categories`)
            .then(res => {
                setCategories(res.data)
                
            })
            .catch(error => console.error(error))
    }, [setLoading])

    if (loading) {
        return <Spinner></Spinner>
    }


    return (
        <div>
            <h1 className='text-4xl text-center text-secondary font-bold my-5'>Categories</h1>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5'>
                {
                    categories.map((category) => <CategoryCard
                        key={category.id}
                        category={category}
                    ></CategoryCard>)
                }
            </div>



        </div>
    );
};

export default CategoriesInfo;