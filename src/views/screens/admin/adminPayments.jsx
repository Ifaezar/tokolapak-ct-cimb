import React from "react";
import { Table, Alert } from 'reactstrap'
import "./AdminDashboard.css";
import Axios from "axios";
import { connect } from 'react-redux'
import { API_URL } from "../../../constants/API";

import ButtonUI from "../../components/Button/Button";

import swal from "sweetalert";

class AdminPayment extends React.Component {
    state = {
        listDataTransaction: [],
        isPending: true,
        username: ''
    }
    componentDidMount() {
        this.getData()
        this.showAcceptCart()
        this.showPendingCart()
    }
    getData = () => {
        Axios.get(`${API_URL}/transaction`)
            .then(res => {
                this.setState({ listDataTransaction: res.data })
            })
            .catch(err => {
                console.log(err)
            })
    }

    pendingCart = () => {
        this.setState({ isPending: true })
    }

    AcceptCart = () => {
        this.setState({ isPending: false })
    }

    confirmPayment = (id) => {
        Axios.patch(`${API_URL}/transaction/${id}`, {
            status: "accept"
        })
            .then(res => {
                swal("Success", "Payment Accepted", "success")
                this.showPendingCart()
                this.showAcceptCart()
            })
    }

    showPendingCart = () => {
        return (
            <div>
                <Table>
                    <thead style={{ backgroundColor: "grey" }}>
                        <tr>
                            <td>No</td>
                            <td>Username</td>
                            <td>Price</td>
                            <td>Status</td>
                            <td>Action</td>
                        </tr>
                    </thead>
                    {this.state.listDataTransaction.map((val, idx) => {
                        if (val.status == "pending") {
                            return (
                                <>
                                    <tbody >
                                        <tr>
                                            <td>{idx + 1}</td>
                                            <td>{val.username}</td>
                                            <td>{new Intl.NumberFormat("id-ID", {
                                                style: "currency",
                                                currency: "IDR",
                                            }).format(val.totalPrice)}</td>
                                            <td>{val.status}</td>
                                            <ButtonUI type="outlined"
                                                className={`auth-screen-btn mt-4`}
                                                onClick={() => { this.confirmPayment(val.id) }}
                                            >Confirm Payment
                                            </ButtonUI>
                                        </tr>
                                    </tbody>
                                </>
                            )
                        }
                    })
                    }
                </Table>
            </div>
        )
    }

    showAcceptCart = () => {
        return (
            <div>
                <Table>
                    <thead style={{ backgroundColor: "grey" }}>
                        <tr>
                            <td>No</td>
                            <td>Username</td>
                            <td>Price</td>
                            <td>Status</td>
                        </tr>
                    </thead>
                    {this.state.listDataTransaction.map((val, idx) => {
                        if (val.status == "accept") {
                            return (
                                <>
                                    <tbody >
                                        <tr>
                                            <td>{idx + 1}</td>
                                            <td>{val.username}</td>
                                            <td>{new Intl.NumberFormat("id-ID", {
                                                style: "currency",
                                                currency: "IDR",
                                            }).format(val.totalPrice)}</td>
                                            <td>{val.status}</td>
                                        </tr>
                                    </tbody>
                                </>
                            )
                        }
                    })
                    }
                </Table>
            </div>
        )
    }

    render() {
        return (
            <div>
                <h1>Payment Details</h1>
                <div className="container">
                    <div className="d-flex flex-row">
                        <ButtonUI type="outlined"
                            className={`auth-screen-btn ${this.state.isPending == true ? "active" : null} mt-4 mr-3`}
                            onClick={this.pendingCart}>Pending
                    </ButtonUI>
                        <ButtonUI type="outlined"
                            className={`auth-screen-btn ${this.state.isPending == false ? "active" : null} mt-4`}
                            onClick={this.AcceptCart}>Accept
                    </ButtonUI>
                    </div>
                </div>
                {
                    this.state.isPending ? (
                        this.showPendingCart()
                    ) :
                        this.showAcceptCart()
                }
            </div>
        )
    }
}

const mapsStateToProps = (state) => {
    return {
        user: state.user
    }
}
export default connect(mapsStateToProps)(AdminPayment)