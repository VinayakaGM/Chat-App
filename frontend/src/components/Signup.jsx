import { useState } from "react";
import STYLE from "../css modules/signup.module.css";
import axios from "axios";

const Signup = () => {
  let [userData, setUserData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    // photo: "",
  });
  let [photo,setPhoto] = useState("")

  let data = (e) => {
    // console.log(e.target.value);
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  let handleSubmit = async (e) => {
    e.preventDefault();
    // console.log({ ...userData });
    let { data } = await axios.post(
      "http://localhost:5000/api/v1/user/signup",
      { ...userData,photo },
      {
        headers: {
          "Content-type": "multipart/form-data",
        },
      }
    );
    console.log(data);
  };

  return (
    <div className={STYLE.signup_container}>
      <h1>SignUp</h1>
      <form action="" className={STYLE.signup_form} onSubmit={handleSubmit}>
        <label htmlFor="name">Name </label>
        <input
          type="text"
          name="name"
          id="name"
          value={userData.name}
          onChange={data}
        />
        <label htmlFor="email">Email </label>
        <input
          type="email"
          name="email"
          id="email"
          value={userData.email}
          onChange={data}
        />
        <label htmlFor="password">Password </label>
        <input
          type="password"
          name="password"
          id="password"
          value={userData.password}
          onChange={data}
        />
        <label htmlFor="confirmPassword">Confirm Password </label>
        <input
          type="password"
          name="confirmPassword"
          value={userData.confirmPassword}
          id="confirmPassword"
          onChange={data}
        />
        <label htmlFor="photo">Upload Photo</label>
        <input
          type="file"
          name="photo"
          id="photo"
          value={userData.photo}
          className={STYLE.photo}
          onChange={(e) => setPhoto(e.target.files[0])}
        />
        <div className={STYLE.signup_btns}>
          <button className={STYLE.btn}>Signup</button>
          <button className={STYLE.btn} type="reset">
            Clear
          </button>
        </div>
      </form>
    </div>
  );
};

export default Signup;
