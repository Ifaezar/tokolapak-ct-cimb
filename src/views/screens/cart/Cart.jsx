import React from 'react'
import { connect } from 'react-redux'
import "./Cart.css"
import Axios from 'axios'
import { Link } from "react-router-dom";
import { Table, Alert } from 'reactstrap'
import { API_URL } from '../../../constants/API'
import ButtonUI from '../../components/Button/Button'
import swal from 'sweetalert'
import { copyFileSync } from 'fs';


class Cart extends React.Component {
    state = {
        listData: [],
        checOutItem: [],
        listItems: [],
        totalPrice: 0,
        jasaPengiriman: 'economy',
        hargaPengiriman: 0,
        isCheckOut: false
    }
    componentDidMount() {
        this.getData()
        this.checkOut()
    }
    getData = () => {
        Axios.get(`${API_URL}/cart`, {
            params: {
                userId: this.props.user.id,
                _expand: "product"
            }
        })
            .then(res => {
                this.setState({ listData: res.data })
                console.log(this.state.listData)

            })
            .catch(err => {
                console.log(err)
            })
    }
    deleteData = (id) => {
        Axios.delete(`${API_URL}/cart/${id}`)
            .then(res => {
                console.log(res)
                swal("Delete Data", "Deleted", "success")
                this.getData()
            })
            .catch(err => {
                console.log(err)
            })
    }
    componentWillUpdate() {
        this.tableProduct()
    }

    inputHandler = (e) => {
        const { value } = e.target
        this.setState({ jasaPengiriman: value })
    }

    checkboxHandler = (e, idx) => {
        const { checked } = e.target
        if (checked) {
            this.setState({ checOutItem: [...this.state.checOutItem, idx] })
        } else {
            this.setState({
                checOutItem: [
                    ...this.state.checOutItem.filter(val => val !== idx)
                ]
            })
        }
    }

    tableProduct = () => {
        if(this.state.listData.length > 0){

            return this.state.listData.map((val, idx) => {
                return (
                    <>
                        <tbody>
                            <tr>
                                <td>{idx + 1}</td>
                                <td>{val.product.productName}</td>
                                <td>
                                    {new Intl.NumberFormat("id-ID", {
                                        style: "currency",
                                        currency: "IDR",
                                    }).format(val.product.price)}
                                </td>
                                <td>{val.product.category}</td>
                                <td>{val.quantity}</td>
                                <td><img src={val.product.image} alt="" style={{ width: "100", height: "200px", objectFit: 'contain' }} /></td>
                                {/* <td>
                                    <input
                                        type="checkbox"
                                        onChange={(e) => this.checkboxHandler(e, idx)}
                                        className="form-control" />
                                </td> */}
                                <td><ButtonUI onClick={() => this.deleteData(val.id)}>Delete</ButtonUI></td>
                            </tr>
                        </tbody>
                    </>
                )
            })
        }
    }

    checkOutHandler = () => {
        this.setState({ isCheckOut: true })
        const { jasaPengiriman, hargaPengiriman } = this.state
        let totalPriceItem = 0
        this.state.listData.map(val => {
            totalPriceItem = totalPriceItem + val.product.price * val.quantity
        })
        if (jasaPengiriman == "instant") {
            this.setState({ hargaPengiriman: 100000 })
            totalPriceItem += hargaPengiriman
        } else if (jasaPengiriman == "sameDay") {
            this.setState({ hargaPengiriman: 50000 })
            totalPriceItem += 50000
        } else if (jasaPengiriman == "express") {
            this.setState({ hargaPengiriman: 20000 })
            totalPriceItem += 20000
        } else {
            this.setState({ hargaPengiriman: 0 })
            totalPriceItem = totalPriceItem
        }
        this.setState({ totalPrice: totalPriceItem })

    }

    checkOut = () => {
        return (
            <div>
                <Table>
                    <thead style={{ backgroundColor: "grey" }}>
                        <tr>
                            <td>No</td>
                            <td>Product</td>
                            <td>Price</td>
                            <td>Quantity</td>
                            <td>Sub Total</td>
                        </tr>
                    </thead>
                    {this.state.listData.map((val, idx) => {
                        return (
                            <>
                                <tbody >
                                    <tr>
                                        <td>{idx + 1}</td>
                                        <td>
                                            <div className="row" >
                                                <div className="col-4">
                                                    <img src={val.product.image}
                                                        alt=""
                                                        style={{ width: "100", height: "150px", objectFit: 'contain' }} />
                                                </div>
                                                <div className="col-8">
                                                    <h3>{val.product.productName} </h3>
                                                    <p>{val.product.desc}</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td>{new Intl.NumberFormat("id-ID", {
                                            style: "currency",
                                            currency: "IDR",
                                        }).format(val.product.price)}</td>
                                        <td>{val.quantity}</td>
                                        <td>
                                            {new Intl.NumberFormat("id-ID", {
                                                style: "currency",
                                                currency: "IDR",
                                            }).format(val.quantity * val.product.price)}
                                        </td>
                                    </tr>
                                </tbody>
                            </>
                        )
                    })
                    }
                    <tfoot>
                        <tr>
                            <td
                                colSpan="4"
                                className="text-right">
                                Jasa Pengiriman = {this.state.jasaPengiriman}

                            </td>

                        </tr>
                        <tr>
                            <td colSpan="4"
                                className="text-right">
                                Total Harga Pengiriman =
                            </td>
                            {
                                this.state.jasaPengiriman == "economy" ? (
                                    <td>
                                        Free
                                     </td>
                                ) : <td>
                                        {new Intl.NumberFormat("id-ID", {
                                            style: "currency",
                                            currency: "IDR",
                                        }).format(this.state.hargaPengiriman)}
                                    </td>
                            }
                        </tr>
                        <tr>
                            <td colSpan="4"
                                className="text-right">
                                Total Price =
                            </td>
                            <td>
                                {new Intl.NumberFormat("id-ID", {
                                    style: "currency",
                                    currency: "IDR",
                                }).format(this.state.totalPrice)}
                            </td>
                        </tr>
                    </tfoot>
                </Table>
                <ButtonUI onClick={() => this.confirmHandler()} style={{ float: "right" }} >Confirm</ButtonUI>
            </div >
        )
    }

    confirmHandler = () => {
        Axios.get(`${API_URL}/cart`, {
            params: {
                userId: this.props.user.id,
                _expand: "product"
            }
        })
            .then(res => {
                console.log(res.data)
                res.data.map((val) => {
                    // this.setState({ listItems: [...this.state.listItems, val.product] })
                    console.log(res.data)
                    Axios.delete(`${API_URL}/cart/${val.id}`)
                        .then(res => {
                            console.log(res)
                        })
                        .catch(err => {
                            console.log(err)
                        })
                })
                Axios.post(`${API_URL}/transaction`, {
                    userId: this.props.user.id,
                    totalPrice: this.state.totalPrice,
                    username: this.props.user.username,
                    status: "pending",
                    checkOutDate: new Date()

                    // items: this.state.listItems,
                })
                    .then(res => {
                        this.state.listData.map(val => {
                            Axios.post(`${API_URL}/transactionDetails`, {
                                transactionId: res.data.id,
                                productId: val.product.id,
                                price: val.product.price,
                                totalPrice: val.product.price * val.quantity,
                                quantity: val.quantity,
                            })
                                .then(res => {
                                    console.log(res)
                                })
                                .catch(err => {
                                    console.log(err)
                                })
                        })
                        // console.log(res.data)
                        swal("Success!", "Tunggu pemebelian di Acc oleh admin", "success")
                        this.setState({ listData: '' })
                    })
            })
            .catch(err => {
                console.log(err)
            })
    }

    render() {
        return (
            <div className="container ">
                {
                    this.state.listData.length > 0 ? (
                        <div>
                            <h1 className="text-center">Cart</h1>
                            <div >
                                <Table>
                                    <thead>
                                        <tr>
                                            <td>No</td>
                                            <td>Product Name</td>
                                            <td>Price</td>
                                            <td>Category</td>
                                            <td>Quantity</td>
                                            <td>Image</td>
                                            <td></td>
                                        </tr>
                                    </thead>
                                    {this.tableProduct()}
                                </Table>
                                <p>Pilih Metode Pengiriman</p>
                                <select
                                    value={this.state.jasaPengiriman}
                                    className="custom-text-input h-100 pl-3"
                                    onChange={(e) => this.inputHandler(e)}
                                >
                                    <option value="instant">Instant = Rp 100.000,00</option>
                                    <option value="sameDay">Same Day = Rp 50.000,00</option>
                                    <option value="express">Express = Rp 20.0000,00</option>
                                    <option value="economy">Economy = Free</option>
                                </select>
                                <ButtonUI onClick={() => this.checkOutHandler()} style={{ float: "right" }} >Chek Out</ButtonUI>
                                {
                                    this.state.isCheckOut ? (
                                        this.checkOut()
                                    ) : null
                                }
                            </div>
                        </div>
                    ) :
                        <Alert>
                            <p>Anda Belum Belanja silahkan <Link to="/">Belanja</Link></p>
                        </Alert>
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

export default connect(mapsStateToProps)(Cart)
