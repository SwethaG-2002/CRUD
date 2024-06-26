 
import { useEffect, useState } from 'react';
import './App.css';
import axios from "axios";
import FormTable from './Component/FormTable';

axios.defaults.baseURL="http://localhost:8080/"

function App() {
const[addSection,setAddsection]=useState(false);
const[editSection,seteditsection]=useState(false);

const[formdata,setformdata]=useState({
  name:"",
  email:"",
  mobile:""
})

const[formdataedit ,setformdataedit]=useState({
  name:"",
  email:"",
  mobile:"",
  _id:""
})

const[datalist,setdatalist]=useState([]);


const handleOnChange=(e)=>{
  const {value,name}=e.target
  setformdata ((preve)=>{
    return{
      ...preve,
      [name]:value  
    }
  })
}


  const handleSubmit=async(e)=>{
e.preventDefault()  
const data = await axios.post('/create',formdata)
console.log(data)
if(data.data.success){
  setAddsection(false)
  alert(data.data.message)
  getFetchData()
  setformdata({
    name:"",
    email:"",
    mobile:""
  })
}
  }

  const getFetchData=async()=>{
   
    const data = await axios.get('/')
    console.log(data)
    if(data.data.success){
      setdatalist(data.data.data)
      
    }
      }


      useEffect(()=>{
        getFetchData()
      },[]
      )
  
      const handleDelete=async(id)=>{
        const data = await axios.delete('/delete/'+id)
       if(data.data.message){
        getFetchData()
        alert(data.data.message)
       }
      }

      const handleUpdate=async(e)=>
        {
           e.preventDefault()
           const data = await axios.put('/update',formdataedit) 
           if(data.data.message){
            getFetchData()
            alert(data.data.message)
            seteditsection(false)
           }

        }

        const handleEditOnChange=async(e)=>{
          const {value,name}=e.target
          setformdataedit ((preve)=>{
            return{
              ...preve,
              [name]:value  }
            })
        }

        const handleEdit=(el)=>{
setformdataedit(el)
seteditsection(true)
        }

  return (
   <>
<div className="container" >
<button className="btn btn-add" onClick={()=>setAddsection(true)}>Add</button>
{ addSection &&(

<FormTable
handleSubmit={handleSubmit}
handleOnChange={handleOnChange}
handleclose={()=>setAddsection(false)}
rest={formdata}
/>

)}

{
  editSection && (
<FormTable
handleSubmit={handleUpdate}
handleOnChange={handleEditOnChange}
handleclose={()=>seteditsection(false)}
rest={formdataedit}
/>
  )
}
<div className='tableContainer'>
  <table>
    <thead>
      <tr>
        <th>Name</th>
        <th>Email</th>
        <th>Mobile</th>
        <th>
        </th>
      </tr>
    </thead>
    <tbody>
      {datalist[0]?(
        datalist.map((el)=>{
          return(
            <tr>
              <td>{el.name}</td>
              <td>{el.email}</td>
              <td>{el.mobile}</td>
              <button className='btn btn-edit' onClick={()=>handleEdit(el)}>Edit</button>
              <button className='btn btn-delete' onClick={()=>handleDelete(el._id)}>Delete</button>
            </tr>
          )

        }))
        :(
          <p><center>No data found</center></p>
        )
      }
    </tbody>
  </table>
</div>
</div>
   </>
  );
}

export default App;
