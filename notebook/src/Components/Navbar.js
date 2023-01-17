import React from 'react'
import {Link, useLocation, useNavigate} from "react-router-dom";
import image from './image.png'

export const Navbar = (props) => {
    let location=useLocation();
    let nav=useNavigate();
    const logout=()=>{
      localStorage.removeItem('token');
      nav("/login");
      props.showAlert("Logged out successfully", "success");
    }
  return (
    <nav className="navbar navbar-expand-lg navbar-dark my-2 mx-4">
    
    <div className="container-fluid ">
      <Link className="navbar-brand" to="/home"><img src={image} alt="NOTEBOOK" style={{width:"1.98rem", height:"1.98rem"}} /> NOTEBOOK</Link>
      <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse " id="navbarSupportedContent">
        <ul className="navbar-nav me-auto mb-2 mb-lg-0 ">
          
        {/* <li className="nav-item">
            <Link className={`nav-link ${location.pathname==="/home"&&"active"}`} aria-current="page" to="/home">Home</Link>
          </li>
         */}
          <li className="nav-item">
            <Link hidden={true&&(!localStorage.getItem('token'))} className={`nav-link ${location.pathname==="/"&&"active"}`} aria-current="page" to="/">Notes</Link>
          </li>
         
        </ul>
      {!localStorage.getItem('token')?<form className="d-flex" role="search">
        <Link className="btn btn-outline-light mx-2 btnCSS" to="/login" role="button">Log In</Link>
        <Link className="btn btn-outline-light btnCSS" to="/signup" role="button">Sign Up</Link>
        </form>:<button className="btn btn-outline-light btnCSS"onClick={logout} >Log Out</button>}
      </div>
    </div>
  </nav>
  )
}
