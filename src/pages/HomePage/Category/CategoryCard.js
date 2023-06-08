import React from 'react';
import { Link } from 'react-router-dom';

const CategoryCard = ({ category }) => {
    const { _id, image, name } = category;


    
    return (
        <div>
            <Link to={`/category/${category.id}`}> 
                <div className={`card hover:bg-accent bg-base-100 shadow-xl text-secondary mx-4`}>
                    <div className="card-body">
                        <div className="card-actions justify-center">
                            <img src={image} alt="" className='w-1/3' />
                        </div>
                        <p className='text-2xl font-bold text-center'>{name}</p>
                    </div>
                </div></Link>
        </div>
    );
};

export default CategoryCard;

//id and _id is the factor.