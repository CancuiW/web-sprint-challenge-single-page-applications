import React from "react";
import { useLocation } from "react-router-dom";

export default function Confirmation(props){
    
    const location = useLocation();
    const state = location.state?.data;
   
    // Get an array of existing toppings
    const existingToppings = Object.keys(state?.topping).filter(topping => state?.topping[topping]);

    return (
        <div className="confirm">
            <h1>Congrats! your pizza is on the way!</h1>
            <p>Please confirm your information:</p>
            {/* <p>Pizza: {state?.pizza}</p> */}
            <p>Client's Name: {state?.name}</p>
            <p>Pizza's Size:{state?.size}</p>
            {existingToppings.map((topping, index) => (
                <p key={index}>Topping {index + 1}: {topping}</p>
            ))}
            <p>Instructions:{state?.instructions}</p>
        </div>
    );
   
}