import userTypes from "../types/user"

const { ON_LOGIN_FAIL, ON_LOGIN_SUCCESS, ON_LOGOUT, ON_REGISTER_SUCCESS } = userTypes

const init_state = {
  id: 0,
  username: "",
  name: '',
  password: "",
  email: "",
  errMsg: '',
  cookieCheck: false
};

export default (state = init_state, action) => {
  switch (action.type) {
    case ON_LOGIN_SUCCESS:
      const { username, email, id, name } = action.payload;
      return {
        ...state,
        username,
        email,
        id,
        name,
        errMsg: '',
        cookieCheck: true
      };
    case ON_LOGIN_FAIL:
      return { ...state, errMsg: action.payload, cookieCheck: true }
    case ON_REGISTER_SUCCESS:
      return {
        ...state,
        username,
        email,
        id,
        name,
        errMsg: '',
        cookieCheck: true
      };
    case ON_LOGOUT:
      return { ...init_state,  cookieCheck: true };
    case "COOKIE_CHECK":
      return { ...state,  cookieCheck: true };
    default:
      return { ...state }
  }
};
