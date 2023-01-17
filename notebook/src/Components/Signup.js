import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export const Signup = (props) => {
  const [creds, setcreds] = useState({ email: "", password: "", name: "" });
  const [pw, setpassword] = useState(false);

  let nav = useNavigate();
  // const {showAlert}=props;
  const toggleButton=(e)=>{
    e.preventDefault();

    setpassword(prev=>!prev);
  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    const { email, password, name } = creds;
    const response = await fetch("http://localhost:5000/api/auth/newuser", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, email, password }),
    });
    const json = await response.json();
    if (json.success) {
      localStorage.setItem("token", json.authToken);
      localStorage.setItem("name",json.userName);

      nav("/");
      props.showAlert("Account created succesfully", "success");
    } else {
      props.showAlert("Invalid credentials", "danger");
    }
  };

  const changed = (e) => {
    setcreds({ ...creds, [e.target.name]: e.target.value });
  };
  return (
    <div>
      <div style={{ textAlign: "center", marginTop: "2rem" }}>
        <h1>Sign Up</h1>
      </div>
      <div className="container signCSS">
        <div>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="exampleInputEmail1" className="form-label">
                Email address
              </label>
              <input
                type="email"
                className="form-control"
                id="email"
                name="email"
                aria-describedby="emailHelp"
                onChange={changed}
                required
              />
            </div>

            <div className="mb-3">
              <label htmlFor="exampleInputEmail1" className="form-label">
                Name
              </label>
              <input
                type="text"
                className="form-control"
                id="name"
                name="name"
                onChange={changed}
                required
                minLength={3}
              />
            </div>

            <div className="mb-3">
              <label htmlFor="exampleInputPassword1" className="form-label">
                Password
              </label>
              <div className=' d-flex flex-col'>
                <input
                  type={pw?"text":"password"}
                  className="form-control"
                  id="password"
                  name="password"
                  onChange={changed}
                  required
                  minLength={8}
                />
                <button
                  className="btn btn-light mx-1"
                  hidden={true && pw}
                  onClick={toggleButton}
                >
                  <i className="fa-solid fa-eye  my-1"></i>
                </button>
                <button className='btn btn-light mx-1' hidden={true && !pw} onClick={toggleButton}>
                  <i className="fa-solid fa-eye-slash my-1"></i>
                </button>
              </div>
            </div>

            {/* <div className="mb-3">

              <label htmlFor="exampleInputPassword1" className="form-label">
                Confirm Password
              </label>
              <input
                type="password"
                className="form-control"
                id="cpassword"
                name="cpassword"
                onChange={changed}
                required minLength={8}
              />

            </div> */}

            <button type="submit" className="btn btn-lg btn-light my-3 btnCSS2">
              Sign up
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
