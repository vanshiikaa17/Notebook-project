import React, {useState} from 'react'
import { useNavigate } from 'react-router-dom'

export const Login = (props) => {
    const [creds, setcreds] = useState({email:"", password:""})
    const [pw, setpassword] = useState(false);
    let nav=useNavigate();
    const {showAlert}=props;

    const toggleButton=(e)=>{
      e.preventDefault();

      setpassword(prev=>!prev);
    }
    const handleSubmit= async(e)=>{
        e.preventDefault();

        const response=await fetch(`http://localhost:5000/api/auth/loginuser`, {
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({email:creds.email, password:creds.password})
        });
        const json=await response.json();
        if(json.success){
            localStorage.setItem("token",json.authToken);
            localStorage.setItem("name",json.userName);

            nav("/");
            showAlert("Logged in successfully", "success");

        }
        else{
            // alert("Invalid creds");
            showAlert("Invalid credentials", "danger");
        }
        console.log(json);
    }
    const changed = (e) => {
        setcreds({ ...creds, [e.target.name]: e.target.value });
      };
  return (
    <div>
      {/* <div className='flex'>
      </div> */}
      <div style={{textAlign:"center", marginTop:"2rem"}}>
      <h1>Log In</h1>


      </div>
        <div className="container loginCSS">

    {/* <div> */}
      <form onSubmit={handleSubmit} >
        <div className="mb-3">
        <label htmlFor="exampleInputPassword1" className="form-label">
            Email
          </label>
          <input
            type="email"
            className="form-control "
            id="email"
            name="email"
            value={creds.email}
            aria-describedby="emailHelp"
            onChange={changed}
            
          />
        
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputPassword1" className="form-label">
            Password
          </label>
          <div className=' d-flex flex-col'>
          <input
            type={pw? "text":"password"}
            className="form-control"
            id="password"
            name="password"
            value={creds.password}

            onChange={changed}
          />
          <button className='btn btn-light mx-1' hidden={true&&(pw)} onClick={toggleButton}><i className="fa-solid fa-eye my-1" ></i></button>
          <button className='btn btn-light mx-1' hidden={true&&(!pw)} onClick={toggleButton}><i className="fa-solid fa-eye-slash my-1" ></i></button>
          
          </div>
        </div>
        
        <button type="submit" className="btn btn-lg btn-light my-3 btnCSS2">
          Login
        </button>
      </form>
      {/* </div> */}
    </div>
    </div>
  )
}
