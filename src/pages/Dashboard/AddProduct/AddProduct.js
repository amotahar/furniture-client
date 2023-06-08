import { useQuery } from '@tanstack/react-query';
import React, { useContext } from 'react';
import { useForm } from 'react-hook-form';
import Spinner from '../../../utils/Spinner';

import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { AuthContext } from '../../../context/AuthProvider';
import useTitle from '../../../hooks/useTitle';




//*=====================================\\
//!Condition of product array.
const conditions = [
    {
        id: 1,
        name: 'Good'
    },
    {
        id: 2,
        name: 'Excellent'
    },
    {
        id: 3,
        name: 'Fair'
    },
    {
        id: 4,
        name: 'Average'
    },
    {
        id: 5,
        name: 'Below Average'
    },
    {
        id: 6,
        name: 'Poor Quality'
    },
]
//*=====================================\\







/*
//*=====================================\\
//!verified of product array.(boolean value)
const verified = [
    {
        id: 1,
        "value": "true",
    },
    {
        id: 2,
        "value": "false",
    }
]
//*=====================================\\
*/

















//*=====================================\\
//!M.component
const AddProduct = () => {
    useTitle('AddProduct'); //*Title hook
    const { register, handleSubmit, formState: { errors } } = useForm();


    const { user } = useContext(AuthContext) //! email quary

    //!imgbb_key
    const imageHostKey = process.env.REACT_APP_imgbb_key;





    //!navigate to manage products page when post is successful.
    const navigate = useNavigate();



    //*=====================================\\
    // !react quary -category name project.
    const { data: categoryNames, isLoading } = useQuery({
        queryKey: ['categoryName'],
        queryFn: async () => {
            const res = await fetch('http://localhost:5000/categoryName');
            const data = await res.json();
            return data;
        }
    })







    //*=====================================\\
    //!Handle Submit onclick event function.
    //!Upload image to image hosting server imgbb and get image url-VVI***
    const handleAddDoctor = data => {
       

        const image = data.image[0];
        const formData = new FormData();
        formData.append('image', image);
        const url = `https://api.imgbb.com/1/upload?key=${imageHostKey}`
        fetch(url, {
            method: 'POST',
            body: formData
        })
            .then(res => res.json())
            .then(imgData => {
                if (imgData.success) {
                    console.log(imgData.data.url)
                    const product = {
                        name: data.productName,
                        image: imgData.data.url,
                        category: data.categoryName,
                        location: data.location,
                        condition: data.condition,
                        resalePrice: data.resellPrice,
                        originalPrice: data.originalPrice,
                        usedYear: data.usedYear,
                        sellerName: data.sellerName,
                        verified: JSON.parse(data.verification), //**** convert string to boolean value */
                        postedTime: data.postingDate,
                        email: user?.email ,
                    }


                    //! save product information to the database
                    fetch('http://localhost:5000/products', {
                        method: 'POST',
                        headers: {
                            'content-type': 'application/json',
                            authorization: `bearer ${localStorage.getItem('accessToken')}`
                        },
                        body: JSON.stringify(product)
                    })
                        .then(res => res.json())
                        .then(result => {
                            console.log(result);
                            toast.success(`${data.productName} is added successfully`);
                            navigate('/dashboard/mysellpost')
                        })
                }
            })
    }
//*************************************************************\\
// ! Getting image url from imagebb hosting server
//*************************************************************\\








    //*=====================================\\
    //!Current Date Variable(Today Date)
    let today = new Date();
    let date = today.getDate() + "-" + parseInt(today.getMonth() + 1) + "-" + today.getFullYear();
    // console.log(date)






    //*=====================================\\
    //!react quary data loading spinner.
    if (isLoading) {
        return <Spinner></Spinner>
    }







    return (
        <div>
            <div className='w-full px-4'>
                <h3 className="text-base md:text-3xl mb-5 text-center font-bold mt-2 text-primary ">Add Product </h3>
                <form onSubmit={handleSubmit(handleAddDoctor)}>




                    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3'>


                        {/* //!Product Name */}
                        <div className="form-control w-full max-w-xs mx-auto">
                            <label className="label"> <span className="label-text font-bold">Product Name</span></label>
                            <input type="text" {...register("productName", {
                                required: "Product Name is Required"
                            })} className="input input-bordered w-full max-w-xs input-sm input-primary" />
                            {errors.productName && <p className='text-red-500 text-sm'>{errors.productName.message}</p>}
                        </div>



                        {/* //!Location */}
                        <div className="form-control w-full max-w-xs mx-auto">
                            <label className="label"> <span className="label-text font-bold">Location</span></label>
                            <input type="text" {...register("location", {
                                required: "Location is Required"
                            })} className="input input-bordered w-full max-w-xs input-sm input-primary" />
                            {errors.location && <p className='text-red-500 text-sm'>{errors.location.message}</p>}
                        </div>




                        <div className="form-control w-full max-w-xs mx-auto">
                            <label className="label"> <span className="label-text font-bold">Resell Price</span></label>
                            <input type="number" {...register("resellPrice", {
                                required: "Resell Price is Required"
                            })} className="input input-bordered w-full max-w-xs input-sm input-primary" />
                            {errors.resellPrice && <p className='text-red-500 text-sm'>{errors.resellPrice.message}</p>}
                        </div>




                        <div className="form-control w-full max-w-xs mx-auto">
                            <label className="label"> <span className="label-text font-bold">Original Price</span></label>
                            <input type="number" {...register("originalPrice", {
                                required: "Original Price is Required"
                            })} className="input input-bordered w-full max-w-xs input-sm input-primary" />
                            {errors.originalPrice && <p className='text-red-500 text-sm'>{errors.originalPrice.message}</p>}
                        </div>




                        <div className="form-control w-full max-w-xs mx-auto">
                            <label className="label"> <span className="label-text font-bold">Used Year</span></label>
                            <input type="number" {...register("usedYear", {
                                required: "Used Year is Required"
                            })} className="input input-bordered w-full max-w-xs input-sm input-primary" />
                            {errors.usedYear && <p className='text-red-500 text-sm'>{errors.usedYear.message}</p>}
                        </div>



                        {/* //!select condition. */}
                        <div className="form-control w-full max-w-xs mx-auto">
                            <label className="label"> <span className="label-text font-bold">Select Condition</span> </label>
                            <select   {...register('condition')} className="select select-sm select-primary w-full max-w-xs ">
                                {/* <option disabled selected>Dark mode or light mode?</option> */}
                                {
                                    conditions.map(condition => <option
                                        key={condition.id}
                                        value={condition.name}
                                    >{condition.name}</option>)
                                }

                            </select>
                        </div>



                        <div className="form-control w-full max-w-xs mx-auto">
                            <label className="label"> <span className="label-text font-bold">Seller Name</span></label>
                            <input type="text" {...register("sellerName", {
                                required: "Seller Name is Required"
                            })} className="input input-bordered w-full max-w-xs input-sm input-primary" />
                            {errors.sellerName && <p className='text-red-500 text-sm'>{errors.sellerName.message}</p>}
                        </div>


                        {/* {//!Product Posting Date} */}
                        <div className="form-control w-full max-w-xs mx-auto">
                            <label className="label"> <span className="label-text font-bold">Product Posting Date</span></label>
                            <input value={`${date}`} fix type="text" {...register("postingDate", {
                                required: "Filled Automatically"
                            })} className="input input-bordered w-full max-w-xs input-sm input-primary" />
                            {errors.postingDate && <p className='text-red-500 text-sm'>{errors.postingDate.message}</p>}
                        </div>





                        {/* //!select category. */}
                        <div className="form-control w-full max-w-xs mx-auto">
                            <label className="label"> <span className="label-text font-bold">Select Category</span> </label>
                            <select   {...register('categoryName', {
                                required: "Please select a category"
                            })} className="select select-sm select-primary w-full max-w-xs ">
                                {errors.categoryName && <p className='text-red-500 text-sm'>{errors.categoryName.message}</p>}
                                {
                                    categoryNames.map(categoryName => <option
                                        key={categoryName._id}
                                        value={categoryName.name}
                                    >{categoryName.name}</option>)
                                }

                            </select>

                        </div>




                        {/* //!verified check. */}
                        <div className="form-control w-full max-w-xs mx-auto">
                            <label className="label"> <span className="label-text font-bold">Please Verify</span> </label>
                            <select   {...register('verification', {
                                required: "Please Verify"
                            })} className="select select-sm select-primary w-full max-w-xs ">
                                <option>true</option>
                                <option>false</option>

                            </select>
                        </div>














                    </div>

                    <div>

                        {/* //!Product Image */}
                        <div className="form-control w-full mt-5 grid grid-cols-1 mx-auto">
                            <label className="label"> <span className="label-text font-bold">Upload Product Image</span></label>
                            <input type="file" {...register("image", {
                                required: "Product Image is Required"
                            })} className="file-input file-input-bordered file-input-success max-w-full "/>
                            {errors.image && <p className='text-red-500 text-sm'>{errors.image.message}</p>}
                        </div>
                    </div>

                    <input className='btn btn-outline  w-full mt-4 mx-auto' value="Add Product" type="submit" />
                </form>
            </div>
        </div>
    );
};

export default AddProduct;