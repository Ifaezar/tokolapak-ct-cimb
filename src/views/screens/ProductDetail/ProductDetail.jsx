import React from 'react'
import { connect } from 'react-redux'
import './ProductDetail.css'
import swal from 'sweetalert'
import ButtonUI from '../../components/Button/Button'
import Axios from 'axios'
import { API_URL } from '../../../constants/API'

class ProductDetail extends React.Component {
    state = {
        arrProduct: {
            productName: "",
            price: 0,
            category: "",
            image: "",
            desc: "",
            id: ""
        },
    }

    addToCartHandler = () => {
        Axios.get(`${API_URL}/cart`,{
            params:{
                userId: this.props.user.id,
                productId: this.state.arrProduct.id,
            }
        })
        .then(res =>{
            if(res.data.length == 0){
                Axios.post(`${API_URL}/cart`, {
                    userId: this.props.user.id,
                    productId: this.state.arrProduct.id,
                    quantity: 1,
                })
                .then(res =>{
                    
                    swal("Add to cart","your item has been added to cart", "success")
                })  
                .catch(err => {
                    console.log(err)
                })
            }else{
                Axios.patch(`${API_URL}/cart/${res.data[0].id}`,{
                    quantity: res.data[0].quantity + 1
                })
                .then(res =>{
                    console.log(res.data)
                
                    swal("Add to cart","your item has been added to cart", "success")
                })  
                .catch(err => {
                    console.log(err)
                })
            }
        })
        .catch(err=>{
            console.log(err)
        })
       
    }

    componentDidMount() {
        Axios.get(`${API_URL}/products/`, {
            params: {
                id: `${this.props.match.params.id}`
            }
        })
            .then(res => {
                this.setState({ arrProduct: res.data[0] })
            })
            .catch(err => {
                console.log(err)
            })
    }

    render() {
        const { arrProduct } = this.state
        const { image, productName, price, desc } = arrProduct
        return (
            <div className="container">
                <div className="row py-4">
                    <div className="col-6 text-center" >
                        <img
                            style={{ width: "100%", objectFit: "contain", height: "550px" }}
                            src={image}
                            alt="" />
                    </div>
                    <div className="col-6 d-flex flex-column justify-content-center">
                        <h3>{productName}</h3>
                        <span className="price">
                            {
                                new Intl.NumberFormat("id-ID",
                                    { style: "currency", currency: "IDR" }).format(price)
                            }
                        </span>
                        <p className='mt-4'>{desc}
                        </p>
                        <div className="d-flex flex-row mt-4">
                            <ButtonUI onClick={this.addToCartHandler}> Add To Cart</ButtonUI>
                            <ButtonUI className="ml-4 " type="outlined"> Add To Wishlist</ButtonUI>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

const mapsStateToProps = (state) => {
    return {
        user: state.user
    }

}

export default connect(mapsStateToProps)(ProductDetail)