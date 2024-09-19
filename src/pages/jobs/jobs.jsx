import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
// import { Outlet } from 'react-router-dom'
import { fetchGetUser } from '../../redux/slices/getUserSlice'
import { useDispatch, useSelector } from 'react-redux'

const Home = () => {

  const navigate = useNavigate()
  const dispatch = useDispatch()

  useEffect(() => {
    const token = localStorage.getItem('token')
    const user = localStorage.getItem('user')
    const skipped = localStorage.getItem('skipped')
    if (!token && !user) {
      navigate('/login')
    } else {
      dispatch(fetchGetUser(user)).then((response) => {
        const userData = response?.payload?.user
        if (!userData?.profile && !skipped) {
          if (userData?.role === 'recruiter' || userData?.role === 'jobSeeker') {
            navigate('/details')
          }
        }
      })
    }
  }, [])



  return (
    <div>
      This is Jobs page
    </div>
  )
}

export default Home
