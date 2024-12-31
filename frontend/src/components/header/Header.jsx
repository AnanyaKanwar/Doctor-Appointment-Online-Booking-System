import React, { useRef ,useContext} from "react";
import logo from "../../assets/images/logo.png";
import { useEffect, useState } from "react";
import { NavLink, Link } from "react-router-dom";
import { FiMenu } from "react-icons/fi";
import { authContext } from "../../Context/AuthContext.jsx"; 
const navlink = [
  { path: "/", display: "Home" },
  { path: "/doctors", display: "Find a Doctor" },
  { path: "/services", display: "Services" },
  { path: "/contact", display: "Contact" },
];

const Header = () => {
  const headerRef=useRef(null);
  const menuRef=useRef(null);
  const {user,role,token}=useContext(authContext);


  const handleStickyHeader=()=>{
    window.addEventListener('scroll',()=>{
      if(document.body.scrollTop>80 || document.documentElement.scrollTop>80){
        headerRef.current.classList.add('sticky_header')
      }else{
        headerRef.current.classList.remove('sticky_header')

      }
    })
  }

  useEffect(()=>{

    console.log("user: "+user);
    console.log("role: "+role);
    console.log("token: "+token);
    handleStickyHeader()
    return()=>window.removeEventListener('scroll',handleStickyHeader)
  })

  const toggleMenu=()=>{
      menuRef.current.classList.toggle('show_menu')
    }

  return (
    <header className="header fixed  flex items-center" ref={headerRef}>
      <div className="container ">
        <div className="flex items-center justify-between">
          {/*---------------------- logo ----------------*/}
          <div>
            <img src={logo} alt="" />
          </div>

          {/* ----------------------------menu--------- */}
          <div className="navigation" ref={menuRef} >
            <ul className="menu  flex items-center gap-[2.7rem]">
              {navlink.map((item, index) => (
                <li key={index}>
                  <NavLink
                    to={item.path}
                    className={(navClass) =>
                      navClass.isActive
                        ? " text-primaryColor text-[16px] leading-7 font-[600]"
                        : "text-textColor text-[16px] leading-7 font-[500] hover:text-primaryColor"
                    }
                  >
                   <div onClick={toggleMenu}>{item.display}
                    </div> 
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>

          {/* --------------nav right---------------------------- */}
          <div className="flex items-center gap-4 ">
            {
              token && user  ?(
              <div>
              <Link 
              to=
              {`${
                role==='doctor' 
                ? "/doctors/profile/me"
                : "/users/profile/me"
                }`}
                >
              <figure className=" w-[35px] h-[35px] rounded-full">
                <img src={user?.photo}  className="w-full rounded-full" alt="" />
              </figure>
              {/* <h2>{user?.name}</h2> */}
              </Link>
            </div>
              )
            :(<Link to={"/login"}>
            <button className="bg-primaryColor py-2 px-6 text-white font-[600] h-[44px] flex justify-center rounded-[50px] ">Login</button>
            </Link>)

            }




            
            
            {/* <h1>{user?.name}</h1> */}





            <span className=" md:hidden" onClick={toggleMenu}>
              <FiMenu className="w-6 h-6 cursor-pointer" />
            </span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
