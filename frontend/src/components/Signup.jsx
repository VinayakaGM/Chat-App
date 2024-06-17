import { useState } from "react"
import STYLE from "../css modules/signup.module.css"

const Signup = () => {

    let [userData, setUserData] = useState({
        name:"",
        email:"",
        password:"",
        confirmPassword: "",
        photo: "",
    })

    let data = (e) => {
        // console.log(e.target.value);
        setUserData({...userData, [e.target.name]: e.target.value});
    }

    let handleSubmit = (e) => {
        e.preventDefault()
        console.log({...userData});
    }

  return (
    <div className={STYLE.signup_container}>
        <h1>SignUp</h1>
        <form action="" className={STYLE.signup_form} onSubmit={handleSubmit}>
            <label htmlFor="name">Name </label>
            <input type="text" name="name" id="name" onChange={data}/>
            <label htmlFor="email">Email </label>
            <input type="email" name="email" id="email" onChange={data}/>
            <label htmlFor="password">Password </label>
            <input type="password" name="password" id="password" onChange={data}/>
            <label htmlFor="confirmPassword">Confirm Password </label>
            <input type="password" name="confirmPassword" id="confirmPassword" onChange={data}/>
            <label htmlFor="photo">Upload Photo</label>
            <input type="file" name="photo" id="photo" className={STYLE.photo} onChange={data}/>
            <div className={STYLE.signup_btns}>
            <button className={STYLE.btn}>Signup</button>
            <button className={STYLE.btn} type="reset">Clear</button>
            </div>
        </form>
    </div>
  )
}

export default Signup