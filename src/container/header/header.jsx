import React from 'react'
import { IoLogoAmplify } from 'react-icons/io5'
import NavTabs from '../../components/navTabs/navTabs'
import { IoIosSearch } from "react-icons/io";
import { MdOutlineLocationOn } from "react-icons/md";
import { IoNotifications } from "react-icons/io5";
import { FaUserCircle } from "react-icons/fa";




const Header = () => {



    return (
        <div className='shadow  px-6 h-[70px] flex justify-between items-center'>

            <div className='flex items-center cursor-pointer gap-2'>
                <IoLogoAmplify color='#1dd1a1' size={45} />
                <p className="m-0 font-extrabold text-[30px]">HireBoundless</p>
            </div>



            {/* search container ------------------------------------------ */}
            <div className='bg-gray-200 flex items-center w-[500px] rounded-[40px] px-3 h-[40px]'>
                <div className='flex items-center gap-2 w-[70%] h-full border-e border-gray-400 '>
                    <IoIosSearch size={25} />
                    <input type="text" placeholder='Search Jobs' className='outline-none h-[100%] w-[100%] bg-inherit ' />
                </div>
                <div className='flex gap-2 items-center'>
                    <MdOutlineLocationOn size={25} />
                    <input type="text" placeholder='Location' className=' w-[100%] h-[100%] outline-none bg-inherit ' />
                </div>
            </div>

            {/* navTabs ----------------------------------------------------------- */}
            <NavTabs />


            <div className='flex items-center gap-8'>
                <IoNotifications size={25} className='hover:text-[#197b66] shadow rounded cursor-pointer text-[#10ac84]' />
                <FaUserCircle size={25} className='hover:text-[#197b66] shadow rounded cursor-pointer text-[#10ac84]' />
            </div>




        </div>
    )
}

export default Header