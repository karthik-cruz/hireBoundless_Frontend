import React, { useEffect, useState } from 'react'
import { useFormik } from 'formik';
import * as Yup from 'yup';
import toast from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
//importing Redux slices
import { fetchSignupUser } from '../../redux/slices/signupUserSlice';

const Signup = () => {

    const [role, setRole] = useState('jobSeeker')
    const dispatch = useDispatch()

    const formik = useFormik({
        initialValues: {
            name: "",
            email: '',
            password: '',
            role: role
        },

        validationSchema: Yup.object({
            email: Yup.string()
                .email('Invalid email address')
                .required('Required'),
            password: Yup.string()
                .required('Required'),
            name: Yup.string()
                .required('Required'),
            role: Yup.string()
                .required('Required'),
        }),

        onSubmit: (values) => {
            dispatch(fetchSignupUser(values)).then((response) => {
                console.log(response)
                if (response?.payload?.success) {
                    toast.success(response?.payload?.message)
                } else {
                    toast.error(response?.payload?.message)
                }
            })
        }
    })


    return (
        <div>
            <h1>Signup page</h1>
            <form onSubmit={formik.handleSubmit}>
                <label htmlFor="name">Name :</label>
                <input id="name" name='name' type="text" placeholder='Name' onChange={formik.handleChange} value={formik.values.name} />
                <label htmlFor="email">Email :</label>
                <input id="email" name='email' type="text" placeholder='Email' onChange={formik.handleChange} value={formik.values.email} />
                <label htmlFor="password">Password :</label>
                <input id="password" name='password' type="password" placeholder='Password' onChange={formik.handleChange} value={formik.values.password} />
                <label htmlFor="">Signup as :</label>
                <input name='role' onClick={() => setRole('jobSeeker')} id='jobseeker' type="radio" /> <label htmlFor="jobseeker">JobSeeker</label>
                <input name='role' onClick={() => setRole('recruiter')} id='recruiter' type="radio" /> <label htmlFor="recruiter">Recruiter/Employer</label>

                <button type='submit'>Submit</button>
            </form>

        </div>
    )
}

export default Signup
