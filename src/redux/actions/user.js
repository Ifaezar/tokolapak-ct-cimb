import Axios from 'axios'
import { API_URL } from "../API"
import userTypes from "../types/user"

const { ON_LOGIN_FAIL, ON_LOGIN_SUCCESS, ON_LOGOUT, ON_REGISTER_SUCCESS } = userTypes

export const userInputHandler = (text) => {
    return {
        type: "USERNAME",
        payload: text
    }
}

export const loginHandler = (userData) => {
    return (dispatch) => {
        const { username, password } = userData
        Axios.get(`${API_URL}/users`, {
            params: {
                username,
                password
            }
        })
            .then(res => {
                console.log(res.data)
                if (res.data.length > 0) {
                    dispatch({
                        type: ON_LOGIN_SUCCESS,
                        payload: res.data[0]
                    })
                } else {
                    dispatch({
                        type: ON_LOGIN_FAIL,
                        payload: "username atau password yang anda masukkan salah"
                    })
                }
            })
            .catch(err => {
                console.log(err);
            })
    }
}

export const registerHandler = (userData) => {
    return (dispatch) => {
        const { username, password, email, passRepeat, name } = userData
        Axios.get(`${API_URL}/users`, {
            params: {
                username
            }
        })
            .then(res => {
                if (res.data.length == 0) {
                    if (password == passRepeat) {
                        Axios.post(`${API_URL}/users`, {
                            username: `${username}`,
                            name: `${name}`,
                            password: `${password}`,
                            email: `${email}`,
                        })
                            .then(res => {
                                dispatch({
                                    type: ON_REGISTER_SUCCESS,
                                    payload: res.data
                                })
                            })
                    } else {
                        dispatch({
                            type: ON_LOGIN_FAIL,
                            payload: "Mohon maaf password salah"
                        })
                    }
                } else {
                    dispatch({
                        type: ON_LOGIN_FAIL,
                        payload: `Mohon maaf username ${username} sudah dipakai`
                    })
                }
            })
            .catch(err => {
                console.log(err)
            })
    }
}

export const userKeepLogin = (userData) => {
    return (dispatch) => {
        Axios.get(`${API_URL}/users`, {
            params: {
                id: userData.id
            }
        })
            .then((res) => {
                console.log(res)
                if (res.data.length > 0) {
                    dispatch({
                        type: ON_LOGIN_SUCCESS,
                        payload: res.data[0]
                    })
                } else {
                    dispatch({
                        type: ON_LOGIN_FAIL,
                        payload: "username atau password yang anda masukkan salah"
                    })
                }
            })
            .catch((err) => {
                console.log(err)
            })
    }
}

export const logOutHandler = () => {
    return {
        type: ON_LOGOUT,
    }
}
