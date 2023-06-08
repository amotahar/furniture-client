import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/AuthProvider';
import Spinner from '../utils/Spinner';
import Category from './Category';






const Categories = () => {

    const [categories, setCategories] = useState([]);

    const { loading, setLoading } = useContext(AuthContext)



    useEffect(() => {
        axios.get(`http://localhost:5000/categories`)
            .then(res => {
                setCategories(res.data)
                setLoading(false)
            })
            .catch(error => console.error(error))
    }, [setLoading])

    if (loading) {
        return <Spinner></Spinner>
    }





    return (
        <div className='mb-20 lg:px-20'>
            <h1 className='text-4xl text-secondary font-bold text-center my-10'>Categories</h1>

            <div className='grid lg:grid-cols-4 gap-5'>
                {
                    categories.map(category => <Category
                        key={category.name}
                        category={category}
                    ></Category>)
                }



            </div>
        </div>
    );
};

export default Categories;