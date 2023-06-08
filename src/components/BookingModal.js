import React, { useContext } from 'react';
import { AuthContext } from '../context/AuthProvider';
import { toast } from 'react-hot-toast';

const BookingModal = ({ item, setItem }) => {
    const { image, category, name, email, resalePrice, availabilty, _id } = item;
    const { user } = useContext(AuthContext)



    const handleBooking = event => {
        event.preventDefault()
        const form = event.target;
        const clientName = form.name.value;
        const clientEmail = form.email.value;
        const productName = form.productName.value;
        const price = form.price.value;
        const phone = form.phone.value;
        const location = form.location.value;

        // console.log(clientName,clientEmail,productName,price,phone,location)

        const orderData = {
            clientName,
            clientEmail,
            productName,
            price,
            phone,
            location,
            image,
            category
        }
        // TODO: send data to the server
        //! and once data is saved then close the modal 
        //! and display success toast
       

        //!Post Api Methods
        fetch('http://localhost:5000/bookings', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(orderData)
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                if (data.acknowledged) {
                    setItem(null); //!for close the modal.
                    toast.success('Booking confirmed Successfully 💖💖')
                }
                
                else {
                    toast.error(data.message);
                    setItem(null); //!for close the modal.
                }
            })



    }





    return (
        <>
            <input type="checkbox" id="booking-modal" className="modal-toggle" />
            <div className="modal">
                <div className="modal-box relative">
                    <label htmlFor="booking-modal" className="btn btn-sm btn-circle absolute right-2 top-2">✕</label>
                    <h3 className="text-lg font-bold">{name}</h3>
                    <form onSubmit={handleBooking} className='grid grid-cols-1 gap-3 '>

                        <input name="name" type="text" defaultValue={user?.displayName} disabled placeholder="Your Name" className="input input-bordered input-info w-full my-1 " required />

                        <input name="email" type="email" defaultValue={user?.email} disabled placeholder="Email Address" className="input input-bordered input-info w-full mb-1 " required />

                        <input name="productName" type="text" value={`${name}`} disabled placeholder="Product Name" className="input input-bordered input-info w-full mb-1 " required />

                        <input name="price" type="number" value={`${resalePrice}`}  disabled placeholder="Price" className="input input-bordered input-info w-full mb-1 " required />

                        <input name="phone" type="number" placeholder="Phone Number" className="input input-bordered input-info w-full mb-1 " required />

                        <input name="location" type="text" placeholder="Location" className="input input-bordered input-info w-full  " required />

                        <input type="submit" value="Submit" className="btn btn-outline btn-secondary w-full  " />
                    </form>
                </div>
            </div>
        </>
    );
};

export default BookingModal;