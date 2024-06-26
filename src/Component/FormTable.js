import React from 'react'
import "../App.css"
import { IoMdClose } from "react-icons/io";


const FormTable = ({handleSubmit,handleOnChange,handleclose,rest}) => {
  return (
    <div className="addContainer">

  <form>
  <div className="close-btn" onClick={(handleclose)}><IoMdClose /></div>
    <label>Name:</label>
    <input type="name" id="name" name="name" onChange={handleOnChange} value={rest.name}/>
    <label>Email:</label>
    <input type="email" id="email" name="email" onChange={handleOnChange} value={rest.email}/>
    <label>Mobile:</label>
    <input type="number" id="mobile" name="mobile" onChange={handleOnChange} value={rest.mobile}/>
<button className="btn" onClick={handleSubmit}>Submit</button>
  </form>
</div>  
  )
}

export default FormTable