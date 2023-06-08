import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';
import Spinner from '../../../utils/Spinner';
import { toast } from 'react-hot-toast';
import useTitle from '../../../hooks/useTitle';
import ConfirmationModal from '../../../components/ConfirmationModal';

const AllBuyer = () => {
    useTitle('AllBuyer');

    // !=================================
    // !React quary- buyers data get or fetch
    const { data: buyers = [], isLoading, refetch } = useQuery({
        queryKey: ['buyers'],
        queryFn: async () => {
            const res = await fetch('http://localhost:5000/role?role=buyer');
            const data = await res.json();
            return data;
        }
    });




    // !Deleting Booking State
    const [deletingBuyer, setDeletingBuyer] = useState(null);

    // !Close Modal Function
    const closeModal = () => {
        setDeletingBuyer(null);
    }


    // !success Action on Modal
    const handleDeleteBuyer = p => {
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
            {/* Conditional Text */}
            {

                buyers.length === 0 ?

                    <h3 className="text-base md:text-3xl mb-2 text-center font-bold mt-2 text-primary ">Buyers Database Empty<span className='text-secondary '></span></h3>

                    :

                    <h3 className="text-base md:text-3xl mb-2 text-center font-bold mt-2 text-primary ">Seller Numbers: {buyers.length}<span className='text-secondary '></span></h3>

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
                        buyers.map((buyer, i) => <tr key={buyer._id}>
                            <th>{i + 1}</th>
                            <td>
                                <div className="flex items-center space-x-3">
                                    <div className="avatar">
                                        <div className="mask mask-squircle w-16 h-16">
                                            <img src={buyer.image} alt="Avatar" />
                                        </div>
                                    </div>
                                </div>
                            </td>
                            <td>{buyer.name}</td>
                            <td>{buyer.email}</td>
                            

                            <td>
                                <label onClick={() => setDeletingBuyer(buyer)} htmlFor="confirmation-modal" className="btn bg-red-500 hover:bg-red-700 text-white btn-xs">Delete</label>
                            </td>
                        </tr>)
                    }

                </tbody>
            </table>
            {

                deletingBuyer &&

                <ConfirmationModal
                    title={`Are you sure you want to delete?`}

                    message={`Be careful we have not any other information of this Payment history of 
                     ${deletingBuyer.name}.It will be  permanently delete from the database.`}

                    closeModal={closeModal}

                        successAction={handleDeleteBuyer}

                    modalData={deletingBuyer}

                    successButtonName="Delete"

                ></ConfirmationModal>

            }
        </div>
    );
};

export default AllBuyer;