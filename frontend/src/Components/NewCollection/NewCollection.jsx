import React from "react";
import './NewCollection.css'
import new_collection from '../../assets/new_collections'
import Item from "../Item/Item";
const NewCollection = ()=>{
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