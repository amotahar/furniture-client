import React, { useContext, useState } from 'react';
import { AuthContext } from '../../../context/AuthProvider';
import useTitle from '../../../hooks/useTitle';
import { useQuery } from '@tanstack/react-query';
import Spinner from '../../../utils/Spinner';
import ConfirmationModal from '../../../components/ConfirmationModal';
import { toast } from 'react-hot-toast';


const MySellPost = () => {
    useTitle('SellPost')
    const { user } = useContext(AuthContext);


    //!Email quary for myOrders
    const url = `http://localhost:5000/mySellPost?email=${user?.email}`;



    //!Tanstack quary for myOrders
    const { data: products = [], isLoading ,refetch} = useQuery({
        queryKey: ['products', user?.email],
        queryFn: async () => {
            const res = await fetch(url,{
                //!jwt verification
                headers: {
                    authorization: `bearer ${localStorage.getItem('accessToken')}`
                }
            });
            const data = await res.json();
            return data;
        }

    })













    // !Deleting Booking State
    const [deletingProduct, setDeletingProduct] = useState(null);

    // !Close Modal Function
    const closeModal = () => {
        setDeletingProduct(null);
    }


    // !success Action on Modal
    const handleDeleteProduct = p => {
        fetch(`http://localhost:5000/mySellPost/${p._id}`, {
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

    if (isLoading) {
        return <Spinner></Spinner>
    }



    return (

        <div>
            {products.length===0 ? 
                <p className="text-base md:text-3xl mb-5 text-center font-bold mt-2 text-primary ">Your Sell Post Empty </p>
             
            :
                
                <h3 className="text-base md:text-3xl mb-5 text-center font-bold mt-2 text-primary ">My Sell Post: {products.length} </h3>}
            <div className="overflow-x-auto">
                <table className="table w-full">
                    <thead>
                        <tr>
                            <th className='text-xs md:text-base'>SL.</th>
                            <th className='text-xs md:text-base'>Product Image</th>
                            <th className='text-xs md:text-base'>Product Name</th>
                            <th className='text-xs md:text-base'>Category</th>
                            <th className='text-xs md:text-base'>price</th>
                            <th className='text-xs md:text-base'>Post Date</th>
                            <th className='text-xs md:text-base'>Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            products &&

                            products?.map((product, i) => <tr key={product._id}>
                                <th>{i + 1}</th>

                                <td>
                                    <div className="flex items-center space-x-3">
                                        <div className="avatar">
                                            <div className="mask mask-squircle w-12 h-12">
                                                <img src={product.image} alt="Avatar Tailwind CSS Component" />
                                            </div>
                                        </div>
                                    </div>
                                </td>

                                <td>{product.name}</td>

                                <td>{product.category}</td>
                                <td><span className='mr-1 text-base font-black'>৳</span>{product.resalePrice}</td>
                                
                                <td>{product.postedTime}</td>
                                <td>

                                    <label onClick={() => setDeletingProduct(product)} htmlFor="confirmation-modal" className="btn bg-red-500 hover:bg-red-700 text-white btn-xs">Delete</label>

                                </td>
                            </tr>)
                        }
                    </tbody>
                </table>
            </div>
            {

                deletingProduct &&

                <ConfirmationModal
                    title={`Wait! Are you sure you want to delete?`}

                    message={`This 
                     ${deletingProduct.name} will be  permanently delete from the database.`}

                    closeModal={closeModal}

                    successAction={handleDeleteProduct}

                    modalData={deletingProduct}

                    successButtonName="Delete"

                ></ConfirmationModal>

            }
        </div>
    );
};

export default MySellPost;