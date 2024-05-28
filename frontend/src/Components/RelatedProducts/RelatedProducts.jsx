import React from 'react'
import './RelatedProducts.css'
import data_product from '../../assets/data'
import Item from '../Item/Item';
const RelatedProducts = () => {
  return (
    <div className='relatedproducts'>
        <h1>Related Products</h1>
        <hr />
        <div className="relatedproducts-item">
            {data_product.map((item,i)=>{
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

export default RelatedProducts
