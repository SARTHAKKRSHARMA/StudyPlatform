import React, { useEffect, useState } from 'react'
import { NavbarLinks } from '../../data/navbar-links'
import { Link, NavLink, matchPath, useLocation, useNavigate } from 'react-router-dom'
import Logo from "../../assets/Logo/Logo-Full-Light.png"
import { RiArrowDropDownLine } from 'react-icons/ri';
import { AiOutlineShoppingCart } from 'react-icons/ai';
import ProfileDropDown from '../core/authentication/ProfileDropDown';
import {useSelector, useDispatch} from "react-redux"
import { apiConnector } from '../../services/apiConnector';
import { categories } from '../../services/apis';
import { getUserFromToken } from '../../services/operations/auth';



const Navbar = () => {
  const {token, loading} = useSelector((state) => state.auth);
  const {user} = useSelector((state) => state.profile);
  const {totalItems} = useSelector((state) => state.cart)
  const [subLinks, setSubLinks] = useState([]);
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();


  const matchRoute = (route) => {
      return matchPath(route, location.pathname);
  }

  const fetchSubLinks = async() => {
    try
    {
      const result = await apiConnector("GET", categories.CATEGORIES_API);
      setSubLinks(result?.data?.categories)
    } catch(e)
    {
      console.log("Couldn't fetch the category list");
    }
  }

  useEffect(() => {
      fetchSubLinks();
  }, []);


  return (
    <div>
    {
    <div className=' h-14 border-richblack-700 border-b-[1px]'>
        <div className=' w-11/12  max-w-maxContent mx-auto flex items-center justify-between h-full'>
          <Link to={"/"}>
            <img src={Logo} alt='logo' loading='lazy' height={32} width={160} />
          </Link>

          <div className=' flex flex-row justify-between items-center gap-3'>
            {
              NavbarLinks.map((link, index) => {
                return link.title !== "Catalog" ? 
                      <NavLink key={index} className={`${matchRoute(link?.path) ? " text-yellow-50" : " text-richblack-200"}`} to={link.path}>{link.title}</NavLink> :
                      <div key={index} className={`flex flex-row relative items-center text-richblack-200 cursor-pointer group`}>
                        <p>{link.title}</p>
                        <RiArrowDropDownLine />

                        <div className=' invisible absolute left-[50%] top-[90%] rotate-[45deg] translate-x-[40 %]  flex flex-col rounded-md bg-richblack-5 p-4 text-richblack-900 opacity-0 group-hover:visible transition-none group-hover:opacity-100 w-[30px] h-[30px] z-[5]'></div>

                        <div className=' invisible absolute left-[50%] top-[50%] -translate-x-[50%] translate-y-[20%]  flex flex-col items-center rounded-md bg-richblack-5 p-4 text-richblack-900 opacity-0 transition-all duration-200 group-hover:visible group-hover:opacity-100 w-[200px] h-[100px] z-[100]'>
                          {
                            subLinks && subLinks.length > 0 && subLinks.map((link) => <Link key={link?._id}  to={`/catalog/${link?.name}`}>{link?.name}</Link>)
                          }
                        </div>



                      </div> 
                }
              )
            }
          </div>

          <div className=' flex flex-row gap-x-4 items-center'>
            {
              user && user?.accountType !== "Instructor" && (
                <Link to={"/dashboard/cart"} className='relative'>
                  <AiOutlineShoppingCart className=' text-white text-[1.3rem]' />
                  {
                    (totalItems > 0) && <p className=' absolute -top-2 -right-3 text-white text-[11px]'>{totalItems}</p>
                  }
                </Link>
              )
            }

            {
              !token && (
                <Link to={"/login"}>
                  <button className='  text-richblack-300  rounded-md px-3 py-1 border-richblack-200 border-2'>Login</button>
                </Link>
              )
            }

            {
              !token && (
                <Link to={"/signup"}>
                  <button className='  text-richblack-300  rounded-md px-3 py-1 border-richblack-200 border-2'>Sign Up</button>
                </Link>
              )
            }

            {
              token && user &&  <ProfileDropDown />
            }
          </div>
        </div>
    </div>
  }
    </div>

  ) 
}

export default  Navbar