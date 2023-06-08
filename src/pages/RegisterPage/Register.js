import React, { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import useTitle from '../../hooks/useTitle';
import { AuthContext } from '../../context/AuthProvider';
import { toast } from 'react-hot-toast';
import useToken from '../../hooks/useToken';


const Register = () => {
    useTitle('Register'); //*Title hook

    //*UseForm 
    const { register, handleSubmit, formState: { errors } } = useForm();

    const { createUser, updateUser } = useContext(AuthContext);

    const [signUpError, setSignUPError] = useState('')
    //! firebase error.



    //!imgbb_key
    const imageHostKey = process.env.REACT_APP_imgbb_key;

    //!JWT custom hook
    const [createdUserEmail, setCreatedUserEmail] = useState('')
    const [token] = useToken(createdUserEmail);



    //! *** redirect to home page.
    const navigate = useNavigate();


    //!JWT custom hook
    if (token) {
        navigate('/');
    }




//*=====================================\\
    //!Handle Submit onclick event function.
    //!Upload image to image hosting server imgbb and get image url-VVI***
    const handleSignUp = (data) => {
        console.log(data);
        setSignUPError('');  //! firebase error clear error
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
                    console.log(imgData.data.url);

                    createUser(data.email, data.password)
                        .then(result => {
                            const user = result.user;
                            console.log(user);
                            toast.success('User Created Successfully.')

                            const userInfo = {
                                displayName: data.name,
                                email: data.email,
                                role: data.role,
                                image: imgData.data.url
                            }

                            updateUser(userInfo)
                                .then(() => {
                                    console.log('update successfully')
                                    saveUser(data.name, data.email, data.role, imgData.data.url) //!post api call

                                  
                                    navigate('/')

                                })
                                .catch(err => console.log(err));
                        })


                        .catch(error => {
                            console.log(error)
                            setSignUPError(error.message)
                        })



                }

            })

        console.log(data)




    }






    //! Save user to the database - Post api call.
    const saveUser = (name, email, role, image) => {
            const user = { name, email, role, image };
        fetch('https://wood-sell-server.vercel.app/users', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(user)
        })
            .then(res => res.json())
            .then(data => {
                setCreatedUserEmail(email);
            })
    }


















    return (
        <div className='h-[800px] flex justify-center items-center  '>
            <div className='w-80 lg:w-96 p-7 border-secondary border-8 rounded-2xl'>
                <h2 className='text-4xl text-center font-bold'>Sign Up</h2>
                <form onSubmit={handleSubmit(handleSignUp)}>




                    <div className="form-control w-full max-w-xs">
                        <label className="label"> <span className="label-text">Name</span></label>
                        <input type="text" {...register("name", {
                            required: "Name is Required"
                        })} className="input input-bordered w-full max-w-xs" />
                        {errors.name && <p className='text-red-500 text-sm'>{errors.name.message}</p>}
                    </div>





                    <div className="form-control w-full max-w-xs">
                        <label className="label"> <span className="label-text">Email</span></label>
                        <input type="email" {...register("email", {
                            required: "Email is Required",

                        })} className="input input-bordered w-full max-w-xs" />
                        {errors.email && <p className='text-red-500 text-sm'>{errors.email.message}</p>}
                    </div>






                    {/* //!role check. */}
                    <div className="form-control w-full max-w-xs mx-auto">
                        <label className="label"> <span className="label-text font-bold">Select Your Role</span> </label>
                        <select   {...register('role', {
                            required: "Please select a role"
                        })} className="select select-sm select-primary w-full max-w-xs ">
                            <option>buyer</option>
                            <option>seller</option>

                        </select>
                    </div>




                    <div>
                        {/* //!Product Image */}
                        <div className="form-control w-full mt-5 grid grid-cols-1 mx-auto">
                            <label className="label"> <span className="label-text font-bold">Upload Your Image</span></label>
                            <input type="file" {...register("image", {
                                required: "Product Image is Required"
                            })} className="file-input file-input-bordered file-input-success max-w-full " />
                            {errors.image && <p className='text-red-500 text-sm'>{errors.image.message}</p>}
                        </div>
                    </div>








                    <div className="form-control w-full max-w-xs">
                        <label className="label"> <span className="label-text">Password</span></label>
                        <input type="password" {...register("password", {
                            required: "Password is required",
                            minLength: { value: 6, message: "Password must be 6 characters or longer" },
                            pattern: {
                                value: /(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])/,
                                message: '1 uppercase,1 lowercase and 1 special character'
                            }
                        })} className="input input-bordered w-full max-w-xs" />
                        {errors.password && <p className='text-red-500 text-sm '>{errors.password.message}</p>}
                    </div>





                    <input className='btn btn-outline w-full max-w-xs mt-4' value="Sign Up" type="submit" />



                    {/* firebase error  */}
                    {signUpError && <p className='text-red-600'>{signUpError}</p>}

                </form>
                <p>Already have an account <Link className='text-primary font-bold' to="/login">Please Login</Link></p>
                <div className="divider">OR</div>
                <button className='btn btn-outline w-full max-w-xs'>CONTINUE WITH GOOGLE</button>

            </div>
        </div>
    );
};

export default Register;