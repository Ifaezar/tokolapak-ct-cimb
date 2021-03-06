import Axios from 'axios'
import { API_URL } from "../API"
import userTypes from "../types/user"
import Cookie from "universal-cookie";

const { ON_LOGIN_FAIL, ON_LOGIN_SUCCESS, ON_LOGOUT, ON_REGISTER_SUCCESS } = userTypes

const cookieObj = new Cookie();

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
                    Axios.post(`${API_URL}/users`, { ...userData, role: "user" })
                        .then(res => {
                            dispatch({
                                type: ON_LOGIN_SUCCESS,
                                payload: res.data
                            })
                        })
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

export const cookieChecker = () => {
    return {
        type: "COOKIE_CHECK",
    };
};

export const searchProduct = (search) => {
    return {
        type: "SEACRH_FILTER",
        payload: search
    };
}