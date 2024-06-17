import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Signup from "./components/Signup"
import Login from "./components/Login"


const App = () => {
  return (
    <>
    <Router>
      <Routes>
        <Route path="/signup" element={<Signup/>}/>
        <Route path="/login" element={<Login/>}/>
      </Routes>
    </Router>
    </>
  )
}

export default App