import React, { useContext } from 'react';
import { AuthContext } from '../../../context/AuthProvider'
import { useQuery } from '@tanstack/react-query';
import Spinner from '../../../utils/Spinner';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import useTitle from '../../../hooks/useTitle';
import ConfirmationModal from '../../../components/ConfirmationModal';
import { toast } from 'react-hot-toast';

const MyOrders = () => {
    useTitle('Orders')
    const { user } = useContext(AuthContext);

    //!Email quary for myOrders
    const url = `http://localhost:5000/bookings?email=${user?.email}`;



    //!Tanstack quary for myOrders
    const { data: bookings = [], isLoading,  refetch } = useQuery({
        queryKey: ['bookings', user?.email],
        queryFn: async () => {
            const res = await fetch(url, {

                headers: {
                    authorization: `bearer ${localStorage.getItem('accessToken')}`

                }
            });
            const data = await res.json();
            return data;
        }
    })

    // !Deleting Booking State
    const [deletingBooking, setDeletingBooking] = useState(null);

    // !Close Modal Function
    const closeModal = () => {
        setDeletingBooking(null);
    }

    
    // !success Action on Modal
    const handleDeleteBooking = p => {
        fetch(`http://localhost:5000/bookings/${p._id}`, {
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

                bookings.length === 0 ?

                    <h3 className="text-base md:text-3xl mb-2 text-center font-bold mt-2 text-primary ">Your Orders Empty..! Booked Something..! <span className='text-secondary '></span></h3>

                    :

                    <h3 className="text-base md:text-3xl text-center font-bold mt-2 text-primary ">Orders Numbers: {bookings.length}<span className='text-secondary '></span></h3>

            }

            <div className="overflow-x-auto">
                <table className="table w-full">
                    <thead>
                        <tr>
                            <th className='text-xs md:text-base'>SL.</th>
                            <th className='text-xs md:text-base'>Product Image</th>
                            <th className='text-xs md:text-base'>Product Name</th>
                            <th className='text-xs md:text-base'>Category</th>
                            <th className='text-xs md:text-base'>price</th>
                            <th className='text-xs md:text-base'>payment</th>
                            <th className='text-xs md:text-base'>Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            bookings &&

                            bookings?.map((booking, i) => <tr key={booking._id}>
                                <th>{i + 1}</th>

                                <td>
                                    <div className="flex items-center space-x-3">
                                        <div className="avatar">
                                            <div className="mask mask-squircle w-12 h-12">
                                                <img src={booking.image} alt="Avatar Tailwind CSS Component" />
                                            </div>
                                        </div>
                                    </div>
                                </td>

                                <td>{booking.productName}</td>

                                <td>{booking.category}</td>
                                <td><span className='mr-1 text-base font-black'>৳</span>{booking.price}</td>
                                <td>
                                    {
                                        booking.price && !booking.paid && <Link
                                            to={`/dashboard/payment/${booking._id}`}
                                        >
                                            <button className='btn btn-primary  hover:bg-secondary  text-white btn-xs'>Pay Now</button>
                                        </Link>
                                    }
                                    {
                                        booking.price && booking.paid && <span className='text-green-500'>Paid</span>
                                    }

                                </td>

                                <td>

                                    <label onClick={() => setDeletingBooking(booking)} htmlFor="confirmation-modal" className="btn bg-red-500 hover:bg-red-700 text-white btn-xs">Delete</label>

                                </td>
                            </tr>)
                        }
                    </tbody>
                </table>
            </div>
            {

                deletingBooking &&

                <ConfirmationModal
                    title={`Are you sure you want to delete?`}

                    message={`Be careful we have not any other information of this Payment history of 
                     ${deletingBooking.productName}.It will be  permanently delete from the database.`}

                    closeModal={closeModal}

                    successAction={handleDeleteBooking}

                    modalData={deletingBooking}

                    successButtonName="Delete"

                ></ConfirmationModal>

            }
        </div>
    );
};

export default MyOrders;