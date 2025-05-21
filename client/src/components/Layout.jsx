import { Navbar } from "./Navbar" 
import { Sidebar } from "./Sidebar"
import { Outlet, useNavigate, } from "react-router-dom"
import { useEffect } from "react"

export function Layout(){

    let user = sessionStorage.getItem("User")
    const navigate = useNavigate()

    useEffect(() => {
        if (!user) { 
            navigate("/")
        }
    }, [user])


    
    return (
        <div className="flex w-full min-h-max pr-5">
            {/* Sidebar */}
            <div className="sticky right-0 top-0"><Sidebar/></div>

            {/* Navbar and Content */}
            <div className="flex flex-col w-full ">
                <div className="sticky top-0"><Navbar/></div>
                <div className=""><Outlet/></div>
            </div>
        </div>
    );
}
