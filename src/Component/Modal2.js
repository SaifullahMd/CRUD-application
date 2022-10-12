import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import Axios from 'axios';
// destructue 
export default function Example({ getUserApis, editId }) {
  const [show, setShow] = useState(false);
  // const [dataApi, setDataApi] = useState([])   ----- Use les
  const [name, setName] = useState("");
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [city, setCity] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [website, setWebsite] = useState("");
  const [phone, setPhone] = useState("");

  // const handleClose = () => setShow(false);
  // const handleShow = () => setShow(true);
  // console.log("editId", editId, "dataApi", dataApi)

  // Once click on add new user btn
  const handleShow = () => setShow(true);

  useEffect(() => {
    if (editId) {
      getUserApi()
    }
  }, [editId])

  const getUserApi = async () => {
    const result = await Axios.get("http://localhost:8080/users/" + editId)
    // setDataApi(result.data)
    
    setName(result.data.name)
    setEmail(result.data.email)
    setPhone(result.data.phone)
    handleShow()
  }

 


  // once click on cancle btn

  const handleClose = () => {
    setShow(false);
    setName("");
    setUserName("");
    setEmail("");
    setCity("");
    setCompanyName("");
    setWebsite("");
    setPhone("");
  }

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
      phone: phone,
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
      getUserApis()
    }
    else {
      await Axios.post("http://localhost:8080/users", payload)
      alert("User Successfully registered!!!! Thanks You")
      handleClose()
      getUserApis()
    }
  }

  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        Create User
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
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
                onChange={(e) => setName(e.target.value)}
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
                onChange={(e) => setEmail(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Phone</Form.Label>
              <Form.Control
                type="text"
                placeholder=""
                autoFocus
                name="phone"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </Form.Group>
            {/* <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Website</Form.Label>
              <Form.Control
                type="email"
                placeholder=""
                autoFocus
              />
            </Form.Group> */}

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
