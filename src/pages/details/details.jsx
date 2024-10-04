// import React, { useState, useEffect } from 'react'
// import { useDispatch, useSelector } from 'react-redux'
// import { useNavigate } from 'react-router-dom'
// import { useFormik } from 'formik'
// import * as Yup from 'yup'
// import { FaArrowRight } from "react-icons/fa";
// import { useDropzone } from 'react-dropzone'
// import { IoIosCloudUpload } from "react-icons/io";
// //slices ---------------------
// import { fetchCompanyCreate } from '../../redux/slices/companyCreateSlice'
// import { fetchProfileCreate } from '../../redux/slices/profileCreateSlice'
// import toast from 'react-hot-toast';


// const Details = () => {

//   const [user_ID, setUser_ID] = useState(null)
//   useEffect(() => {
//     const id = localStorage.getItem('user')
//     if (!id) {
//       navigate("/login")
//     } else {
//       setUser_ID(id)
//     }
//   }, [])



//   const userData = useSelector(state => state?.getUser?.user)
//   const dispatch = useDispatch()
//   const [loading, setLoading] = useState(false)
//   const navigate = useNavigate()


//   const maxSize = 5242880; // 5MB in bytes
//   const {
//     getRootProps,
//     getInputProps,
//     isDragActive,
//     fileRejections,
//     acceptedFiles
//   } = useDropzone({
//     onDrop: (acceptedFiles) => {
//       // Using setFieldValue to update Formik field when file is dropped
//       if (acceptedFiles.length > 0) {
//         setFieldValue("resume", acceptedFiles[0]);  // Set the first file in Formik's `resume` field
//       }
//     },
//     accept: {
//       'application/pdf': ['.pdf'], // Accept only PDF files
//       'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx'] // Accept only .docx files
//     },
//     maxSize: maxSize, // Set the maximum file size (5MB)
//     maxFiles: 1,
//     multiple: false
//   });








//   //formik for upload job seeker details---------
//   const formikJobSeeker = useFormik({
//     initialValues: {
//       resume: "",   // This will hold the resume file
//       experience: "",
//     },
//     validationSchema: Yup.object({
//       resume: Yup.mixed().required("A resume is required"),
//       experience: Yup.string().required("Experience is required"),
//     }),
//     onSubmit: (values) => {
//       setLoading(true)

//       const { resume } = values
//       if (resume) {
//         const formData = new FormData()
//         formData.append("resume", resume)
//         formData.append("experience", values.experience)
//         formData.append("userId", user_ID)
//         dispatch(fetchProfileCreate(formData)).then((response) => {
//           if (response?.payload?.success) {
//             toast.success(response?.payload?.message)
//             setTimeout(() => {
//               navigate("/")
//             }, 2000)
//             setLoading(false)
//             formikJobSeeker.resetForm()
//           } else {
//             toast.error(response?.payload?.message)
//             setLoading(false)
//           }
//         }
//         )
//       }
//     },
//   });

//   const { setFieldValue } = formikJobSeeker;

//   const handleSubmit = () => {
//     if (userData?.role === "recruiter") {
//       formik.handleSubmit()
//     } else {
//       formikJobSeeker.handleSubmit()
//     }
//   }




//   const handleSkip = () => {
//     localStorage.setItem("skipped", true)
//     navigate('/')
//   }

//   return (
//     <div className='w-[100%] h-[100vh] bg-[#1dd1a1] flex items-center justify-center' >


//       <div class="bg-gray-100 w-[50%] h-[90%] shadow-2xl flex items-center p-2 rounded-lg justify-center ">
//         {/* company create form */}
//         <form className="bg-white shadow-lg rounded-lg p-8  w-full">
//           {userData?.role === 'recruiter' ?
//             <div>

//               <h2 class="text-2xl font-extrabold text-center mb-6 text-gray-800">Create company details</h2>

//               <div class="mb-4">
//                 <label for="name" class="block text-gray-700 font-bold mb-2">Company Name:</label>
//                 <input value={formik.values.name} onChange={formik.handleChange} type="text" id="name" name="name" class="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-emerald-300" placeholder="Enter company name" />
//               </div>

//               <div class="mb-4">
//                 <label for="industry" class="block text-gray-700 font-bold mb-2">Industry:</label>
//                 <select value={formik.values.industry} onChange={formik.handleChange} id="industry" name="industry" class="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-emerald-300">
//                   <option value="" disabled selected>Select industry</option>
//                   <option value="agriculture">Agriculture</option>
//                   <option value="automobile">Automobile</option>
//                   <option value="banking">Banking</option>
//                   <option value="construction">Construction</option>
//                   <option value="education">Education</option>
//                   <option value="energy">Energy</option>
//                   <option value="fashion">Fashion</option>
//                   <option value="finance">Finance</option>
//                   <option value="healthcare">Healthcare</option>
//                   <option value="information_technology">Information Technology (IT)</option>
//                   <option value="manufacturing">Manufacturing</option>
//                   <option value="media">Media</option>
//                   <option value="mining">Mining</option>
//                   <option value="pharmaceutical">Pharmaceutical</option>
//                   <option value="real_estate">Real Estate</option>
//                   <option value="retail">Retail</option>
//                   <option value="telecommunications">Telecommunications</option>
//                   <option value="textile">Textile</option>
//                   <option value="tourism">Tourism</option>
//                   <option value="transportation">Transportation</option>
//                 </select>
//               </div>

//               <div class="mb-4">
//                 <label for="size" class="block text-gray-700 font-bold mb-2">Company Size:</label>
//                 <select value={formik.values.size} onChange={formik.handleChange} id="size" name="size" class="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-emerald-300">
//                   <option value="" disabled selected>Select company size</option>
//                   <option value="1-10">1-10 employees</option>
//                   <option value="11-50">11-50 employees</option>
//                   <option value="51-100">51-100 employees</option>
//                   <option value="100+">100+ employees</option>
//                 </select>
//               </div>

//               <div class="mb-4">
//                 <label for="link" class="block text-gray-700 font-bold mb-2">Website URL:</label>
//                 <input value={formik.values.link} onChange={formik.handleChange} type="url" id="link" name="link" class="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-emerald-300" placeholder="https://example.com" />
//               </div>

//               <div class="mb-4">
//                 <label for="location" class="block text-gray-700 font-bold mb-2">Location:</label>
//                 <div className="flex items-center gap-2">
//                   <input value={formik.values.city} onChange={formik.handleChange} type="text" id="location" name="city" class="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-emerald-300" placeholder="Enter City" />
//                   <input value={formik.values.state} onChange={formik.handleChange} type="text" id="" name="state" class="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-emerald-300" placeholder="Enter State" />
//                 </div>
//               </div>



//             </div>

//             :

//             <div className="w-full flex items-center justify-center flex-col">
//               <h2 class="text-2xl font-extrabold text-center mb-6 text-gray-800">Update Your Profile</h2>

//               <p className="text-gray-500 text-[18px] mb-2 font-medium">Upload Resume :</p>
//               <div  {...getRootProps({ className: 'dropzone cursor-pointer bg-red-50 px-3 py-5 w-[80%] border-2 border-gray-500 border-dashed' })}>
//                 <input  {...getInputProps()} name='resume' />
//                 {isDragActive ? (
//                   <div className='w-full flex flex-col items-center'>
//                     <p className="text-gray-500 text-[18px] mb-2 font-medium">Drop the file here....</p>
//                     <IoIosCloudUpload size={45} className='text-[#1dd1a1]' />
//                     <p className="mb-0 text-[#1dd1a1] font-medium">Drop the file </p>
//                   </div>
//                 ) : (
//                   <div className='w-full flex flex-col items-center'>
//                     <p className="text-gray-500 text-[18px] mb-2 font-medium">Drag & drop some files here, or click to select files</p>
//                     <IoIosCloudUpload size={45} className='text-[#1dd1a1]' />
//                     <p className="mb-0 text-[#1dd1a1] font-medium">Upload</p>
//                   </div>
//                 )}

//                 {fileRejections.length > 0 && (
//                   <div>
//                     <h4 className='text-red-500'>File size exceeds the 5MB limit</h4>
//                   </div>
//                 )}

//                 {acceptedFiles.length > 0 && (
//                   <div>
//                     <h4 className="font-extrabold">Accepted files:</h4>
//                     <ul>
//                       {acceptedFiles.map(file => (
//                         <li className="text-blue-500 text-[18px] font-semibold underline bg-blue-50 border-1 border-blue-400 py-2" key={file.path}>
//                           {file.path?.slice(0, 20)} - {file.size} bytes
//                         </li>
//                       ))}
//                     </ul>
//                   </div>
//                 )}
//               </div>
//               <div class="my-4 w-full px-5">
//                 <label for="experience" class="block text-gray-700 font-bold mb-2">Experience:</label>
//                 <select value={formikJobSeeker.values.experience} onChange={formikJobSeeker.handleChange} id="experience" name="experience" class="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-emerald-300">
//                   <option value="" disabled selected>Select Experience</option>
//                   <option value="fresher">Fresher</option>
//                   <option value="0-1">0-1 year</option>
//                   <option value="1-2">1-2 years</option>
//                   <option value="2-5">2-5 years</option>
//                   <option value="5+">5+ years</option>
//                 </select>
//               </div>
//             </div>

//           }


//           <div className='w-full flex items-center justify-between'>
//             <div onClick={() => handleSubmit()} className="w-[55%] mx-auto  gap-2 bg-[#1dd1a1] cursor-pointer text-white flex items-center justify-center py-3 px-4 rounded-md hover:bg-[#10a37f]">
//               <p className="mb-0 font-bold text-[18px]">Continue</p>
//               {/* <FaArrowRight size={20} /> */}
//             </div>

//             <div onClick={() => handleSkip()} className="w-[30%] border border-blue-600 mx-auto gap-2 text-white hover:bg-white hover:text-blue-600 bg-blue-600 underline  cursor-pointer flex items-center justify-center py-[11px] px-4 rounded-md">
//               <p className="mb-0 font-bold  text-[18px]">Skip Now</p>
//               <FaArrowRight size={20} />
//             </div>

//           </div>

//         </form>

//       </div>

//     </div >
//   )
// }

// export default Details
