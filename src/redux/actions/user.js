import Axios from 'axios'
import { API_URL } from "../../API"
import userTypes from "../types/user"

const { ON_LOGIN_FAIL, ON_LOGIN_SUCCESS, ON_LOGOUT } = userTypes

export const userInputHandler = (text) => {
    return {
        type: "USERNAME",
        payload: text
    }
}

export const loginHandler = (userData) => {
    return (dispatch) => {
        const { username, password } = userData
        Axios.get(`${API_URL}/user`, {
            params: {
                username,
                password
            }
        })
            .then(res => {
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
        const { username, password, role, fullName, passRepeat } = userData
        Axios.get(`${API_URL}/user`, {
            params: {
                username
            }
        })
            .then(res => {
                if (res.data.length == 0) {
                    if (password == passRepeat) {
                        Axios.post(`${API_URL}/user`, {
                            username: `${username}`,
                            password: `${password}`,
                            fullName: `${fullName}`,
                            role: `${role}`,
                        })
                            .then(res => {
                                dispatch({
                                    type: ON_LOGIN_SUCCESS,
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
        Axios.get(`${API_URL}/user`, {
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