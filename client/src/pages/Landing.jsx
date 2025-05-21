import { CreateUser } from "../components/CreateUser"
import { Login } from "../components/Login"
import { useState } from "react"
import jnmlogo from '../components/images/logo.png'

export function Landing() {
    
  //view == 0 --> Login
  //view == 1 --> Create
  const [view, setView] = useState(0)

    return (
      <div className="container min-w-screen max-w-screen min-h-screen max-h-screen flex justify-center items-center bg-[#001f3e]">

        {/* LOGO */}
        <div className="w-120 h-120 flex flex-col justify-center items-center mr-7">
          <img src={jnmlogo} width={screen}></img>
        </div>

        {/* Login and Create User */}
        {!view ?
        <div className="bg-white w-100 h-70  border-[#ffd700] border-5 rounded-xl p-4 flex flex-col justify-center items-center">
          <Login/>
        </div>:
        <div></div>}


      </div>
    )
}
  