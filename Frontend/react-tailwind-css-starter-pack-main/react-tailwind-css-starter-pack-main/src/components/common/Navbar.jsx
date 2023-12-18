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
import { setLoading } from '../../slices/authSlice';
import { logout } from '../../services/operations/auth';



const Navbar = () => {
  const {token} = useSelector((state) => state.auth);
  const {user} = useSelector((state) => state.profile);
  const {totalItems} = useSelector((state) => state.cart)
  const [subLinks, setSubLinks] = useState([]);
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);


  const matchRoute = (route) => {
      return matchPath(route, location.pathname);
  }


  if((user && !token) || (token && !user))
  {
    dispatch(logout);
  }
  const fetchSubLinks = async() => {
    setLoading(true);
    try
    {
      const result = await apiConnector("GET", categories.CATEGORIES_API);
      if(result)
      {
        const categories = result?.data?.categories.filter((category) => category?.courses?.length > 0);
        setSubLinks(categories)
      }
    } catch(e)
    {
      console.log(e);
      console.log("Couldn't fetch the category list");
    }
    setLoading(false);
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
              NavbarLinks.map((link, index) => 
              {
                return link.title !== "Catalog" ? 
                      <NavLink key={index} className={`${matchRoute(link?.path) ? " text-yellow-50" : " text-richblack-200"}`} to={link.path}>{link.title}</NavLink> :
                      <div key={index} className={`flex flex-row relative items-center text-richblack-200 cursor-pointer group`}>
                        <p>{link.title}</p>
                        <RiArrowDropDownLine />
                        
                        {
                          !loading && <div>
                            <div className=' invisible absolute left-[50%] top-[90%] rotate-[45deg] translate-x-[40 %]  flex flex-col rounded-md bg-richblack-5 p-4 text-richblack-900 opacity-0 group-hover:visible transition-none group-hover:opacity-100 w-[30px] h-[30px] z-[5]'></div>

                            <div className=' invisible absolute left-[50%] top-[50%] -translate-x-[50%] translate-y-[20%]  flex flex-col items-start rounded-md bg-richblack-5 text-richblack-900 opacity-0 transition-all duration-200 group-hover:visible group-hover:opacity-100 min-w-[150px] w-fit h-fit z-[100]'>
                              {
                                subLinks && subLinks.length == 0 ? <p className=' px-2 py-3 text-richblack-300'>Categories are yet to be created</p> : subLinks.map((link) => <Link key={link?._id} className=' text-richblack-900 font-semibold font-mono capitalize w-[100%] px-3 py-2 hover:bg-richblack-300 transition-all duration-200'  to={`/catalog/${link?.name.split(" ").join("-").toLowerCase()}`}>{link?.name}</Link>)
                              }
                            </div>
                          </div>
                        }




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
                    (totalItems > 0) && <p className=' absolute -top-2 -right-2 text-white text-[11px]'>{totalItems}</p>
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