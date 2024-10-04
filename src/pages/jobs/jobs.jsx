import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import "./jobs.css"
import { IoIosSearch } from 'react-icons/io';
import { MdOutlineLocationOn } from 'react-icons/md';
import PopupModal from '../../components/popupModel/popupModel';
import toast from 'react-hot-toast';
import { useFormik } from 'formik';
import * as Yup from 'yup';
//slices-----------
import { fetchGetUser } from '../../redux/slices/getUserSlice';
import { fetchPostJob } from '../../redux/slices/postJobSlice';



const Jobs = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [activeJob, setActiveJob] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const [salaryType, setSalaryType] = useState("yearly")
  const userData = useSelector(state => state?.getUser?.user)


  const handlePostJob = () => {
    if (userData?.profile?.company) {
      setIsOpen(true)
    } else {
      toast.error("Please complete your company profile")
      setTimeout(() => {
        navigate("/profile")
      }, 2000)
    }
  }

  const jobFormik = useFormik({
    initialValues: {
      title: "",
      description: "",
      salary: "",
      location: "",
      experience: "",
      skills: "",
      jobType: "",
      qualification: "",
      address: "",
      postedBy: userData?._id,
      company: userData?.profile?.company
    },

    validationSchema: Yup.object({
      title: Yup.string().required("title is required"),
      description: Yup.string().required("description is required"),
      salary: Yup.string().required("salary is required"),
      location: Yup.string().required("location is required"),
      experience: Yup.string().required("experience is required"),
      skills: Yup.string().required("skills is required"),
      jobType: Yup.string().required("jobType is required"),
      qualification: Yup.string().required("qualification is required"),
      address: Yup.string().required("address is required"),
    }),


    onSubmit: (values) => {
      dispatch(fetchPostJob(values)).then((res) => {
        if (res?.payload?.success) {
          toast.success(res?.payload?.message)
          jobFormik.resetForm()
          setIsOpen(false)
          // navigate("/jobs")
          //here you need to fetch the jobs again to list the latest jobs
        } else {
          toast.error(res?.payload?.message)
        }
      })
    }
  })









  return (

    <div className='w-full '>
      {/* jobs page header  */}
      <div className={`w-full h-[70px] sticky top-0 bg-white flex items-center px-10 ${userData?.role === "recruiter" ? "justify-between" : "justify-center"} border shadow`}>

        {
          userData?.role === "recruiter" &&
          <div>
            <p className='mb-0 text-[18px] font-extrabold'>Posted Jobs (10)</p>
          </div>
        }


        {/* search container ------------------------------------------ */}
        <div className='bg-gray-200 flex items-center w-[500px] rounded-[40px] px-3 h-[40px]'>
          <div className='flex items-center gap-2 w-[70%] border-e border-gray-400 '>
            <IoIosSearch size={25} />
            <input type="text"
              placeholder={userData?.role === "recruiter" ? "Search Posted Jobs" : "Search your perfect jobs'"} className='outline-none h-[100%] w-[100%] bg-inherit ' />
          </div>
          <div className='flex gap-2 items-center'>
            <MdOutlineLocationOn size={25} />
            <input type="text" placeholder='Location' className=' w-[100%] h-[100%] outline-none bg-inherit ' />
          </div>
        </div>


        {userData?.role === "recruiter" &&
          <div>
            <button onClick={() => handlePostJob()} className="bg-[#1dd1a1] py-2 px-4 rounded text-white font-semibold hover:bg-[#10ac84] shadow ">
              Post New Job
            </button>
          </div>
        }
      </div>

      <div className="w-full h-[100vh] my-4 flex items-center justify-evenly">

        {/* Jobs listing container */}
        <div style={{}} className="w-[35%] h-full  p-4 overflow-y-auto  border-2 rounded-[8px] flex flex-col gap-2">
          {/* Job cards */}
          {Array.from({ length: 10 }, (_, index) => (
            <div key={index} className="border p-4  w-[100%] hover:bg-gray-100 rounded shadow cursor-pointer">
              <p className="mb-2 text-[14px]">Tata Consultancy Service</p>
              <p className="mb-0 font-bold">Data Analyst</p>
              <p className="mb-0 text-[14px]">Chennai</p>
              <div className="flex items-center justify-between">
                <p className="mb-0 font-bold text-gray-700">20T - 50T Monthly</p>
                <p className="mb-0  font-medium text-[14px]">30d+</p>
              </div>
            </div>
          ))}
          {/* Additional job listings here */}
        </div>

        {/* Jobs description container */}
        <div className="w-[55%] h-full border rounded ">
          <p>Tata Consultancy Service</p>
        </div>
      </div>







      {/* popup models ------------------------------------------------------------------------- */}

      <PopupModal isOpen={isOpen} size={true} setIsOpen={setIsOpen} name="Post New Job">

        <form className='h-[75vh] overflow-y-auto'>
          {/* Job Title */}
          <div className="my-4">
            <label htmlFor="jobTitle" className="block text-sm font-medium text-gray-700 mb-2">
              Job Title:
            </label>
            <input
              type="text"
              onChange={jobFormik.handleChange}
              values={jobFormik.values.title}
              id="jobTitle"
              name="title"
              placeholder="Job title"
              className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Description */}
          <div className="mb-4">
            <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
              Description:
            </label>
            <textarea
              id="description"
              onChange={jobFormik.handleChange}
              values={jobFormik.values.description}
              name="description"
              maxLength={500}
              placeholder="Job description"
              className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Experience */}
          <div className="mb-4">
            <label htmlFor="experience" className="block text-sm font-medium text-gray-700 mb-2">
              Experience:
            </label>
            <input
              type="text"
              id="experience"
              onChange={jobFormik.handleChange}
              values={jobFormik.values.experience}
              name="experience"
              placeholder="Experience"
              className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Skills */}
          <div className="mb-4">
            <label htmlFor="skills" className="block text-sm font-medium text-gray-700 mb-2">
              Skills:
            </label>
            <input
              type="text"
              id="skills"
              onChange={jobFormik.handleChange}
              values={jobFormik.values.skills}
              name="skills"
              placeholder="Skills"
              className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Job Location */}
          <div className="mb-4">
            <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-2">
              Job Location:
            </label>
            <input
              type="text"
              onChange={jobFormik.handleChange}
              values={jobFormik.values.location}
              id="location"
              name="location"
              placeholder="Location"
              className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Salary and Salary Type */}
          <div className="mb-4">
            <div className="flex ">
              <div className='w-full '>
                <label htmlFor="salary" className="block text-sm font-medium text-gray-700 mb-2">
                  Salary:
                </label>
                <div className='flex w-full gap-2 items-center'>
                  <input
                    type="text"
                    onChange={jobFormik.handleChange}
                    values={jobFormik.values.salary}
                    id="salary"
                    name="salary"
                    placeholder="Salary"
                    className="p-3 border w-[70%] border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <div className="flex items-center gap-2">
                    <input onChange={(e) => setSalaryType("yearly")} checked={salaryType === "yearly"} type="radio" id="year" className='' name="salaryType" />
                    <label htmlFor="year" className="text-[18px] cursor-pointer font-bold text-gray-700">
                      Yearly
                    </label>

                    <input onChange={(e) => setSalaryType("monthly")} checked={salaryType === "monthly"} className='ms-3' type="radio" id="month" name="salaryType" />
                    <label htmlFor="month" className="text-[18px] cursor-pointer font-bold text-gray-700">
                      Monthly
                    </label>
                  </div>
                </div>
              </div>


            </div>
          </div>

          {/* Job Type */}
          <div className="mb-4">
            <label htmlFor="jobType" className="block text-sm font-medium text-gray-700 mb-2">
              Job Type:
            </label>
            <input
              type="text"
              id="jobType"
              onChange={jobFormik.handleChange}
              values={jobFormik.values.jobType}
              name="jobType"
              placeholder="Job Type"
              className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Qualification */}
          <div className="mb-4">
            <label htmlFor="qualification" className="block text-sm font-medium text-gray-700 mb-2">
              Qualification:
            </label>
            <input
              type="text"
              onChange={jobFormik.handleChange}
              values={jobFormik.values.qualification}
              id="qualification"
              name="qualification"
              placeholder="Qualification"
              className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Address */}
          <div className="mb-4">
            <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-2">
              Address:
            </label>
            <textarea
              id="address"
              onChange={jobFormik.handleChange}
              values={jobFormik.values.address}
              name="address"
              maxLength={200}
              placeholder="Address"
              className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Submit Button */}
          <div className='flex items-center sticky bottom-0 bg-white rounded p-4 shadow justify-center gap-10'>

            <button onClick={() => setIsOpen(false)} className=" font-bold text-[18px] w-[20%] bg-gray-600 text-white p-3 rounded-lg shadow-md hover:bg-gray-700 transition  duration-300">
              Cancel
            </button>

            <button
              // type="submit"
              onClick={jobFormik.handleSubmit}
              className=" bg-[#1dd1a1] font-bold text-[18px]  w-[30%] text-white p-3 rounded-lg shadow-md hover:bg-[#10ac84] transition duration-300"
            >
              Submit
            </button>
          </div>
        </form>

      </PopupModal>

    </div >
  );
};

export default Jobs;
