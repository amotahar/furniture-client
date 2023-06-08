import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthProvider';






const Navbar = () => {
    const { user, logOut } = useContext(AuthContext);
//!Observer the user.
    //!Log out the user from context.




    // !=========================================
    //!Handle Logout function.
    const handleLogOut = () => {
        logOut()
            .then(() => { })
            .catch(err => console.log(err));
    }
    // !=========================================





    //!navbar variable
    const menuItems = <React.Fragment>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/allproducts">All Products</Link></li>
        <li><Link to="/faq">FAQ</Link></li>
      
        {user?.uid ?
           <>
                <li><Link to="/dashboard">Dashboard</Link></li>
                <li><button onClick={handleLogOut}>Logout</button></li>
                
           </>
            : <li><Link to="/login">Login</Link></li>}
    </React.Fragment>




    return (
        <div className="navbar bg-gray-100">
            <div className="navbar-start">
                <div className="dropdown">
                    <label tabIndex={0} className="btn btn-ghost lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                    </label>
                    <ul tabIndex={0} className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52">
                        {menuItems}
                    </ul>
                </div>
                <Link to="/" className="btn btn-ghost normal-case text-xl lg:text-3xl lg:ml-3 " style={{ fontFamily: "'Aclonica', sans-serif" }}>Wood Sell</Link>
            </div>
            <div className="navbar-end  hidden lg:flex lg:flex-row text-xl font-bold xl:ml-[645px] ">
                <ul className="menu menu-horizontal p-0">
                    {menuItems}
                </ul>


            </div>
            <div className='navbar-end'>
                <div className='dropdown'>
                    <label htmlFor="dashboard-drawer" tabIndex={0} className="btn btn-ghost lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                    </label>
                </div>
            </div>
        </div>
    );
};
export default Navbar;