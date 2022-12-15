import React, { useEffect, useState, useRef } from 'react';
import { Trash, PencilSquare } from 'react-bootstrap-icons';
import ReactHTMLTableToExcel from "react-html-table-to-excel";

const Users = () => {
  const host = "http://localhost:5000"
  const [users, setUsers] = useState([]);

  const getUsers = async () => {
    const response = await fetch(`${host}/api/fetchallusers`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      }
    });
    const json = await response.json();
    setUsers(json);
  }

  useEffect(() => {
    getUsers();
  }, []);

  const addUsers = async () => {
    const response = await fetch(`${host}/api/addusers`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      }
    });
    await response.json();
  }

  //Delete a User
  const deleteUSer = async (id) => {
    const response = await fetch(`${host}/api/deleteuser/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      }
    });
    const json = await response.json();
    console.log(json);

    console.log("Deleting user with id :" + id);
    const newUser = users.filter((users) => { return users.id !== id })
    setUsers(newUser)
  }

  //Delete All Users
  const deleteAllUsers = async (__v) => {
    const response = await fetch(`${host}/api/deleteallusers/`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      }
    });
    await response.json();
    const newUser = users.filter((users) => { return users.__v === __v })
    setUsers(newUser)
  }

  //Edit user
  const editUser = async (id, name, email, gender, status) => {

    const response = await fetch(`${host}/api/updateuser/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, email, gender, status })
    });
    const json = response.json;
    console.log(json);

    let newUser = JSON.parse(JSON.stringify(users))
    for (let index = 0; index < newUser.length; index++) {
      const element = newUser[index];
      if (element.id === id) {
        newUser[index].name = name;
        newUser[index].email = email;
        newUser[index].gender = gender;
        newUser[index].status = status;
        break;
      }
    }
    setUsers(newUser);
  }

  const [user, setUser] = useState({ id: "", ename: "", eemail: "", egender: "", estatus: "" });
  const ref = useRef(null);
  const refClose = useRef(null);
  const refSubmit = useRef(null);

  const updateUser = (currentUser) => {
    ref.current.click();
    setUser({ id: currentUser.id, ename: currentUser.name, eemail: currentUser.email, egender: currentUser.gender, estatus: currentUser.status });
  };

  const SaveNewUser = async (e) => {
    await refSubmit.current.click();
    editUser(user.id, user.ename, user.eemail, user.egender, user.estatus)
    refClose.current.click();
  };

  const onChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  return (
    <div className='container' style={{ minHeight: "80vh" }}>
      <div className='d-flex justify-content-between my-3'>
        <button type="button" onClick={() => { deleteAllUsers(users.__v) }} className="btn btn-danger">Delete All</button>
        <button type="button" onClick={addUsers} className="btn btn-success">Add Users to DB</button>
      </div>

      <ReactHTMLTableToExcel
        id="test-table-xls-button"
        className="download-table-xls-button btn btn-primary"
        table="table-to-xls"
        filename="tablexls"
        sheet="tablexls"
        buttonText="Export Data To ExcelSheet" />

      <button type="button" className="btn btn-primary d-none" ref={ref} data-bs-toggle="modal" data-bs-target="#exampleModal">
        Edit
      </button>
      <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">Edit User</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <form className='my-3' onSubmit={SaveNewUser}>
                <div className="mb-3">
                  <label htmlFor="ename" className="form-label">Name</label>
                  <input type="text" className="form-control" id="ename" name="ename" value={user.ename} onChange={onChange} />
                </div>
                <div className="mb-3">
                  <label htmlFor="edescription" className="form-label">Email - Enter valid Email</label>
                  <input type="email" className="form-control" id="eemail" name="eemail" value={user.eemail} onChange={onChange} />
                </div>
                <div className="mb-3">
                  <label htmlFor="etag" className="form-label">Gender (male or female)</label>
                  <input type="text" className="form-control" id="egender" name="egender" value={user.egender} onChange={onChange} />
                </div>
                <div className="mb-3">
                  <label htmlFor="etag" className="form-label">Status (active or inactive)</label>
                  <input type="text" className="form-control" id="estatus" name="estatus" value={user.estatus} onChange={onChange} />
                </div>
                <button type="button" ref={refClose} className="btn btn-secondary mx-2" data-bs-dismiss="modal">Cancel</button>
                <button disabled={user.ename.length < 4 || (user.egender !== "male" && user.egender !== "female") || (user.estatus !== "active" && user.egender !== "inactive")} type="submit" className="btn btn-primary" ref={refSubmit}>Update User</button>
              </form>
            </div>
          </div>
        </div>
      </div>
      <div style={{overflowX: "Scroll"}}>
      <table className="table" id='table-to-xls'>
        <thead>
          <tr>
            <th scope="col">Id</th>
            <th scope="col">Name</th>
            <th scope="col">Email</th>
            <th scope="col">Gender</th>
            <th scope="col">Status</th>
            <th scope="col">Delete User</th>
            <th scope="col">Update User</th>
          </tr>
        </thead>
        <tbody>
          {users.map((users) => {
            return (
              <tr key={users.id}>
                <th scope="row">{users.id}</th>
                <td>{users.name}</td>
                <td>{users.email}</td>
                <td>{users.gender}</td>
                <td>{users.status}</td>
                <td><Trash style={{ cursor: "pointer" }} onClick={() => { deleteUSer(users.id) }} /></td>
                <td><PencilSquare onClick={() => { updateUser(users) }} style={{ cursor: "pointer" }} /></td>
              </tr>
            )
          })}
        </tbody>
      </table>
      </div>
    </div>
  )
}

export default Users