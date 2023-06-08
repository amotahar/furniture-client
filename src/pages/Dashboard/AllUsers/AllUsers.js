import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';
import Spinner from '../../../utils/Spinner';
import { toast } from 'react-hot-toast';
import useTitle from '../../../hooks/useTitle';
import ConfirmationModal from '../../../components/ConfirmationModal';













const AllUsers = () => {
    useTitle('AllUsers');
    // !=================================
    // !React quary- users data get or fetch
    const { data: users = [], isLoading, refetch } = useQuery({
        queryKey: ['users'],
        queryFn: async () => {
            const res = await fetch('http://localhost:5000/users');
            const data = await res.json();
            return data;
        }
    });






    const handleMakeAdmin = id => {
        fetch(`http://localhost:5000/users/admin/${id}`, {
            method: 'PUT',
            headers: {
                authorization: `bearer ${localStorage.getItem('accessToken')}`
            }
        })
            .then(res => res.json())
            .then(data => {
                if (data.modifiedCount > 0) {
                    toast.success(`Make Admin Successfully.`)
                    refetch();
                }
            })
    }


    // !Deleting Booking State
    const [deletingUser, setDeletingUser] = useState(null);

    // !Close Modal Function
    const closeModal = () => {
        setDeletingUser(null);
    }


    // !success Action on Modal
    const handleDeleteUser = p => {
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
            <h3 className="text-base md:text-3xl mb-5 text-center font-bold mt-2 text-primary ">All Users: {users.length} </h3>

            {/* //!table start */}
            <table className="table w-full">
                <thead>
                    <tr>
                        <th className='text-xs md:text-base'>SL.</th>
                        <th className='text-xs md:text-base'>Image</th>
                        <th className='text-xs md:text-base'>Name</th>
                        <th className='text-xs md:text-base'>Email</th>
                        <th className='text-xs md:text-base'>Admin Action</th>
                        <th className='text-xs md:text-base'>Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        users.map((user, i) => <tr key={user._id}>
                            <th>{i + 1}</th>
                            <td>
                                <div className="flex items-center space-x-3">
                                    <div className="avatar">
                                        <div className="mask mask-squircle w-16 h-16">
                                            <img src={user.image} alt="Avatar" />
                                        </div>
                                    </div>
                                </div>
                            </td>
                            <td>{user.name}</td>
                            <td>{user.email}</td>
                           
                            <td>
                                {user?.role !== 'admin' && <button onClick={() => handleMakeAdmin(user._id)} className='btn btn-primary btn-sm hover:bg-secondary  text-white'>Make Admin</button>}
                            </td>
                            <td>
                                <label onClick={() => setDeletingUser(user)} htmlFor="confirmation-modal" className="btn bg-red-500 hover:bg-red-700 text-white btn-xs">Delete</label>
                            </td>
                        </tr>)
                    }

                </tbody>
            </table>
            {

                deletingUser &&

                <ConfirmationModal
                    title={`Are you sure you want to delete?`}

                    message={`Be careful we have not any other information of this Payment history of 
                     ${deletingUser.name}.It will be  permanently delete from the database.`}

                    closeModal={closeModal}

                    successAction={handleDeleteUser}

                    modalData={deletingUser}

                    successButtonName="Delete"

                ></ConfirmationModal>

            }
        </div>

    );
};

export default AllUsers;
