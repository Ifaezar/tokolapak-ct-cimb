import React from 'react'
import { connect } from 'react-redux'
import { Link } from "react-router-dom";
import { Table, Alert } from 'reactstrap'
import { API_URL } from '../../../constants/API'
import ButtonUI from '../../components/Button/Button'
import swal from 'sweetalert'
import Axios from 'axios';

class Wishlist extends React.Component {
    state = {
        listData: []
    }
    componentDidMount() {
        this.getWishlistData()
    }
    getWishlistData = () => {
        Axios.get(`${API_URL}/wishlists`, {
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

    deleteDataWishlist = (id) => {
        Axios.delete(`${API_URL}/wishlists/${id}`)
            .then(res => {
                console.log(res)
                swal("Delete Data", "Deleted", "success")
                this.getWishlistData()
            })
            .catch(err => {
                console.log(err)
            })
    }

    render() {
        return (
            <div className="text-center">
                <h1>WISHLIST CART</h1>
                <Table>
                    <thead style={{ backgroundColor: "grey" }}>
                        <tr>
                            <td>No</td>
                            <td>Product Name</td>
                            <td>Price</td>
                            <td>Category</td>
                            <td>Description</td>
                            <td>Image</td>
                        </tr>
                    </thead>
                    {this.state.listData.map((val, idx) => {
                        return (
                            <>
                                <tbody >
                                    <tr>
                                        <td>{idx + 1}</td>
                                        <td>{val.product.productName}</td>
                                        <td>{new Intl.NumberFormat("id-ID", {
                                            style: "currency",
                                            currency: "IDR",
                                        }).format(val.product.price)}</td>
                                        <td>{val.product.category}</td>
                                        <td>{val.product.desc}</td>
                                        <td>
                                            <img src={val.product.image}
                                                alt=""
                                                style={{ width: "100", height: "150px", objectFit: 'contain' }} />
                                        </td>
                                        <td>
                                            <div className="d-flex flex-row align-items-center">
                                                <ButtonUI className="mr-3"
                                                >Add To Cart</ButtonUI>
                                                <ButtonUI
                                                    style={{ backgroundColor: "red", color: "black" }} 
                                                    onClick={(_) => this.deleteDataWishlist(val.id)}>Delete</ButtonUI>
                                            </div>
                                        </td>
                                    </tr>
                                </tbody>
                            </>
                        )
                    })
                    }
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

export default connect(mapsStateToProps)(Wishlist)