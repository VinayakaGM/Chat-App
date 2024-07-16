import { useState } from "react";
import STYLE from "../css modules/login.module.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Button, Input, Text } from "@chakra-ui/react";
import { useToast } from "@chakra-ui/react";

// import { ToastContainer, toast } from "react-toastify";

const Login = () => {
  let [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });
  const toast = useToast()
  let navigate = useNavigate();

  let data = (e) => {
    // console.log(e.target.value);
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
  };

  let handleSubmit = async (e) => {
    e.preventDefault();
    // console.log({ ...loginData });
    // toast.success("Hello")
    let { data } = await axios.post(
      "http://localhost:5000/api/v1/user/login",
      loginData,
      {
        headers: {
          "Content-type": "application/json",
        },
      }
    );
    localStorage.setItem("user", JSON.stringify(data));
    toast({
      title: 'Login successful',
      status: 'success',
      duration: 9000,
      isClosable: true,
    })
    // console.log(data);
    navigate("/chats", { replace: true });
  };

  return (
    <div className={STYLE.login_container}>
      {/* <ToastContainer/> */}
      <Text fontSize={"3xl"}>Login</Text>
      <form action="" className={STYLE.login_form}>
        <label htmlFor="email">Email </label>
        <Input type="email" name="email" id="email" onChange={data} />
        <label htmlFor="password">Password </label>
        <Input type="password" name="password" id="password" onChange={data} />
        {/* <Button className={STYLE.btn}>Login</Button> */}
        <Button colorScheme="blue" mt={"8px"} p={"12px"} borderRadius={"100px"} size="md" onClick={handleSubmit}>
          Login
        </Button>
      </form>
    </div>
  );
};

export default Login;
