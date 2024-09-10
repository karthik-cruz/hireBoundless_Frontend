import React from 'react'
import { useFormik } from 'formik';
import * as Yup from 'yup';
import toast from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
//importing Redux slices
import { fetchLoginUser } from "../../redux/slices/loginUserSlice"

const Login = () => {




    const dispatch = useDispatch()

    const formik = useFormik({
        initialValues: {
            email: '',
            password: ''
        },

        validationSchema: Yup.object({
            email: Yup.string()
                .email('Invalid email address')
                .required('Required'),
            password: Yup.string()
                .required('Required'),
        }),

        onSubmit: (values) => {
            dispatch(fetchLoginUser(values)).then((response) => {
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
            <h1>Login Page</h1>
            <form onSubmit={formik.handleSubmit}>
                <label htmlFor="email">Email :</label>
                <input id="email" name='email' type="text" placeholder='Email' onChange={formik.handleChange} value={formik.values.email} />
                <label htmlFor="password">Password</label>
                <input id="password" name='password' type="password" placeholder='Password' onChange={formik.handleChange} value={formik.values.password} />
                <button type='submit'>Submit</button>
            </form>

        </div>
    )
}

export default Login
