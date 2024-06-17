import { useState } from "react";
import STYLE from "../css modules/login.module.css";
// import { ToastContainer, toast } from "react-toastify";

const Login = () => {
  let [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  let data = (e) => {
    // console.log(e.target.value);
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
  };

  let handleSubmit = (e) => {
    e.preventDefault();
    console.log({ ...loginData });
    // toast.success("Hello")
  };


  return (
    <div className={STYLE.login_container}>
      {/* <ToastContainer/> */}
      <h1>Login</h1>
      <form action="" className={STYLE.login_form} onSubmit={handleSubmit}>
        <label htmlFor="email">Email </label>
        <input type="email" name="email" id="email" onChange={data} />
        <label htmlFor="password">Password </label>
        <input type="password" name="password" id="password" onChange={data} />
        <button className={STYLE.btn}>
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
