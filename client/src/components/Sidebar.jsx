import { Link, useLocation } from "react-router-dom"
import { pageData } from "./pageData"
import sidelogo from "../components/images/sidelogo.png"
import { useState } from "react";

export function Sidebar() {

  const location = useLocation();

  return (
    <div className="sticky top-0 min-h-screen w-55 p-2 mr-2 flex flex-col justify-start items-center bg-white">
      {/* LOGO */}
      <img src={sidelogo} className=" w-30"/>

      
      {/* Buttons */}
      <ul className="w-full mt-5">
        { pageData.map((val, key) => {
        const isActivePath = location.pathname;

          return (
            <Link key={key}
            to={val.path}>
              {""}
              <div className={`relative text-[#001f3e] text-xl font-noto shadow-sm shadow-blue-500/20
                              h-10 mt-5 mb-7 flex justify-start items-center rounded-xl hover:text-white 
                              hover:bg-[#001f3e] ${isActivePath === val.path  ? "bg-[#001f3e] text-white" : "bg-white"}`} 
              >


                <div className="ml-4 mr-2">{val.icon}</div>
                <div className="">{val.name}</div>

              </div>

            </Link>
          );
        })}
        
      </ul>
    </div>
  );

}
