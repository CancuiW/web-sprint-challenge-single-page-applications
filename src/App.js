import React ,{useState}from "react";
import "./App.css";
import { Route, Routes, Link, useNavigate } from "react-router-dom";

import Form from "./form";
import Confirmation from "./Confirmation";


const App = () => {
  
  const navigate=useNavigate()
  const routeToshop=()=>{
    navigate("/pizza")

}





  return (
    <>
      <div className="navigation">
        <h1>Popular pizzas</h1>
        <Link to="/" className="home-link" >Home</Link>

      </div>
      <div className="buttons">
        <button id="order-pizza" onClick={routeToshop}>Order here!</button>

      </div>
      

    
      
      
      <Routes>
       
        <Route path="/pizza" element={<Form />} />
        <Route path="/pizza/confirmation" element={<Confirmation />} />
        
      </Routes>
      
      
    </>
  );
};
export default App;
