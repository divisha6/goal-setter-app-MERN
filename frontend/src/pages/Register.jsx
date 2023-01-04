import { useState, useEffect } from "react";
import { FaUser } from "react-icons/fa";
// useSelector is used to select something from the state - isLoading, isError, etc
// useDispatch is for dispatching functions like register or async Thunk function or reset function
import {useSelector, useDispatch} from 'react-redux'
import { register, reset } from "../features/auth/authSlice";
import {useNavigate } from 'react-router-dom'
import {toast } from 'react-toastify'

function Register() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    password2: "",
  });

  const { name, email, password, password2 } = formData;

  const onChange = (e) => {
    setFormData((prevState)=>({
        ...prevState,
        [e.target.name]: e.target.value,
    }))
  };

  const onSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <>
      <section>
        <h1>
          <FaUser />
          Register
        </h1>
        <p>Please create an account</p>
      </section>
      <form action="" onSubmit={onSubmit}>
        {/* name */}
        <div className="form-group">
          <input
            type="text"
            className="form-control"
            id="name"
            name="name"
            value={name}
            placeholder="Enter your name"
            onChange={onChange}
          />
        </div>

        {/* email */}
        <div className="form-group">
          <input
            type="text"
            className="form-control"
            id="email"
            name="email"
            value={email}
            placeholder="Enter your email"
            onChange={onChange}
          />
        </div>

        {/* password */}
        <div className="form-group">
          <input
            type="text"
            className="form-control"
            id="password"
            name="password"
            value={password}
            placeholder="Enter password"
            onChange={onChange}
          />
        </div>

        {/* confirm password */}
        <div className="form-group">
          <input
            type="text"
            className="form-control"
            id="password2"
            name="password2"
            value={password2}
            placeholder="Confirm password"
            onChange={onChange}
          />
        </div>

        {/* submit button */}
        <div className="form-group">
          <button type="submit" className="btn btn-block">
            Submit
          </button>
        </div>
      </form>
      <section></section>
    </>
  );
}

export default Register;
