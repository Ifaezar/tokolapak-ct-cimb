import React from 'react'
import { connect } from 'react-redux'
import "./Cart.css"
import Axios from 'axios'
import {Table} from 'reactstrap'
import { API_URL } from '../../../constants/API'
import ButtonUI from '../../components/Button/Button'
import swal from 'sweetalert'


class Cart extends React.Component {
    state = {
        listData: []
    }
    componentDidMount() {
        this.getData()
    }
    getData = () =>{
        Axios.get(`${API_URL}/cart`, {
            params: {
                userId: this.props.user.id,
                _expand: "product"
            }
        })
            .then(res => {
                console.log(this.props.user.id)
                this.setState({ listData: res.data })
            })
            .catch(err => {
                console.log(err)
            })
    }
    deleteData = (idx) => {
        Axios.delete(`${API_URL}/cart/${idx}`)
        .then(res => {
            console.log(res)
            swal("Delete Data","Deleted","success")
            this.getData()
        })
        .catch(err => {
            console.log(err)
        })
    }
    componentWillUpdate(){
        this.tableProduct()
    }
    

    tableProduct = () => {
        return this.state.listData.map((val,idx )=> {
            return(
            <>
                <tbody>
                    <tr>
                        <td>{idx+1}</td>
                        <td>{val.product.productName}</td>
                        <td>{val.product.price}</td>
                        <td>{val.product.category}</td>
                        <td><img src={val.product.image} alt="" style={{ width: "40", height: "100px" }} /></td>
                        <td><ButtonUI onClick={()=>this.deleteData(val.id)}>Delete</ButtonUI></td>
                    </tr>
                </tbody>

            </>
            )
        })
        
       
    }

    render() {
        return (
            <div className="container ">
                <h1 className="text-center">Cart</h1>
                <div  >
                    <Table>
                        <thead>
                            <tr> 
                                <td>No</td>
                                <td>Product Name</td>
                                <td>Price</td>
                                <td>Category</td>
                                <td>Image</td>
                                <td></td>
                            </tr>
                        </thead>
                        {this.tableProduct()}
                    </Table>
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

export default connect(mapsStateToProps)(Cart)
