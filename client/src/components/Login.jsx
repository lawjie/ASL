import { verifyUser } from "../api"
import { useState } from "react"
import { useNavigate } from 'react-router-dom'
import axios from "axios"

export function Login() {

    const [user, setUser] = useState({
        email: "",
        password: "",
    })

    const navigate = useNavigate()

    function handleChange(e) {
        setUser({ ...user, [e.target.name]: e.target.value })
    }

    async function handleSubmit(e) {
        e.preventDefault()
        let response = await verifyUser(user)
        if (response) {
            sessionStorage.setItem("User", response)
            console.log(`Bearer ${response}`)
            axios.defaults.headers.common["Authorization"] = `Bearer ${response}`
            navigate("/dashboard")
        } else {
            alert("Login failed")
        }
    }

    const inputClasses = "bg-[#cecdcd] w-full h-8 rounded-md pl-3 text-black text-s mb-3";
    const buttonStyles = `
    rounded-md
    px-3
    py-2.5
    text-sm
    text-white
    font-semibold
    font-inherit
    bg-[#003264]
    cursor-pointer
    transition-colors
    duration-250
    border-1
    hover:border-[#646cff]
    focus:outline-none
    focus-visible:ring-4
    focus-visible:ring-offset-2
    focus-visible:ring-[#646cff]
  `;

   return (
    <div className="h-80 w-full flex flex-col justify-center items-center py-2">
      <form onSubmit={handleSubmit} className="flex flex-col justify-center w-full h-90 p-4">
        <label htmlFor="email" className="text-sm text-black mb-1">E-mail address:</label>
        <input
          className={`${inputClasses}`}
          placeholder={"Enter E-mail"}
          onChange={handleChange}
          name="email"
          required
          maxLength={40}
        />
        <label htmlFor="password" className="text-sm text-black mb-1">Password:</label>
        <input
          className={`${inputClasses}`}
          placeholder={"Enter Password"}
          onChange={handleChange}
          name="password"
          type="password"
          required
          maxLength={20}
        />

        <div className="flex justify-center items-center mt-3">
          <button className={`w-40 ${buttonStyles}`} type="submit">LOG-IN</button>
        </div>
      </form>
    </div>
  );
}