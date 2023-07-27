
import "./LoginForm.css";
import { useState } from "react";
import { useLocation,useNavigate} from "react-router-dom";
import { Link } from "react-router-dom";
//import { useDispatch } from 'react-redux';
//import loginDetails from '../../data/loginDetails.json';
//import { addUser } from "../../reducers/cartReducer";
import Navbar from "../NavBar/Navbar";
function Login() {
  let navigate = useNavigate();
  //const dispatch=useDispatch();
  let location = useLocation();
  
  //const[userName,setUserName]=useState([]);

  console.log(location.pathname);
  const [user, setFormData] = useState({
    username: '',
    password: '',
  });
  function handleSubmit() {
    
    fetch("http://127.0.0.1:8000/api/invoices/user/login/", {
      method: "POST",
      body: JSON.stringify(user),
      headers: {
        "Content-Type": "application/json",
        
      },
    })
    .then((res) => {
      if (res.ok) {
        return res.json(); // Parse response as JSON
      } else if (res.status === 400) {
        console.log("Unauthorized request");
        alert("Login Error");
        throw new Error("Unauthorized request");
      } else {
        console.log("Something went wrong");
        throw new Error("Something went wrong");
      }
    })
      .then((data) => {
        console.log(data);
        localStorage.setItem("token", data.access); // Store the access_token in localStorage
        localStorage.setItem("tokenExpiration",data.access);
        alert("Successful Logged In");
        navigate("/");
      })
      .catch((err) => {
        console.log(err);
      });
    }
  function handleChange(e) {
    e.preventDefault();
    const { name, value } = e.target;
    setFormData({ ...user, [name]: value });
    console.log(user);
  }

  return (
    <div>
      <Navbar></Navbar>

      <form className="login-container">

        <div class="  form-outline mb-4">
          <input type="`text`"  class="form-control" name="username" id="username" onChange={handleChange} value={user.username}/>
          <label class="form-label" for="form2Example1">Username</label>
        </div>


        <div class="form-outline mb-4">
          <input type="password" name="password" id="password" onChange={handleChange} value={user.password} class="form-control" />
          <label class="form-label" for="form2Example2">Password</label>
        </div>


        <div class="row mb-4">
          <div class="col d-flex justify-content-center">

            <div class="form-check">
              <input class="form-check-input" type="checkbox" value="" id="form2Example31" checked />
              <label class="form-check-label" for="form2Example31"> Remember me </label>
            </div>
          </div>

          <div class="col">

            <a href="#!">Forgot password?</a>
          </div>
        </div>


        <button type="button" class="btn btn-primary btn-block mb-4" onClick={handleSubmit}>Sign in</button>


        <div class="text-center">
          <p>Not a member? <Link to="/user">Register</Link> </p>
          <p>or sign up with:</p>
          {/* <button type="button" class="btn btn-link btn-floating mx-1">
            <i class="fab fa-facebook-f"></i>
          </button>

          <button type="button" class="btn btn-link btn-floating mx-1">
            <i class="fab fa-google"></i>
          </button>

          <button type="button" class="btn btn-link btn-floating mx-1">
            <i class="fab fa-twitter"></i>
          </button>

          <button type="button" class="btn btn-link btn-floating mx-1">
            <i class="fab fa-github"></i>
          </button> */}
        </div>
      </form>
    </div>
  );
}
export default Login;
