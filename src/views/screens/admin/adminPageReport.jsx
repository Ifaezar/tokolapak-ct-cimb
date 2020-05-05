import React from "react";
import { Table, Alert } from 'reactstrap'
import "./AdminDashboard.css";
import Axios from "axios";
import { connect } from 'react-redux'
import { API_URL } from "../../../constants/API";

import ButtonUI from "../../components/Button/Button";

import swal from "sweetalert";

class AdminPageReport extends React.Component {
    state = {
        userCount: 0,
        productCount: 0,
        listData: [],
        listUsername: [],
        listProduct: []
    }

    componentDidMount() {
        this.getData()
    }

    getData = () => {
        Axios.get(`${API_URL}/transaction`, {
            params: {
                status: "accept",
                _embed: "transactionDetails"
            }
        })
            .then(res => {
                console.log(res.data)
                this.setState({ listData: res.data })
                Axios.get(`${API_URL}/users`)
                    .then(res => {
                        this.setState({ listUsername: res.data })
                    })
                    .catch(err => {
                        console.log(err)
                    })
                Axios.get(`${API_URL}/products`)
                    .then(res => {
                        this.setState({ listProduct: res.data })
                    })
                    .catch(err => {
                        console.log(err)
                    })
            })
    }

    showUserData = () => {
        return this.state.listUsername.map((value, idx) => {
            let totalBelanja = 0
            if(value.role == "user"){
                this.state.listData.map((val) => {
                    if (val.username == value.username) {
                        totalBelanja += val.totalPrice
                    } else {
                        totalBelanja = totalBelanja
                    }
                })
                return (
                    <>
                        <tr>
                            <td>{idx + 1}</td>
                            <td>{value.username}</td>
                            <td>{totalBelanja}</td>
                        </tr>
                    </>
                )
            }
        })
    }

    showProductData = () => {
        return this.state.listProduct.map((val, idx) => {
            let totalQuantityProduct = 0
            this.state.listData.map(valueListData => {
                valueListData.transactionDetails.map(valueTransactionDetail =>{
                    if (val.id == valueTransactionDetail.productId) {
                        totalQuantityProduct += valueTransactionDetail.quantity
                    } else {
                        totalQuantityProduct = totalQuantityProduct
                    }
                })
            })
            return (
                <>
                    <tr>
                        <td>{idx + 1}</td>
                        <td>{val.productName}</td>
                        <td>{totalQuantityProduct}</td>
                    </tr>
                </>
            )
        })
    }
    render() {
        return (
            <div>
                <h1>Data User</h1>
                <Table>
                    <thead>
                        <tr>
                            <td>no</td>
                            <td>Username</td>
                            <td>Jumlah Belanja</td>
                        </tr>
                    </thead>
                    <tbody>
                        {this.showUserData()}
                    </tbody>
                </Table>
                <br />
                <h1>Data product</h1>
                <Table>
                    <thead>
                        <tr>
                            <td>no</td>
                            <td>Product Id</td>
                            <td>Jumlah Dibeli</td>
                        </tr>
                    </thead>
                    <tbody>
                        {this.showProductData()}
                    </tbody>
                </Table>
            </div>
        )
    }
}

export default AdminPageReport