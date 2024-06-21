import { NavLink } from "react-router-dom"
import STYLE from '../css modules/navbar.module.css'

const Navbar = () => {
  return (
      <nav className={STYLE.navbar}>
      <NavLink to="/signup">Signup</NavLink>
      <NavLink to="/login">Login</NavLink>
    </nav>
  )
}

export default Navbar