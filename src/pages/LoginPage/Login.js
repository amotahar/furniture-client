import React, { useContext, useState } from 'react';
import useTitle from '../../hooks/useTitle';
import { BsGoogle } from "react-icons/bs";
import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthProvider';
import { toast } from 'react-hot-toast';
import { GoogleAuthProvider } from 'firebase/auth';
import useToken from '../../hooks/useToken';




const Login = () => {
    useTitle('Login');
    const { register, formState: { errors }, handleSubmit } = useForm();
    const { signIn, providerLogin } = useContext(AuthContext);
    const [loginError, setLoginError] = useState(''); //*firebase-login error showed state.

    //!Jwt custom hook
    const [loginUserEmail, setLoginUserEmail] = useState('');
    const [token] = useToken(loginUserEmail);


    const location = useLocation(); //!private route - return location
    const navigate = useNavigate(); //!private route - return location



    //! Redirect the page.
    const from = location.state?.from?.pathname || '/';




    //!Jwt custom hook
    if (token) {
        navigate(from, { replace: true });
    }




    //! Own making handleLogin -73.2,NOD.
    const handleLogin = data => {
        console.log(data);
        setLoginError(''); //*firebase-login error clear otherwise stay in position.
        signIn(data.email, data.password)
            .then(result => {
                const user = result.user;
                console.log(user)
                toast.success('User Login Successfully.')
                setLoginUserEmail(data.email);  //!Jwt custom hook
            })

            .catch(error => {
                console.log(error.message)
                setLoginError(error.message);
            });
    }





    //!Google signin with pop up.
    const googleProvider = new GoogleAuthProvider()

    const handleGoogleSignIn = () => {
        providerLogin(googleProvider)
            .then(result => {
                const user = result.user;
                console.log(user);
                navigate(from, { replace: true });  //! redirection💥💥
            })
            .catch(error => console.error(error))
    }









    return (

        <div className='h-[800px] flex justify-center items-center'>
            <div className='w-80  lg:w-96 p-7 border-secondary border-8 rounded-2xl'>
                <h2 className='text-4xl text-center font-bold'>Login</h2>
                <form onSubmit={handleSubmit(handleLogin)}>

                    <div className="form-control w-full max-w-xs">
                        <label className="label">
                            <span className="label-text">Email</span>
                        </label>
                        <input type="text"
                            {...register("email", {
                                required: "Email Address is required"
                            })} className="input input-bordered w-full max-w-xs" />
                        {errors.email && <p className='text-red-600 text-sm'>{errors.email?.message}</p>}
                    </div>



                    <div className="form-control w-full max-w-xs">
                        <label className="label">
                            <span className="label-text">Password</span>
                        </label>
                        <input type="password"
                            {...register("password", {
                                required: "Password is required",
                                minLength: { value: 6, message: 'Password must be 6 characters or longer' },
                                pattern: {
                                    value: /(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])/,
                                    message: '1 uppercase,1 lowercase and 1 special character'
                                }
                            })}
                            className="input input-bordered w-full max-w-xs" />
                        {errors.password && <p className='text-red-600 text-sm'>{errors.password?.message}</p>}
                        <label className="label"> <span className="label-text"><Link className='text-primary font-bold' to="/register">Forget Password..?</Link></span></label>

                    </div>

                    <input className='btn btn-outline w-full' value="Login" type="submit" />


                    {/* //!Firebase error messages */}
                    <div>
                        {loginError && <p className='text-red-600'>{loginError}</p>}
                    </div>

                </form>
                <p>Are you new..?  <Link className='text-primary font-bold' to="/register">Create new Account</Link></p>
                <div className="divider">OR</div>
                <button onClick={handleGoogleSignIn} className='btn btn-outline w-full'> <BsGoogle className="mr-2 text-3xl" /> CONTINUE WITH GOOGLE </button>

            </div>
        </div>
    );
};

export default Login;