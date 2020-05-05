import React from "react";
import { Table, Alert } from 'reactstrap'
import "./user.css";
import Axios from "axios";
import { connect } from 'react-redux'
import { API_URL } from "../../../constants/API";

import ButtonUI from "../../components/Button/Button";
import TextField from "../../components/TextField/TextField";

class History extends React.Component {
    state = {
        listData: [],
        listProduct: [],
        isActive: false
    }
    componentDidMount() {
        this.getDataHistory()
    }
    getDataHistory = () => {
        Axios.get(`${API_URL}/transaction`, {
            params: {
                userId: this.props.user.id,
                status: "accept",
                _embed: "transactionDetails"
            }
        })
            .then(res => {
                console.log(res.data)
                this.setState({ listData: res.data })
            })
            .catch(err => {
                console.log(err)
            })
    }

    detailDataHistory = (id) => {
        const { transactionDetails } = this.state.listData[id]
        this.setState({ listProduct: transactionDetails })
        this.setState({ isActive: true })

    }
    showDataHistory = () => {
        return (
            this.state.listProduct.map((val, idx) => {
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

    render() {
        return (
            <div>
                <Table>
                    <thead style={{ backgroundColor: "grey" }}>
                        <tr>
                            <td>No</td>
                            <td>Total Price</td>
                            <td>Status</td>
                            <td>Action</td>
                        </tr>
                    </thead>
                    {this.state.listData.map((val, idx) => {
                        return (
                            <>
                                <tbody >
                                    <tr>
                                        <td>{idx + 1}</td>
                                        <td>{new Intl.NumberFormat("id-ID", {
                                            style: "currency",
                                            currency: "IDR",
                                        }).format(val.totalPrice)}</td>
                                        <td>{val.status}</td>
                                        <td>
                                            <ButtonUI
                                                onClick={() => this.detailDataHistory(idx)}  >Details</ButtonUI></td>
                                    </tr>
                                </tbody>
                            </>
                        )
                    })
                    }
                </Table>

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
                        {this.showDataHistory()}

                    </tbody>
                </Table>
            </div >
        )
    }
}

const mapsStateToProps = (state) => {
    return {
        user: state.user
    }
}

export default connect(mapsStateToProps)(History)