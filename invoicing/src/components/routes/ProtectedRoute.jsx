import React,{useEffect} from "react";
//import { useHistory } from 'react-router';
import { useNavigate} from "react-router-dom";
import jwtDecode from 'jwt-decode';
// const ProtectedRoute=(props)=>{
//     const {Component}=props
//     const navigat=useNavigate();
//     useEffect(()=>{
//         let token=localStorage.getItem('token')
//         if(!token){
//             navigat('/login')
//         }
//     },[]
//     )
//     return(
//         <>
//         <Component></Component>
//         </>
//     )
// }
// export default ProtectedRoute
export default function ProtectedRoute(props) {
    const {Component}=props
    const navigat=useNavigate();
   
  
    // Function to check if the token is expired
    const isTokenExpired = () => {
      const token = localStorage.getItem('token');
      if (token) {
        try {
            const decodedToken = jwtDecode(token);
            // console.log(decodedToken)
            const currentTime = Date.now() / 1000; // Get the current time in seconds
            // console.log(currentTime)
            // Check if the token's expiration time (exp) is in the past
            return decodedToken.exp < currentTime;
          } catch (error) {
            // Handle any error that occurs during token decoding, if necessary
            return true; // Consider token expired if there's an error
          }
        }
    
        return true; // Token not found, consider it expired
      };// Token not found, consider it expired
    
  
    useEffect(() => {
      // Redirect to login page if token is expired
      if (isTokenExpired()) {
        navigat('/login')
      }
    }, []);
  
    // Your protected page content
    return (
        <>
            <Component></Component>
        </>
    );
  }