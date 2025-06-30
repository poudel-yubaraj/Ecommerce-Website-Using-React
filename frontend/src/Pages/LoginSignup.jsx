import React, { useState } from "react";
import  './CSS/LoginSignup.css'
const LoginSignup=()=>{
    const [state, setState]=useState("Login");
    const[formdata,setFormData]=useState({
        username:"",
        password:"",
        email:""
    })
    const changeHandler=(e)=>{
        setFormData({...formdata,[e.target.name]:e.target.value})
    }
    const login=async()=>{
        console.log("login function executed",formdata);
        let responseData;
        await fetch("http://localhost:5000/user/login",{
            method:'POST',
            headers:{
              Accept:'application/form-data',
              'Content-Type':'application/json'  
            },
            body:JSON.stringify(formdata),
        }).then((res)=>res.json()).then((data)=>responseData=data)
        if(responseData.success){
            localStorage.setItem('auth-token',responseData.token);
            window.location.replace("/");
        }else{
            alert(responseData.errors);
        }
    }
    const signUp=async()=>{
        console.log("signUp function executed",formdata);
        let responseData;
        await fetch("http://localhost:5000/user/signup",{
            method:'POST',
            headers:{
              Accept:'application/form-data',
              'Content-Type':'application/json'  
            },
            body:JSON.stringify(formdata),
        }).then((res)=>res.json()).then((data)=>responseData=data)
        if(responseData.success){
            localStorage.setItem('auth-token',responseData.token);
            window.location.replace("/");
        }else{
            alert(responseData.errors);
        }
    }
    return(
        <div className="loginsignup">
            <div className="loginsignup-container">
                <h1>{state}</h1>
                <div className="loginsignup-fields">
                 {state=="Sign Up"?<input name="username" value={formdata.username} onChange={changeHandler} type="text" placeholder="Your Name" />:<></>}   
                    <input type="email" name="email" value={formdata.email} onChange={changeHandler} placeholder=" Email Address" />
                    <input type="password" name="password" value={formdata.password} onChange={changeHandler} placeholder="Password" />
                </div>
                <button onClick={()=>{state=="Login"?login():signUp()}}>Continue</button>
                {state=="Sign Up"?
                <p className="loginsignup-login">Already have an account? <span onClick={()=>{setState("Login")}}>Login here</span></p>
                :<p className="loginsignup-login">Create an account? <span onClick={()=>setState("Sign Up")}>Click here</span></p>
            }
                
                

                <div className="loginsignup-agree">
                    <input type="checkbox" name="" id="" />
                    <p>By continuing i agree to the terms of use and  privacy policy</p>
                </div>
            </div>
        </div>
    )
}
export default LoginSignup