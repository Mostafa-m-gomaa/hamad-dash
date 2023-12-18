import React, { useContext, useEffect } from 'react'
import { useState } from 'react';
import { AppContext } from '../../App';
import { ToastContainer, toast } from 'react-toastify';
import './requests.css'
import { Link } from 'react-router-dom';

const Requests = () => {
    const {route ,setLoader }=useContext(AppContext)
    const [master,setMaster]=useState([])
    const [phd,setPhd]=useState([]) 
    const [bechlor,setBechlor]=useState([])
    const [employees,setEmployees]=useState([])
    const [requestId,setRequestId]=useState("")
    const [userId,setUserId]=useState("")
    const [empId,setEmpId]=useState("")
    const [showEmp,setShowEmp]=useState(false)
    const [refresh ,setRefresh]=useState(false)

const clickAssign =(req,user)=>{
    setRequestId(req)
    setUserId(user)
    setShowEmp(true)
    console.log(req)
    console.log(user)
}
const assignEmp =(id)=>{
setEmpId(id)
}
const assign =()=>{
    setLoader(true)
    setShowEmp(false)
    console.log(requestId)
    console.log(empId)
    console.log(userId)
    fetch(`${route}/crm/assign`,{
        method: 'PUT',
        body: JSON.stringify({
            "requestId":requestId,
            "employeeId":empId,
            "userId":userId
        }),
        headers:{
          "Authorization" :`Bearer ${sessionStorage.getItem("token")}` ,
          'Content-Type': 'application/json'
        }
      })
      .then(res=>res.json())
      .then(data=>{
          console.log(data)
            setLoader(false)
          if(data.status === "success"){
              toast.success("Assigned Successfully")
                setRefresh(!refresh)
          }
      })

}
const acceptRequest =(type,id)=>{
    setLoader(true)
    fetch(`${route}/${type}/${id}/eligibility`,{
        method: 'PUT',
      headers:{
        Authorization :`Bearer ${sessionStorage.getItem("token")}`,
        'Content-Type': 'application/json'
      } ,
      body:JSON.stringify({
        "Eligibility":"eligible"
      })
    })
    .then(res=>res.json())
    .then(data=>{
        setLoader(false)
        console.log(data)
        if(data.status === "fail"){
            toast.error(data.message)
           
        }
        else if(data.message === "Request status updated successfully"){
toast.success("Request status updated successfully")
setRefresh(!refresh)
        }
    })
    }

    useEffect(()=>{
        fetch(`${route}/bechlor`,{
          headers :{
          Authorization :`Bearer ${sessionStorage.getItem("token")}`
          }
        })
        .then(res=>res.json())
        .then(data=>{
    console.log(data)
    if(data.data){
        setBechlor(data.data)
    }
        })
        fetch(`${route}/master`,{
          headers :{
          Authorization :`Bearer ${sessionStorage.getItem("token")}`
          }
        })
        .then(res=>res.json())
        .then(data=>{
    console.log(data)
    if(data.data){
        setMaster(data.data)
    }
        })
        fetch(`${route}/phd`,{
          headers :{
          Authorization :`Bearer ${sessionStorage.getItem("token")}`
          }
        })
        .then(res=>res.json())
        .then(data=>{
    console.log(data)
    if(data.data){
        setPhd(data.data)
    }
        })
      },[refresh])
      useEffect(()=>{
        fetch(`${route}/users/employees`,{
            headers :{
            Authorization :`Bearer ${sessionStorage.getItem("token")}`
            }
          })
          .then(res=>res.json())
          .then(data=>{
     
      if(data.data){
          setEmployees(data.data)
      }
          })
      },[])
  return (
    <div className="requests">
  {showEmp ?      <div className="emps">
            <h2>Choose Employee</h2>
            {employees.map((item,index)=>{
                return(
                    <div className= {item.id === empId ?"emp emp-active" : "emp"}  onClick={()=>assignEmp(item.id)} key={index}>
                        <div>{item.username}</div>
                        <div>{item.email}</div>
                      
                    </div>
                )
            })}
             <button onClick={assign}>Assign</button>
        </div> : null}
        <h1>All Requests</h1>
        <div className="bachelor">
            <h2>bachelor</h2>
            <div className="req-container">

            {bechlor.map((item,index)=>{
                return(
                    <div className="request" key={index}>
                        <h2>request {index+1}</h2>
                 <div>state : {item.Eligibility}</div>
                 <div>current Step : {item.currentStep}</div>
                 {item.employeeId ? <div> request assigned </div> : <div> request not assigned </div> }

                 {item.Eligibility === "eligible" ? null:                  <button onClick={()=>acceptRequest('bechlor',item.id)}>Accept</button>}
                 <Link to={`/request/${"bechlor"}/${item.id}`}>view request </Link>
                 {item.Eligibility === "pending" ? null : <button onClick={()=>clickAssign(item.id,item.UserId)}>Assign to emp</button>}
                 
                    </div>
                )
            })}
            </div>
            
        </div>
        <div className="master">
            <h2>master</h2>
            <div className="req-container">

            {master.map((item,index)=>{
                return(
    //                 <div className="request" key={index}>
    //   <div>state : {item.Eligibility}</div>
    //              <div>current Step : {item.currentStep}</div>
              
    //              <div>employee Id : {item.employeeId}</div>
    //              <Link to={`/reques/${item.id}`}>view request </Link>
    //              {item.employeeId ? null : <button onClick={()=>clickAssign(item.id,item.UserId)}>Assign to emp</button>}
    //                 </div>
    <div className="request" key={index}>
    <h2>request {index+1}</h2>
<div>state : {item.Eligibility}</div>
<div>current Step : {item.currentStep}</div>
{item.employeeId ? <div> request assigned </div> : <div> request not assigned </div> }

{item.Eligibility === "eligible" ? null:<button onClick={()=>acceptRequest('master',item.id)}>Accept</button>}
<Link to={`/request/${"master"}/${item.id}`}>view request </Link>
{item.Eligibility === "pending" ? null : <button onClick={()=>clickAssign(item.id,item.UserId)}>Assign to emp</button>}

</div>
                )
            })}
            </div>

        </div>
        <div className="phd">
            <h2>phd</h2>
            <div className="req-container">
            </div>
            {phd.map((item,index)=>{
                return(
            //         <div className="request" key={index}>
            //   <div>state : {item.Eligibility}</div>
            //      <div>current Step : {item.currentStep}</div>
            
            //      <div>employee Id : {item.employeeId}</div>
            //      <Link to={`/reques/${item.id}`}>view request </Link>
            //      {item.employeeId ? null : <button onClick={()=>clickAssign(item.id,item.UserId)}>Assign to emp</button>}
            //         </div>
            <div className="request" key={index}>
            <h2>request {index+1}</h2>
     <div>state : {item.Eligibility}</div>
     <div>current Step : {item.currentStep}</div>
     {item.employeeId ? <div> request assigned </div> : <div> request not assigned </div> }

     {item.Eligibility === "eligible" ? null:                  <button onClick={()=>acceptRequest('phd',item.id)}>Accept</button>}
     <Link to={`/request/${"phd"}/${item.id}`}>view request </Link>
     {item.Eligibility === "pending" ? null : <button onClick={()=>clickAssign(item.id,item.UserId)}>Assign to emp</button>}
     
        </div>
                )
            })}
            
                
        </div>
    </div>
  )
}

export default Requests