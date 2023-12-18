
import './request.css'
import React, { useContext, useEffect } from 'react'
import { useState } from 'react';
import { AppContext } from '../../App';
import { ToastContainer, toast } from 'react-toastify';

import { Link, useParams } from 'react-router-dom';
const RequestCard = () => {
    const {route ,setLoader }=useContext(AppContext)
    const [user,setUser]=useState({})
    const [employee,setEmployee]=useState({})
    const [request,setRequest]=useState({})
    const param = useParams()

      useEffect(()=>{
        fetch(`${route}/${param.type}/${param.id}`,{
            headers :{
            Authorization :`Bearer ${sessionStorage.getItem("token")}`
            }
          })
          .then(res=>res.json())
          .then(data=>{
     setEmployee(data.data.Employee)
     setUser(data.data.UserDetails)
        setRequest(data.data)
  console.log(data)
          })
      },[])
  return (
    <div className="request-card">
<div className="container">
    <div className="details">
    <h2>Request Details</h2>
    {param.type === "bechlor" ?     <div className="req-details">
        <div>Country Of Study : {request.CountryOfStudy}</div>
        <div> Required Specialization : {request.RequiredSpecialization}</div>
        <a href={`${request.CV}`} target='_blank'>cv</a>
        <a href={`${request.HighSchoolCertificate}`} target='_blank'>High School Certificate</a>
        <a href={`${request.Passport}`} target='_blank'>Passport</a>
        <a href={`${request.PersonalPicture}`} target='_blank'>Personal Picture</a>
        <a href={`${request.PersonalStatement}`} target='_blank'>Personal Statement</a>
      
    </div> : null}

        <h2>user details</h2>
        <div className="user-details">
            <div className="name">User Name : {user.username}</div>
            <div className="name">User Email : {user.email}</div>
            <div className="name">Request Type : {user.type}</div>
        </div>
        <h2>Employee details</h2>
        <div className="user-details">
            <div>Employee Name : {employee.username}</div>
            <div>Employee Email : {employee.email}</div>
        </div>
       
        
    </div>
</div>
    </div>
  )
}

export default RequestCard