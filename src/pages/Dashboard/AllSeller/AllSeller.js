import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';
import Spinner from '../../../utils/Spinner';
import { toast } from 'react-hot-toast';
import useTitle from '../../../hooks/useTitle';
import ConfirmationModal from '../../../components/ConfirmationModal';

const AllSeller = () => {
    useTitle('AllSeller');
    
    // !=================================
    // !React quary- sellers data get or fetch
    const { data: sellers = [], isLoading, refetch } = useQuery({
        queryKey: ['sellers'],
        queryFn: async () => {
            const res = await fetch('http://localhost:5000/role?role=seller');
            const data = await res.json();
            return data;
        }
    });



    // !Deleting Booking State
    const [deletingSeller, setDeletingSeller] = useState(null);

    // !Close Modal Function
    const closeModal = () => {
        setDeletingSeller(null);
    }


    // !success Action on Modal
    const handleDeleteSeller = p => {
        fetch(`http://localhost:5000/users/${p._id}`, {
            method: 'DELETE',
            headers: {
                authorization: `bearer ${localStorage.getItem('accessToken')}`
            }
        })
            .then(res => res.json())
            .then(data => {
                if (data.deletedCount > 0) {

                    toast.success(` ${p.name} deleted successfully ❎❎`)
                    refetch();
                }
            })
    }

    if (isLoading) {
        return <Spinner></Spinner>
    }

    return (
        <div>
            {
            
            sellers.length === 0 ?

           <h3 className="text-base md:text-3xl mb-2 text-center font-bold mt-2 text-primary ">Seller Database Empty<span className='text-secondary '></span></h3>

           :

           <h3 className="text-base md:text-3xl mb-2 text-center font-bold mt-2 text-primary ">Seller Numbers: {sellers.length}<span className='text-secondary '></span></h3>
           
           }



            {/* //!table start */}
            <table className="table w-full">
                <thead>
                    <tr>
                        <th className='text-xs md:text-base'>SL.</th>
                        <th className='text-xs md:text-base'>Image</th>
                        <th className='text-xs md:text-base'>Name</th>
                        <th className='text-xs md:text-base'>Email</th>
                        <th className='text-xs md:text-base'>Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        sellers.map((seller, i) => <tr key={seller._id}>
                            <th>{i + 1}</th>
                            <td>
                                <div className="flex items-center space-x-3">
                                    <div className="avatar">
                                        <div className="mask mask-squircle w-16 h-16">
                                            <img src={seller.image} alt="Avatar" />
                                        </div>
                                    </div>
                                </div>
                            </td>
                            <td>{seller.name}</td>
                            <td>{seller.email}</td>


                            <td>
                                <label onClick={() => setDeletingSeller(seller)} htmlFor="confirmation-modal" className="btn bg-red-500 hover:bg-red-700 text-white btn-xs">Delete</label>
                            </td>
                        </tr>)
                    }

                </tbody>
            </table>

            {

                deletingSeller &&

                <ConfirmationModal
                    title={`Are you sure you want to delete?`}

                    message={`Be careful we have not any other information of this Payment history of 
                     ${deletingSeller.name}.It will be  permanently delete from the database.`}

                    closeModal={closeModal}

                    successAction={handleDeleteSeller}

                    modalData={deletingSeller}

                    successButtonName="Delete"

                ></ConfirmationModal>

            }
        </div>
    );
};

export default AllSeller;