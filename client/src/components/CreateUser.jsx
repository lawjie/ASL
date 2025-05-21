import { createUser } from "../api"
import { useState } from "react"

export function CreateUser() {

    const [user, setUser] = useState({
        name: "",
        email: "",
        password: "",
    })

    function handleChange(e) {
        setUser({ ...user, [e.target.name]: e.target.value })
    }

    async function handleSubmit(e) {
        e.preventDefault()
        let response = await createUser(user)
        if (response.status !== 200) {
            alert("User account could not be created :(")
        }
        
    }

    const inputClasses = "bg-[#cecdcd] w-full h-8 rounded-md pl-3 text-black text-s mb-3";
    const buttonStyles = `
    rounded-md
    px-3
    py-2.5
    text-sm
    font-semibold
    font-inherit
    bg-[#003264]
    cursor-pointer
    transition-colors
    duration-250
    border-color-[#ffd700]
    border-2
    hover:border-[#646cff]
    focus:outline-none
    focus-visible:ring-4
    focus-visible:ring-offset-2
    focus-visible:ring-[#646cff]
  `;

    // WHEN CREATING AN ACCOUNT It doesnt show proper notification. If theres an exisiting email it wont add to the database
    // but it should notif account already exist.
    return (
        <div className="h-80 w-full flex flex-col justify-center items-center py-2 mb-10">
            <div className="flex flex-col justify-center items-center border-b-1 border-black">
                <h1 className="text-black text-3xl text-center font-bold">Create a new account</h1>
                <p className="text-black">It’s quick and easy.</p>
            </div>
            <form onSubmit={handleSubmit} className="flex flex-col justify-center w-full h-90 p-4">
                <label htmlFor="name" className="text-sm text-black mb-1">Name:</label>
                <input className={`${inputClasses}`} placeholder={"Enter you Name"} onChange={handleChange} name="name" required maxLength={20}/>
                <label htmlFor="email" className="text-sm text-black mb-1">Email:</label>
                <input className={`${inputClasses}`} placeholder={"Enter your Email"} onChange={handleChange} name="email" required maxLength={40}/>
                <label htmlFor="password" className="text-sm text-black mb-1">Password:</label>
                <input className={`${inputClasses}`} placeholder={"Enter your Password"} onChange={handleChange} name="password" type="password" required maxLength={20}/>
                <button className={`${buttonStyles}`} type="submit">Create Account</button>
            </form>
        </div>
    );
}