import React from 'react';
import { FaFacebook, FaLinkedin, FaTwitter } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <div className=''>
           	            <footer className="footer p-10  bg-primary text-white">
                <div className='lg:pl-20'>
                    <span className=" text-white font-semibold">Services</span>
                    <Link className="link link-hover">Branding</Link>
                    <Link className="link link-hover">Design</Link>
                    <Link className="link link-hover">Marketing</Link>
                    <Link className="link link-hover">Advertisement</Link>
                </div>
                <div>
                    <span className="text-white font-semibold">Company</span>
                    <Link className="link link-hover">About us</Link>
                    <Link className="link link-hover">Contact</Link>
                    <Link className="link link-hover">Jobs</Link>
                    <Link className="link link-hover">Press kit</Link>
                </div>
                <div>
                    <span className="text-white font-semibold">Company</span>
                    <Link className="link link-hover">About us</Link>
                    <Link className="link link-hover">Contact</Link>
                    <Link className="link link-hover">Jobs</Link>
                    <Link className="link link-hover">Press kit</Link>
                </div>
                <div>
                    <span className="text-white font-semibold">Social</span>
                    <div className="grid grid-flow-col gap-4">
                        <FaFacebook className='text-2xl'></FaFacebook>
                        <FaLinkedin className='text-2xl'></FaLinkedin>
                        <FaTwitter className='text-2xl '></FaTwitter>
                    </div>
                </div>

                <div>
                    All Right reserved  @Motahar Hossain
                </div>
            </footer>
        </div>	        
    );
};

export default Footer;