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
        listDataTransactionPending: [],
        listDataTransactionAccept: [],
        transactionDetailsPending: [],
        transactionDetailsAccept: [],
        listProduct: [],
        listData: [],
        isPending: true,
        isActive: false,
        username: ''
    }
    componentDidMount() {
        this.getDataPending()
        this.getDataAccept()
        this.showPendingCart()
    }
    getDataPending = () => {
        Axios.get(`${API_URL}/transaction`, {
            params: {
                status: "pending",
                _embed: "transactionDetails"
            }
        })
            .then(res => {
                this.setState({ listDataTransactionPending: res.data })
            })
            .catch(err => {
                console.log(err)
            })
    }
    getDataAccept = () => {
        Axios.get(`${API_URL}/transaction`, {
            params: {
                status: "accept",
                _embed: "transactionDetails"
            }
        })
            .then(res => {
                this.setState({ listDataTransactionAccept: res.data })
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

    detailDataPending = (id) => {
        const { transactionDetails } = this.state.listDataTransactionPending[id]
        this.setState({ transactionDetailsPending: transactionDetails })
        this.setState({ isActive: true })
    }

    detailDataAccept = (id) => {
        const { transactionDetails } = this.state.listDataTransactionAccept[id]
        this.setState({ transactionDetailsAccept: transactionDetails })
        this.setState({ isActive: true })
    }

    confirmPayment = (id) => {
        var today = new Date()
        var date = today.getDate() + '-' + (today.getMonth()) + '-' + today.getFullYear()
        var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds()
        var dateTime = date + ' ' + time
        Axios.patch(`${API_URL}/transaction/${id}`, {
            status: "accept",
            dateAccepted: dateTime
        })
            .then(res => {
                swal("Success", "Payment Accepted", "success")
                this.showPendingCart()
            })
    }

    showDataHistory = () => {
        if (this.state.isActive) {
            return (
                this.state.transactionDetailsPending.map((val, idx) => {
                    return (
                        <tr>
                            <td>{idx + 1}</td>
                            <td>{val.id}</td>
                            <td>
                                {new Intl.NumberFormat("id-ID", {
                                    style: "currency",
                                    currency: "IDR",
                                }).format(val.price)}</td>
                            <td>{val.quantity}</td>
                            <td>
                                {new Intl.NumberFormat("id-ID", {
                                    style: "currency",
                                    currency: "IDR",
                                }).format(val.totalPrice)}</td>
                        </tr>
                    )
                })
            )
        }
    }

    showDataHistoryAccept = () => {
        if (this.state.isActive) {
            return (
                this.state.transactionDetailsAccept.map((val, idx) => {
                    return (
                        <tr>
                            <td>{idx + 1}</td>
                            <td>{val.id}</td>
                            <td>
                                {new Intl.NumberFormat("id-ID", {
                                    style: "currency",
                                    currency: "IDR",
                                }).format(val.price)}</td>
                            <td>{val.quantity}</td>
                            <td>
                                {new Intl.NumberFormat("id-ID", {
                                    style: "currency",
                                    currency: "IDR",
                                }).format(val.totalPrice)}</td>
                        </tr>
                    )
                })
            )
        }
    }

    showPendingCart = () => {
        if (this.state.isPending == true) {
            return (
                <div>
                    <Table>
                        <thead style={{ backgroundColor: "grey" }}>
                            <tr>
                                <td>No</td>
                                <td>Username</td>
                                <td>Price</td>
                                <td>Check Out Date</td>
                                <td>Status</td>
                                <td>Action</td>
                            </tr>
                        </thead>
                        {this.state.listDataTransactionPending.map((val, idx) => {
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
                                                <td>{val.checkOutDate}</td>
                                                <td>{val.status}</td>
                                                <ButtonUI type="outlined"
                                                    className={`auth-screen-btn mt-4`}
                                                    onClick={() => { this.confirmPayment(val.id) }}
                                                >Confirm Payment
                                                </ButtonUI>
                                                <ButtonUI
                                                    onClick={() => this.detailDataPending(idx)}
                                                >Details</ButtonUI>
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
        } else {
            return (
                <div>
                    <Table>
                        <thead style={{ backgroundColor: "grey" }}>
                            <tr>
                                <td>No</td>
                                <td>Username</td>
                                <td>Check Out Date</td>
                                <td>Accepted Date</td>
                                <td>Price</td>
                                <td>Status</td>
                            </tr>
                        </thead>
                        {this.state.listDataTransactionAccept.map((val, idx) => {
                            if (val.status == "accept") {
                                return (
                                    <>
                                        <tbody >
                                            <tr>
                                                <td>{idx + 1}</td>
                                                <td>{val.username}</td>
                                                <td>{val.checkOutDate}</td>
                                                <td>{val.dateAccepted}</td>
                                                <td>{new Intl.NumberFormat("id-ID", {
                                                    style: "currency",
                                                    currency: "IDR",
                                                }).format(val.totalPrice)}</td>
                                                <td>{val.status}</td>
                                                <td>
                                                        <ButtonUI
                                                    onClick={() => this.detailDataAccept(idx)}
                                                    >Details</ButtonUI>
                                                    </td>
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
                {this.showPendingCart()}
                <h1>Item Detail</h1>
                <Table>
                    <thead>
                        <tr>
                            <td>No</td>
                            <td>Product Id</td>
                            <td>Price Product</td>
                            <td>Quantity</td>
                            <td>Total Price</td>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            this.state.isPending ? (
                                this.showDataHistory()
                            ): this.showDataHistoryAccept()
                        }
                    </tbody>
                </Table>
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