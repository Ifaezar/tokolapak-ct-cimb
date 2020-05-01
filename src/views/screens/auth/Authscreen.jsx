import React from 'react'
import TextField from '../../components/TextField/TextField'
import './Authscreen.css'
import ButtonUI from '../../components/Button/Button'
import { connect } from 'react-redux'
import { Redirect } from "react-router-dom";
import Cookie from 'universal-cookie'
import { registerHandler, loginHandler } from '../../../redux/actions'




class Authscreen extends React.Component {
    state = {
        isLogin: false,
        registerForm: {
            username: '',
            name: '',
            password: '',
            email: '',
            role: '',
            showPassword: false
        },
        loginForm: {
            username: '',
            password: '',
            showPassword: false
        }
    }

    componentDidUpdate() {
        if (this.props.user.id) {
            const cookie = new Cookie()
            cookie.set("authData", JSON.stringify(this.props.user))
        }
    }

    inputHandler = (e, field, form) => {
        const { value } = e.target
        this.setState({
            [form]: {
                ...this.state[form],
                [field]: value
            }
        })
    }

    registerMenu = () => {
        this.setState({ isLogin: false })
    }

    registerKlik = () => {
        const { username, email, password, role, name } = this.state.registerForm
        const userData = {
            username,
            email,
            password,
            name,
            role
        }
        this.props.onRegis(userData)
        this.state.registerForm.username = ""
        this.state.registerForm.email = ""
        this.state.registerForm.password = ""
        this.state.registerForm.name = ""
        this.state.registerForm.role = ""

    }

    loginKlik = () => {
        const { username, password } = this.state.loginForm
        const userData = {
            username,
            password
        }
        this.props.onLogin(userData)
        this.state.loginForm.username = ""
        this.state.loginForm.password = ""
    }

    loginMenu = () => {
        this.setState({ isLogin: true })
    }

    checkBoxHandler = (e, form) => {
        const { checked } = e.target
        this.setState({
            [form]: {
                ...this.state[form],
                showPassword: checked
            }
        })
    }

    render() {
        const { isLogin, loginForm, registerForm } = this.state
        if (this.props.user.id > 0) {
            return <Redirect to="/" />;
        }
        return (
            <div className="container">
                <div className="d-flex flex-row">
                    <ButtonUI type="outlined"
                        className={`auth-screen-btn ${this.state.isLogin == false ? "active" : null} mt-4 mr-3`}
                        onClick={this.registerMenu}>Register
                    </ButtonUI>
                    <ButtonUI type="outlined"
                        className={`auth-screen-btn ${this.state.isLogin == true ? "active" : null} mt-4`}
                        onClick={this.loginMenu}>Login
                    </ButtonUI>
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
                                        onChange={(event) => { this.inputHandler(event, "username", "loginForm") }}
                                        placeholder="Username"
                                        className="mt-5"
                                        value={loginForm.username}
                                    />
                                    <TextField
                                        placeholder="Password"
                                        className="mt-2"
                                        onChange={(event) => { this.inputHandler(event, "password", "loginForm") }}
                                        value={loginForm.password}
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
                                        placeholder="Username"
                                        className="mt-5"
                                        onChange={(event) => { this.inputHandler(event, "username", "registerForm") }}
                                        value={registerForm.username}
                                    />
                                    <TextField
                                        placeholder="Name"
                                        className="mt-2"
                                        onChange={(event) => { this.inputHandler(event, "name", "registerForm") }}
                                        value={registerForm.name}
                                    />
                                    <TextField
                                        placeholder="Email"
                                        className="mt-2"
                                        onChange={(event) => { this.inputHandler(event, "email", "registerForm") }}
                                        value={registerForm.email}
                                    />
                                    <TextField
                                        placeholder="Password"
                                        className="mt-2"
                                        onChange={(event) => { this.inputHandler(event, "password", "registerForm") }}
                                        value={registerForm.password}
                                        type={this.state.registerForm.showPassword ? "text" : "password"}
                                    />
                                    <input
                                        type='checkbox'
                                        className="mt-3" name="showPasswordRegister"
                                        onChange={(event) => { this.checkBoxHandler(event, "registerForm") }}
                                        value="show password" ></input>
                                    Show Password
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