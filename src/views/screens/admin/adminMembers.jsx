import React from "react";
import "./AdminDashboard.css";
import { Modal, ModalHeader, ModalBody } from "reactstrap";
import Axios from "axios";

import { API_URL } from "../../../constants/API";

import ButtonUI from "../../components/Button/Button";
import TextField from "../../components/TextField/TextField";

import swal from "sweetalert";

class AdminMembers extends React.Component {
    state = {
        userList: [],
        createForm: {
            username: "",
            password: "",
            role: "admin",
            email: "",
            name:""
        },
        editForm: {
            id: 0,
            username: "",
            password: "",
            role: "",
            email: "",
            name:""
        },
        activeProducts: [],
        modalOpen: false,
    };

    getProductList = () => {
        Axios.get(`${API_URL}/users`)
            .then((res) => {
                this.setState({ userList: res.data });
            })
            .catch((err) => {
                console.log(err);
            });
    };

    renderProductList = () => {
        return this.state.userList.map((val, idx) => {
            const { id, username, email, role, password, name } = val;
            return (
                <>
                    <tr
                        onClick={() => {
                            if (this.state.activeProducts.includes(idx)) {
                                this.setState({
                                    activeProducts: [
                                        ...this.state.activeProducts.filter((item) => item !== idx),
                                    ],
                                });
                            } else {
                                this.setState({
                                    activeProducts: [...this.state.activeProducts, idx],
                                });
                            }
                        }}
                    >
                        <td> {id} </td>
                        <td> {username} </td>
                        <td>{name}</td>
                        <td>{email}</td>
                    </tr>
                    <tr
                        className={`collapse-item ${
                            this.state.activeProducts.includes(idx) ? "active" : null
                            }`}
                    >
                        <td className="" colSpan={3}>
                            <div className="d-flex justify-content-around align-items-center">
                                <div className="d-flex">

                                    <div className="d-flex flex-column ml-4 justify-content-center">
                                        <h5>Username : {username}</h5>
                                        <h5>Fullname : {name}</h5>
                                        <h5>Password : {password}</h5>
                                        <h5>Role : {role}</h5>
                                        <h5>Email : {email}</h5>
                                    </div>
                                </div>
                                <div className="d-flex flex-column align-items-center">
                                    <ButtonUI
                                        onClick={(_) => this.editBtnHandler(idx)}
                                        type="contained"
                                    >
                                        Edit
                      </ButtonUI>
                                    <ButtonUI className="mt-3" type="textual">
                                        Delete
                      </ButtonUI>
                                </div>
                            </div>
                        </td>
                    </tr>
                </>
            );
        });
    };
    inputHandler = (e, field, form) => {
        let { value } = e.target;
        this.setState({
            [form]: {
                ...this.state[form],
                [field]: value,
            },
        });
    };
    createProductHandler = () => {
        Axios.post(`${API_URL}/users`, this.state.createForm)
            .then((res) => {
                swal("Success!", "Your user has been added to the list", "success");
                this.setState({
                    createForm: {
                        username: "",
                        email: "",
                        role: "admin",
                        password: "",
                    },
                });
                this.getProductList();
            })
            .catch((err) => {
                swal("Error!", "Your user could not be added to the list", "error");
            });
    };
    editBtnHandler = (idx) => {
        this.setState({
            editForm: {
                ...this.state.userList[idx],
            },
            modalOpen: true,
        });
    };
    editProductHandler = () => {
        Axios.put(
            `${API_URL}/users/${this.state.editForm.id}`,
            this.state.editForm
        )
            .then((res) => {
                swal("Success!", "Your user has been edited", "success");
                this.setState({ modalOpen: false });
                this.getProductList();
            })
            .catch((err) => {
                swal("Error!", "Your user could not be edited", "error");
                console.log(err);
            });
    };
    toggleModal = () => {
        this.setState({ modalOpen: !this.state.modalOpen });
    };
    componentDidMount() {
        this.getProductList();
    }
    render() {
        return (
            <div className="container py-4">
                <div className="dashboard">
                    <caption className="p-3">
                        <h2>Members</h2>
                    </caption>
                    <table className="dashboard-table">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Name</th>
                                <th>Full Name</th>
                                <th>email</th>
                            </tr>
                        </thead>
                        <tbody>{this.renderProductList()}</tbody>
                    </table>
                </div>
                <div className="dashboard-form-container p-4">
                    <caption className="mb-4 mt-2">
                        <h2>Add Admin Member</h2>
                    </caption>
                    <div className="row">
                        <div className="col-4">
                            <TextField
                                value={this.state.createForm.username}
                                placeholder="Admin Username"
                                onChange={(e) =>
                                    this.inputHandler(e, "username", "createForm")
                                }
                            />
                        </div>
                        <div className="col-4">
                            <TextField
                                value={this.state.createForm.email}
                                placeholder="Email"
                                onChange={(e) => this.inputHandler(e, "email", "createForm")}
                            />
                        </div>
                        <div className="col-4">
                            <TextField
                                value={this.state.createForm.name}
                                placeholder="Full Name"
                                onChange={(e) => this.inputHandler(e, "name", "createForm")}
                            />
                        </div>
                        <div className="col-6 mt-3">
                            <TextField
                                value={this.state.createForm.password}
                                placeholder="password"
                                onChange={(e) => this.inputHandler(e, "password", "createForm")}
                            />
                        </div>
                        <div className="col-6 mt-3">
                            <select
                                value={this.state.createForm.role}
                                placeholder="role"
                                onChange={(e) => this.inputHandler(e, "role", "createForm")}
                            >
                                <option value="admin">Admin</option>
                            </select>
                        </div>
                        <div className="col-3 mt-3">
                            <ButtonUI onClick={this.createProductHandler} type="contained">
                                Add Admin
                  </ButtonUI>
                        </div>
                    </div>
                </div>
                <Modal
                    toggle={this.toggleModal}
                    isOpen={this.state.modalOpen}
                    className="edit-modal"
                >
                    <ModalHeader toggle={this.toggleModal}>
                        <caption>
                            <h3>Edit Member</h3>
                        </caption>
                    </ModalHeader>
                    <ModalBody>
                        <div className="row">
                            <div className="col-4">
                                <TextField
                                    value={this.state.editForm.username}
                                    placeholder="Username"
                                    onChange={(e) =>
                                        this.inputHandler(e, "username", "editForm")
                                    }
                                />
                            </div>
                            <div className="col-4">
                                <TextField
                                    value={this.state.editForm.email}
                                    placeholder="Email"
                                    onChange={(e) => this.inputHandler(e, "email", "editForm")}
                                />
                            </div>
                            <div className="col-4">
                                <TextField
                                    value={this.state.editForm.name}
                                    placeholder="Full Name"
                                    onChange={(e) => this.inputHandler(e, "name", "editForm")}
                                />
                            </div>
                            <div className="col-6 mt-3">
                                <TextField
                                    value={this.state.editForm.password}
                                    placeholder="password"
                                    onChange={(e) => this.inputHandler(e, "password", "editForm")}
                                />
                            </div>
                            <div className="col-6 mt-3">
                                <select
                                    value={this.state.editForm.role}
                                    placeholder="role"
                                    onChange={(e) => this.inputHandler(e, "role", "editForm")}
                                >
                                    <option value="admin">Admin</option>
                                    <option value="user">User</option>
                                </select>
                            </div>
                            <div className="col-5 mt-3 offset-1">
                                <ButtonUI
                                    className="w-100"
                                    onClick={this.toggleModal}
                                    type="outlined"
                                >
                                    Cancel
                    </ButtonUI>
                            </div>
                            <div className="col-5 mt-3">
                                <ButtonUI
                                    className="w-100"
                                    onClick={this.editProductHandler}
                                    type="contained"
                                >
                                    Save
                    </ButtonUI>
                            </div>
                        </div>
                    </ModalBody>
                </Modal>
            </div>
        );
    }
}

export default AdminMembers