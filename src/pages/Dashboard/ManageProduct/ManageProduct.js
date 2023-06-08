import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';
import Spinner from '../../../utils/Spinner';
import ConfirmationModal from '../../../components/ConfirmationModal';
import { toast } from 'react-hot-toast';
import useTitle from '../../../hooks/useTitle';





const ManageProduct = () => {
    useTitle('ManageProduct');

    // !Deleting Product State
    const [deletingProduct, setDeletingProduct] = useState(null);






    // !Close Modal Function
    const closeModal = () => {
        setDeletingProduct(null);
    }




    // !================================================
    // !React useQuary
    const { data: products, isLoading, refetch } = useQuery({
        queryKey: ['products'],
        queryFn: async () => {
            try {
                const res = await fetch('http://localhost:5000/products', {
                    headers: {
                        authorization: `bearer ${localStorage.getItem('accessToken')}`
                    }
                });
                const data = await res.json();
                return data;
            }
            catch (error) {

            }
        }
    })


    // !success Action on Modal
    const handleDeleteProduct = p => {
        fetch(`http://localhost:5000/products/${p._id}`, {
            method: 'DELETE',
            headers: {
                authorization: `bearer ${localStorage.getItem('accessToken')}`
            }
        })
            .then(res => res.json())
            .then(data => {
                if (data.deletedCount > 0) {
                    refetch();
                    toast.success(` ${p.name} deleted successfully ❎❎`)
                }
            })
    }


    // !Loader spinner
    if (isLoading) {
        return <Spinner />;
    }




    return (
        <div>
            <h3 className="text-base md:text-3xl mb-5 text-center font-bold mt-2 text-primary ">Manage Products: {products?.length} </h3>



            {/* //!M.Table */}
            <div className="overflow-x-auto">
                <table className="table w-full">
                    <thead>
                        <tr>
                            <th className='text-xs md:text-base'>SL.</th>
                            <th className='text-xs md:text-base'>Product Image</th>
                            <th className='text-xs md:text-base'>Product Name</th>
                            
                            <th className='text-xs md:text-base'>Resell Price</th>
                            <th className='text-xs md:text-base'>Location</th>
                            <th className='text-xs md:text-base'>Category</th>
                            <th className='text-xs md:text-base'>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            products.map((p, i) => <tr key={p._id}>
                                <th>{i + 1}</th>
                                <td><div className="avatar">
                                    <div className="mask mask-squircle w-16 h-16">
                                        <img src={p.image} alt="" />
                                    </div>
                                </div></td>
                                <td>{p.name}</td>
                                
                                <td><span className='mr-1 text-base font-black'>৳</span>{p.resalePrice}</td>
                                <td>{p.location}</td>
                                <td>{p.category}</td>
                                <td>

                                    <label onClick={() => setDeletingProduct(p)} htmlFor="confirmation-modal" className="btn bg-red-500 hover:bg-red-700 text-white btn-xs">Delete</label>

                                </td>
                            </tr>)
                        }
                    </tbody>
                </table>
            </div>
            <span></span>

            {

                deletingProduct &&

                <ConfirmationModal
                    title={`Are you sure you want to delete?`}

                    message={`If you delete this ${deletingProduct.name}. We will never be able to recover this product. It will be  permanently delete from the database.`}

                        closeModal={closeModal}

                        successAction={handleDeleteProduct}

                        modalData={deletingProduct}

                        successButtonName="Delete"

                    ></ConfirmationModal>

            }














        </div>
    );
};

export default ManageProduct;