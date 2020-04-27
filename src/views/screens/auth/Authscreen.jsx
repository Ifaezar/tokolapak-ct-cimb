import React from 'react'
import TextField from '../../components/TextField/TextField'
import ButtonUI from '../../components/Button/Button'
import { connect } from 'react-redux'
import { registerHandler, loginHandler } from '../../../redux/actions'

class Authscreen extends React.Component {
    state = {
        isLogin: false,
        username: '',
        password: '',
        email: '',
        passRepeat: ''
    }

    inputHandler = (event, field) => {
        this.setState({ [field]: event.target.value })
    }

    registerMenu = () => {
        this.setState({ isLogin: false })
    }

    registerKlik = () => {
        const { username, email, password, passRepeat } = this.state
        const userData = {
            username,
            email,
            password,
            passRepeat
        }
        this.props.onRegis(userData)
        this.setState({ username: "" })
        this.setState({ email: "" })
        this.setState({ password: "" })
        this.setState({ passRepeat: "" })

    }

    loginKlik = () =>{
        const { username, password } = this.state
        const userData = {
            username,
            password
        }
        this.props.onLogin(userData)
        this.setState({ username: "" })
        this.setState({ password: "" })
    }

    loginMenu = () => {
        this.setState({ isLogin: true })
    }

    render() {
        const { isLogin, username, password, passRepeat, email } = this.state
        
        return (
            <div className="container">
                <div className="row">
                    <ButtonUI type="outlined" className="mt-4 mr-3" onClick={this.registerMenu}>Register </ButtonUI>
                    <ButtonUI type="outlined" className="mt-4" onClick={this.loginMenu}>Login </ButtonUI>
                </div>
                <div className="row mt-5">
                    <div className="col-5">
                        {
                            isLogin ? (
                                <div>
                                    <h3>Log In</h3>
                                    <p className="mt-4">Welcome back {this.props.user.username},
                                <br />please, login to your account
                                </p>
                                <h1>{this.props.user.errMsg}</h1>
                                    <TextField
                                        onChange={(event) => { this.inputHandler(event, "username") }}
                                        placeholder="Username"
                                        className="mt-5"
                                        value={username}
                                    />
                                    <TextField
                                        placeholder="Password"
                                        className="mt-2"
                                        onChange={(event) => { this.inputHandler(event, "password") }}
                                        value={password}
                                    />
                                    <div className="d-flex justify-content-center">
                                        <ButtonUI 
                                        type="contained" 
                                        className="mt-4"
                                        onClick={this.loginKlik}>Login </ButtonUI>
                                    </div>
                                </div>
                            ) : <div>
                                    <h3>Register</h3>
                                    <p className="mt-4">You will get the bes recommendation for rent,
                                        <br />house in near of you
                                    </p>
                                    <h1>{this.props.user.errMsg}</h1>
                                    <TextField
                                        placeholder="Name"
                                        className="mt-5"
                                        onChange={(event) => { this.inputHandler(event, "username") }}
                                        value={username}
                                    />
                                    <TextField
                                        placeholder="Email"
                                        className="mt-2"
                                        onChange={(event) => { this.inputHandler(event, "email") }}
                                        value={email}
                                    />
                                    <TextField
                                        placeholder="Password"
                                        className="mt-2"
                                        onChange={(event) => { this.inputHandler(event, "password") }}
                                        value={password}
                                    />
                                    <TextField
                                        placeholder="Confirm Password"
                                        className="mt-2"
                                        onChange={(event) => { this.inputHandler(event, "passRepeat") }}
                                        value={passRepeat}
                                    />
                                    <div className="d-flex justify-content-center">
                                        <ButtonUI
                                            type="contained"
                                            className="mt-4"
                                            onClick={this.registerKlik}>Register </ButtonUI>
                                    </div>
                                </div>
                        }

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
const mapsDispatchToProps = {
    onRegis: registerHandler,
    onLogin: loginHandler
}

export default connect(mapsStateToProps, mapsDispatchToProps)(Authscreen)