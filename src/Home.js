import React from "react";
import { Link } from "react-router-dom";

const Home=props=> {
    const {pizza}=props


    return(
        <div className="container-pizza">
            {pizza.map((item) => {
                return (
                <Link to={`${item.id}-pizza`} key={item.id}>
                <div className="pizza">
                   
                        <p>{item.name}</p>
                        <p>Base Price {item.price}</p>
                    
                </div>
                </Link>
                )
            })
            }
        </div>

    )
    
    
}


export default Home;