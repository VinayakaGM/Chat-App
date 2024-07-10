import { useState } from "react";
import STYLE from "../css modules/signup.module.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Box, Button, Input } from "@chakra-ui/react";


const Signup = () => {
  let [userData, setUserData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    // photo: "",
  });
  let [photo, setPhoto] = useState("");
  let navigate = useNavigate()

  let data = (e) => {
    // console.log(e.target.value);
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  let handleSubmit = async (e) => {
    e.preventDefault();
    // console.log({ ...userData });
    let { data } = await axios.post(
      "http://localhost:5000/api/v1/user/signup",
      { ...userData, photo },
      {
        headers: {
          "Content-type": "multipart/form-data",
        },
      }
    );
    localStorage.setItem("user", JSON.stringify(data));
    // console.log(data);
    navigate("/chats", {replace:true})
  };

  return (
    <div className={STYLE.signup_container}>
      <h1>SignUp</h1>
      <form action="" className={STYLE.signup_form} onSubmit={handleSubmit}>
        <label htmlFor="name">Name </label>
        <Input
          type="text"
          name="name"
          id="name"
          value={userData.name}
          onChange={data}
        />
        <label htmlFor="email">Email </label>
        <Input
          type="email"
          name="email"
          id="email"
          value={userData.email}
          onChange={data}
        />
        <label htmlFor="password">Password </label>
        <Input
          type="password"
          name="password"
          id="password"
          value={userData.password}
          onChange={data}
        />
        <label htmlFor="confirmPassword">Confirm Password </label>
        <Input
          type="password"
          name="confirmPassword"
          value={userData.confirmPassword}
          id="confirmPassword"
          onChange={data}
        />
        <label htmlFor="photo">Upload Photo</label>
        <Input
          height={"24px"}
          type="file"
          name="photo"
          id="photo"
          value={userData.photo}
          className={STYLE.photo}
          onChange={(e) => setPhoto(e.target.files[0])}
        />
        <Box mt={"20px"} display={"flex"} gap={"6px"}>
          <Button colorScheme='blue' size='md' flex={"1"}>Signup</Button>
          <Button colorScheme='blue' size='md' type="reset" flex={"1"}>
            Clear
          </Button>
        </Box>
      </form>
    </div>
  );
};

export default Signup;
