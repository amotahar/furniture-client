import React, { useContext } from 'react';
import { Link, useNavigation } from 'react-router-dom';
import Spinner from '../../../utils/Spinner';
import { AuthContext } from '../../../context/AuthProvider';

const AdvertisementCard = ({ add, setItem }) => {
    const { condition, image, location, name, originalPrice, postedTime, resalePrice, sellerName, usedYear, verified, _id, report } = add;
    const navigation = useNavigation()
    const { user } = useContext(AuthContext)


    if (navigation.state === 'loading') {
        return <Spinner></Spinner>
    }



    return (
        <div>


            <div className="card max-w-xs md:max-w-sm mx-auto h-[560px] bg-base-200 lg:shadow-xl border-2 relative ">
                <figure><img src={image} alt="Shoes" className='h-64 w-full rounded-2xl' /></figure>
                <div className='mx-5 text-left'>
                    <h2 className="card-title font-bold text-center text-secondary h-20">
                        {name}
                    </h2>
                    <div className='flex justify-between items-center text-black '>
                        <p className='font-semibold'>Seller : <span className='font-bold'>{sellerName}</span></p>
                        <>
                            {
                                verified ?
                                    <div className="badge  badge-secondary">Verified</div> :
                                    <div className='badge badge-warning'>Not Verified</div>
                            }
                        </>
                    </div>
                    <div className='flex justify-between items-center'>
                        <p className='font-semibold text-black'>Location : <span className='font-bold'>{location}</span></p>
                        <p className='text-black'><small>Posted Date : {postedTime}</small></p>
                    </div>
                    <div className='text-black flex justify-between items-center my-3'>
                        <p className='font-semibold'>Price : <span className='font-bold'>${resalePrice}</span></p>
                        <p className='font-semibold'>Original Price : <span><del>${originalPrice}</del></span></p>
                    </div>
                    <div className='text-black flex justify-between items-center'>
                        <div>
                            <p className='font-semibold'>Condition : <span className='font-bold'>{condition}</span></p>
                            <p className='font-semibold'>Used For : <span className='font-bold'>{usedYear} Years</span></p>
                        </div>

                    </div>
                </div>


                { 
                    user?.uid ?
                    <label
                    htmlFor="booking-modal"
                    className="btn btn-outline btn-secondary w-full mt-5"
                    onClick={() => setItem(add)}
                >Add To Cart</label>
                        :
                        <p className='text-secondary text-2xl flex justify-center items-center mt-5'> Please <Link to={'/login'} className="mx-2 text-blue-600 font-bold">Login</Link> to buy.</p>
                }


            </div>

        </div>
    );
};

export default AdvertisementCard;