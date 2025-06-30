import React, { useEffect, useState } from "react";
import './NewCollection.css'

import Item from "../Item/Item";
const NewCollection = ()=>{
    const[new_collection,setNew_collection]=useState([]);
    useEffect(()=>{
        fetch('http://localhost:5000/newcollection')
        .then((res)=>res.json())
        .then((data)=>setNew_collection(data));
    },[])
    return(
        <div className="new-collection">
            <h1>NEW COLLECTION</h1>
            <hr />
            <div className="collection">
                {new_collection.map((item,i)=>{
                    return <Item
                    key={item.id} // It's better to use unique identifiers instead of index for key
                    id={item.id}
                    name={item.name}
                    image={item.image}
                    new_price={item.new_price}
                    old_price={item.old_price}
                    
                    />
                })}
            </div>
        </div>
    )
}
export  default NewCollection