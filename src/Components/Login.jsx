import { useState,useContext, useEffect } from "react"
import { UserContext } from "../contexts/UserContext";
import { Link,useNavigate } from "react-router-dom"

export default function Login()
{


    const loggedData=useContext(UserContext);

    const navigate=useNavigate();

   const [userCreds,setUserCreds]=useState({
    email:"",
    password:""
   })

   const [message,setMessage]=useState({
    type:"invisible-msg",
    text:"dummy msg"
   })

  
  function handleInput(event)
  {
    setUserCreds((prevState)=>{
        return {...prevState,[event.target.name]:event.target.value}
    })
  }

  function handleSubmit(event)
  {
    event.preventDefault();
    

    fetch("http://localhost:8000/login",{
        method:"POST",
        body:JSON.stringify(userCreds),
        headers:{
            "Content-Type":"application/json"
        }
    })
    .then((response)=>{
        
        if(response.status===404)
        {
            setMessage({type:"error",text:"username or email does not exist"})
        }
        else if(response.status===403)
        {
            setMessage({type:"error",text:"Incorrect password"})
        }
      
        setTimeout(()=>{
            setMessage({type:"invisible-msg",text:"dummy msg"})
        },5000)

        return response.json();
       
    })
    .then((data)=>{

        console.log(data);
        if(data.token!==undefined)
        {
            localStorage.setItem("nutrify-user",JSON.stringify(data));

            loggedData.setLoggedUser(data);


            navigate("/track");
        }
        
    })
    .catch((err)=>{
        console.log(err);
    })
  }

    return (
        <section className="container login-box">
            <div className="bg-img">

            <form className="form" onSubmit={handleSubmit}>
                <h1>Login to fitness</h1>
               
                <input className="inp" required type="email" placeholder="Enter Email" name="email" onChange={handleInput} value={userCreds.email}/>
                <input className="inp" required maxLength={8} type="password" placeholder="Enter Password" name="password" onChange={handleInput} value={userCreds.password}/>
                

                <button className="btn">Login </button>

                <p>Not Registered? <Link to="/register">Create an Account</Link></p>

                <p className={message.type}>{message.text}</p>

            </form>
            </div>
            
        </section>
    )
}