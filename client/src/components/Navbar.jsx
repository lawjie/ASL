import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { Bell } from 'lucide-react'
import { LogOut } from 'lucide-react'

import pic from "../components/images/pic.png"

export function Navbar(){    

    const [open, setOpenProfile] = useState(false);

    const navigate = useNavigate()
    function handleLogout(){
        sessionStorage.removeItem("User")
        navigate("/")
    }

    return (
        <div className="flex bg-white justify-between items-center pl-4 pr-4 mb-2 min-h-20 h-auto ">
            <div>
                <h1 className='font-noto text-2xl text-[#001f3e]'>Elegance in Time!</h1>
                <p>Sales and docs, handled! Let's take a look</p>
            </div>
            
            <div className="flex gap-2 justify-center items-center">
                
                <Bell size={25}/>

                <div className="flex bg-white w-23 h-12 rounded-full justify-between items-center pl-2 pr-3 border-3 border-[#dfe4e8]">
                    <img src={pic} alt='DP' 
                                          className='flex bg-white w-8 h-8 rounded-full border-2 border-[#af8028]'></img>
                    <LogOut className='cursor-pointer hover:bg-gray-100' size={20} type='button' color="#af8028" onClick={handleLogout}/>
                </div>
            </div>
        </div>
    );
}