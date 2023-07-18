
import React, { useState, useEffect, useRef } from "react";
import { useNavigate} from "react-router-dom";
import * as yup from 'yup'
import axios from "axios";



export default function Form(props){
   
   
    const initial = { name: "", size: "", topping: { sausage: false, bacon: false, meatball: false, mushrooms: false }, instructions: "Here are the special instructions" }  
    

    const [data,setData]=useState(initial)
    const [disabled,setDisabled]=useState(true)
    const [error,setError]=useState(initial)

    const [orderRecord, setOrderRecord] = useState({});
    const isMounted = useRef(true);
    
    
    

    const schema=yup.object().shape({
  
        name: yup.string().trim().required('name is required').min(2,'name must be at least 2 characters'),
        size: yup.string().trim().required('size is required'),
        sausage:yup.boolean(),
        bacon:yup.boolean(),
        meatball:yup.boolean(),
        mushrooms: yup.boolean(),
        instructions: yup.string().optional(),


    })
const setFormError=(name,value)=>{
    yup.reach(schema,name).validate(value)
       .then(()=>setError({...error,[name]:''}))
       .catch(err=>setError({...error,[name]:err.errors[0]}))
}

const change=evt=>{
    const {name,value,checked,type}=evt.target
    const valueToUse=type==='checkbox'?checked:value
    if (name === 'sausage' || name === 'bacon' || name === 'meatball' || name === 'mushrooms') {
        setData(prevData => ({
            ...prevData,
            topping: {
                ...prevData.topping,
                [name]: valueToUse
            }
        }));
    } else {
        setFormError(name, valueToUse);
        setData(prevData => ({
            ...prevData,
            [name]: valueToUse
        }));
    }
   
}
useEffect(()=>{
    schema.isValid(data).then(valid=>setDisabled(!valid))
},[data])

    useEffect(() => {
        return () => {
            
            isMounted.current = false;}
    }, []);

    const newdata = {

        name: data.name.trim(),
        size: data.size.trim(),
        sausage: data.sausage,
        bacon: data.bacon,
        meatball: data.meatball,
        mushrooms: data.mushrooms,
        instructions: data.instructions.trim()


    }

const navigate = useNavigate();
const submit=evt=>{
    evt.preventDefault();
   
   
      axios.post("https://reqres.in/api/orders", newdata)
        .then(response => {
            if (isMounted.current) { 
                console.log(response.data);
                setOrderRecord(response.data);
            }
        })
        .catch(error => {
            console.error(error); 
            
        });
         
    navigate("confirmation", { state: { data } });
         
    
    
}
   
   



    return(
        <>
        <div id="errors">
           
            <p>{error.name}</p>
            <p>{error.size}</p>
        </div>
        
        <h1>Build your own Pizza!!!</h1>
        <form id="pizza-form" onSubmit={submit} >
            
            <label>Client Name:
                <input name="name" type="text" onChange={change} value={data.name} id= "name-input"/>
            </label>
            <br/>
            <label>Size of Pizza:
                <select onChange={change} value={data.size} name="size" id="size-dropdown" >
                    <option value=''>---Select one---</option>
                        <option value='8-inch'>8-inch</option>
                        <option value='12-inch'>12-inch</option>
                        <option value='14-inch'>14-inch</option>
                </select>
                <div className="mutiple-choose">
                    <h2>Toppings</h2>
                    <label>Sausage
                            <input onChange={change} checked={data.topping.sausage} name="sausage"  type="checkbox"/>
                    </label>
                    <br/>
                    <label>Bacon
                            <input onChange={change} checked={data.topping.bacon} name="bacon" type="checkbox" />
                    </label>
                        <br />
                    <label>Meatball
                            <input onChange={change} checked={data.topping.meatball} name="meatball" type="checkbox" />
                    </label>
                        <br />
                    <label>Mushrooms
                            <input onChange={change} checked={data.topping.mushrooms} name="mushrooms" type="checkbox" />
                    </label>
                </div>
                <div id="instructions">
                        <p>Special Instructions：</p>
                   
                    <input onChange={change} type="text" 
                        name="instructions" value={data.instructions}
                             placeholder="Here are the special instructions"
                        id="special-text"
                    />
                   
                </div>
                    <button id="order-button" type="submit" disabled={disabled}>Add an order</button>
                    {/* when type===submit ,we can not set the onClick() function */}


            </label>
        </form>
       

        </>
    )
}