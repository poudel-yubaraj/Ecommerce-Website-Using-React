import React from "react";
import './NewsLetter.css'
const NewsLetter=()=>{
    return(
        <div className="newsletter">
            <h1>Get Exclusive offers on Your Email</h1>
            <p>Subscribe to our newsLetter and stay updated</p>
            <div>
                <input type="emial" placeholder="Your Email id"/>
                <button>Subscribe</button>
            </div>
        </div>
    )
}
export default NewsLetter