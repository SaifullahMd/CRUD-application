import React, { useState, useEffect } from 'react'
import Button from 'react-bootstrap/Button';
import Modal2 from './Modal2'
import  Axios  from 'axios';

export default function Table2() {

  const [dataApi, setDataApi] = useState([])
  const [id, setId] = useState("")

  useEffect(() => {
    getUserApi()
  }, [])
  //  -------Get API Method---to Get data from backend (Read)-----
  //  Method 1 ---  Fetch method

  // const getUserApi = () => {
  //   fetch('http://localhost:8080/users')
  //     .then((response) => response.json())
  //     .then((data) => setDataApi(data));
  // }
    //  Method 2 ---  Axiox method

     const getUserApi =async () => {  
       const result = await Axios.get("http://localhost:8080/users")
       setDataApi(result.data)
     }
     // PUT api's to edit a execting record in backend (Update)
      

     //----- To Read the data -------
     
     
     //-----DELETE  API ---- to delete record of database
      const handleDeleteBtn= async(id)=>{
      //  alert("Are you sure to Delete")
      if (window.confirm("Are you sure to Delete")) {
        await Axios.delete("http://localhost:8080/users/"+ id)
        getUserApi()
      } 
      }

      // =======================
      const handleEdit = (id) => {
        setId(id)
      }

  return (
    <>
    
      <div style={{ padding: "20px", border: "2px", borderRadius: "5px", backgroundColor: "pink" }}>
        <h3 className='text-center'>Users-Data</h3>
        <div style={{ textAlign: "right", margin: "10px" }}>
          <Modal2 getUserApis={getUserApi} editId={id}/>
        </div>
        <table class="table">
          <thead class="thead-dark">
            <tr>
              <th scope="col">#</th>
              <th scope="col">Name</th>
              <th scope="col">Email</th>
              <th scope="col">Phone</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {
              dataApi.map((data, index) =>

                <tr key={data.id}>
                  <td>{index + 1}</td>
                  <td>{data.name}</td>
                  <td>{data.email}</td>
                  <td>{data.phone}</td>
                  <td><Button variant="success" onClick={() => handleEdit(data.id)}>Update</Button>{' '}</td>
                  <td><Button variant="danger" onClick={()=>handleDeleteBtn(data.id)}>Delete</Button>{' '}</td>
                </tr>
              )
            }

          </tbody>
        </table>
      </div>
    </>
  )
}
