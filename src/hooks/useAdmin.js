import { useEffect, useState } from "react"

const useAdmin = email => {
    const [isAdmin, setIsAdmin] = useState(false);
    const [isAdminLoading, setIsAdminLoading] = useState(true); //! loading state initially true
    useEffect(() => {
        if (email) {
            fetch(`http://localhost:5000/users/admin/${email}`)
                .then(res => res.json())
                .then(data => {
                    console.log(data);
                    setIsAdmin(data.isAdmin);
                    setIsAdminLoading(false); //! loading state finally false || off.
                })
        }
    }, [email])
    return [isAdmin, isAdminLoading] //!isAdminLoading send globally,to get anywhere.
}

export default useAdmin;


//!=========================================Link with bknd.
//!User admin investigation api , it is admin then it can make admin.