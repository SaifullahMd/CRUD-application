import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import Axios from "axios";

export default function Modals({ getUserData, editId }) {
  const [show, setShow] = useState(false);
  // const [dataApi, setDataApi] = useState([])

  // ===============Storing the data of input fildes=========

  const [name, setName] = useState("");
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [city, setCity] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [website, setWebsite] = useState("");
  const [mobile, setMobile] = useState("");


  console.log("name", name, "userName", userName, "email",
    email, "city", city, "companyName", companyName, "website", website, "mobile", mobile)


  // once click on cancle btn

  const handleClose = () => {
    setShow(false);
    setName("");
    setUserName("");
    setEmail("");
    setCity("");
    setCompanyName("");
    setWebsite("");
    setMobile("");
  }

  // Once click on add new user btn
  const handleShow = () => setShow(true);
  // ====================================

  // get user by ID
  useEffect(() => {
    if (editId) {
      getUserDataByID();
      handleShow()
    }
  }, [editId])

  const getUserDataByID = async () => {
    fetch('http://localhost:8080/users/' + editId)
      .then((response) => response.json())
      .then((data) => {
        setName(data.name);
        setUserName(data.username);
        setEmail(data.email);
        setCity(data.address.city);
        setCompanyName(data.company.name);
        setWebsite(data.website);
        setMobile(data.phone);
      });
  }


  // +++++++++++++++++ Making api call after cliccking on save button++++++
  const handleSaveData = async () => {
    var payload = {
      name: name,
      username: userName,
      email: email,
      address: {
        street: "",
        suite: "",
        city: city,
        zipcode: "",
        geo: {
          lat: "",
          lng: ""
        }
      },
      phone: mobile,
      website: website,
      company: {
        name: companyName,
        catchPhrase: "",
        bs: ""
      }
    };



    if (editId) {
      await Axios.put("http://localhost:8080/users/" + editId, payload)
      alert("User Successfully Updated!!!! Thanks You")
      handleClose()
      getUserData()
    } else {

      await Axios.post("http://localhost:8080/users", payload)
      alert("User Successfully registered!!!! Thanks You")
      handleClose()
      getUserData()
    }
  }

  return (
    <>
      <div className='d-flex justify-content-center mt-2 mb-0'>
        <Button className="btn btn-success" onClick={handleShow}> Create a New User</Button>
      </div>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Registratin Of New User</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                placeholder=""
                autoFocus
                name="name"
                value={name}
                onChange={e => setName(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>User Name</Form.Label>
              <Form.Control
                type="text"
                placeholder=""
                autoFocus
                name="userName"
                value={userName}
                onChange={e => setUserName(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="text"
                placeholder=""
                autoFocus
                name="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>City</Form.Label>
              <Form.Control
                type="text"
                placeholder=""
                autoFocus
                name="city"
                value={city}
                onChange={e => setCity(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Company Name</Form.Label>
              <Form.Control
                type="text"
                placeholder=""
                autoFocus
                name="companyName"
                value={companyName}
                onChange={e => setCompanyName(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Website</Form.Label>
              <Form.Control
                type="text"
                placeholder=""
                autoFocus
                name="website"
                value={website}
                onChange={e => setWebsite(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Mobile</Form.Label>
              <Form.Control
                type="text"
                placeholder=""
                autoFocus
                name="mobile"
                value={mobile}
                onChange={e => setMobile(e.target.value)}
              />
            </Form.Group>

          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSaveData}>
            {editId ? "Update Changes" : "Save Changes"}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
