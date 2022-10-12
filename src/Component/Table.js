// import React, { useState, useEffect } from 'react'
// import Modal from "./Modal"
// import Axios from "axios"

// export default function Table() {
//   // state to store endpoint data of response
//   const [dataApi, setDataApi] = useState([])
//   const [editId, setEditId ] = useState("")

//   // GET api's to Get data from backend (Read)
//   useEffect(() => {
//     getUserData()
//   }, [])

//   const getUserData = async () => {
//     fetch('http://localhost:8080/users')
//       .then((response) => response.json())
//       .then((data) => setDataApi(data));
//   }

//   // PUT api's to edit a execting record in backend (Update)
//   const handleEditbtn = (id) => {
//     setEditId(id)
//   }

//   // DELETE api's to delete record of database
//   const handleDeletebtn = async (id) => {
//     await Axios.delete("http://localhost:8080/users/" + id)
//     getUserData()
//   }

//   return (
//     <>
//       <Modal getUserData={getUserData} editId={editId}/>
//       <div style={{ margin: "60px", border: "2px solid gray", borderRadius: "5px", backgroundColor: "#b0c580" }}>
//         <h3 className='text-center'>Table</h3>
//         <table class="table">
//           <thead class="thead-dark">
//             <tr>
//               <th scope="col">Name</th>
//               <th scope="col">Email</th>
//               <th scope="col">City</th>
//               <th scope="col">Phone</th>
//               {/* <th scope="col">Website</th> */}
//               <th scope="col">Company Name</th>
//               <th scope="col">Action</th>
//             </tr>
//           </thead>
//           <tbody>
//             {
//               dataApi.map((data) =>

//                 <tr key={data.id}>
//                   <td>{data.name}</td>
//                   <td>{data.email ? data.email : "NA"}</td>
//                   <td>{data.address.city}</td>
//                   <td>{data.phone}</td>
//                   {/* <td>{data.website}</td> */}
//                   <td>{data.company.name}</td>
//                   <td>
//                     <button type="button" class="btn btn-primary m-1" 
//                     onClick={() => handleEditbtn(data.id)}>Edit</button>
//                     <button type="button" class="btn btn-danger m-1"
//                       onClick={() => handleDeletebtn(data.id)}>Delete</button>
//                   </td>

//                 </tr>
//               )
//             }

//           </tbody>
//         </table>
//       </div>
//     </>
//   )
// }
 