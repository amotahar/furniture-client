import React from 'react';
import Spinner from '../../../utils/Spinner';
import useTitle from '../../../hooks/useTitle';
import { useState } from 'react';
import ConfirmationModal from '../../../components/ConfirmationModal';
import { toast } from 'react-hot-toast';
import { useQuery } from '@tanstack/react-query';





const PaymentList = () => {
    useTitle('AllPayments')

    //!All Payments url
    const url = `http://localhost:5000/payments`;




    //!Tanstack quary for AllPayments
    const { data: payments = [], isLoading, refetch } = useQuery({
        queryKey: ['payments'],
        queryFn: async () => {
            const res = await fetch(url, {
                //!jwt verification
                headers: {
                    authorization: `bearer ${localStorage.getItem('accessToken')}`
                }
            });
            const data = await res.json();
            return data;
        }
    })




    // !Deleting Payment State
    const [deletingPayment, setDeletingPayment] = useState(null);




    // !Close Modal Function
    const closeModal = () => {
        setDeletingPayment(null);
    }



    // !success Action on Modal
    const handleDeletePayment = payment => {
        fetch(`http://localhost:5000/payments/${payment._id}`, {
            method: 'DELETE',
            headers: {
                authorization: `bearer ${localStorage.getItem('accessToken')}`
            }
        })
            .then(res => res.json())
            .then(data => {
                if (data.deletedCount > 0) {
                    refetch();
                    toast.success(` ${payment.name} deleted successfully ❎❎`)
                }
            })
    }




    if (isLoading) {
        return <Spinner></Spinner>
    }




    return (
        <div>
            <h3 className="text-base md:text-3xl mb-5 text-center font-bold mt-2 text-primary ">Payments List: {payments.length} </h3>


            <div className="overflow-x-auto">
                <table className="table w-full">
                    <thead>
                        <tr>
                            <th className='text-xs md:text-base'>SL.</th>
                            <th className='text-xs md:text-base'>Transaction ID</th>
                            <th className='text-xs md:text-base'>Price</th>
                            <th className='text-xs md:text-base'>Client Email</th>
                            <th className='text-xs md:text-base'>Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            payments &&

                            payments?.map((payment, i) => <tr key={payment._id}>
                                <th>{i + 1}</th>
                                <td>{payment.transactionId}</td>
                                <td>{payment.price}</td>
                                <td>{payment.email}</td>
                                <td>
                                    <label onClick={() => setDeletingPayment(payment)} htmlFor="confirmation-modal" className="btn bg-red-500 hover:bg-red-700 text-white btn-xs">Delete</label>
                                </td>
                            </tr>)
                        }
                    </tbody>
                </table>
            </div>


            {

                deletingPayment &&

                <ConfirmationModal
                    title={`Are you sure you want to delete?`}

                    message={`Be careful we have not any other information of this Payment history of  ${deletingPayment.email}.It will be  permanently delete from the database.`}

                    closeModal={closeModal}

                    successAction={handleDeletePayment}

                    modalData={deletingPayment}

                    successButtonName="Delete"

                ></ConfirmationModal>

            }















        </div>
    );
};

export default PaymentList;