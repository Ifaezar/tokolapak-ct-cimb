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
                res.data.map(val =>{
                    this.setState({listProduct:[...this.state.listProduct,val.transactionDetails]})
                })
            })
    }

    showUserData = () =>{
        return this.state.listData.map((val,idx)=>{
            return(
                <>
                    <tr>
                        <td>{idx+1}</td>
                        <td>{val.username}</td>
                        <td>{val.transactionDetails.length}</td>
                    </tr>
                </>
            )
        })
    }

    showProductData = () =>{
        console.log(this.state.listProduct)
        return this.state.listProduct.map((val,idx)=>{
            return(
                <>
                    <tr>
                        <td>{idx+1}</td>
                        <td>{val.productId}</td>
                        <td>{val.quantity}</td>
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
                <br/>
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