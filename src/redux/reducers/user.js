import userTypes from "../types/user"

const { ON_LOGIN_FAIL, ON_LOGIN_SUCCESS, ON_LOGOUT, ON_REGISTER_SUCCESS } = userTypes

const init_state = {
  id: 0,
  username: "",
  name:'',
  password: "",
  email: "",
  errMsg: ''
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
        errMsg: ''
      };
    case ON_LOGIN_FAIL:
      return { ...state, errMsg: action.payload }
    case ON_REGISTER_SUCCESS:
      return {
        ...state,
        username,
        email,
        id,
        name,
        errMsg: ''
      };
    case ON_LOGOUT:
      return { ...init_state }
    default:
      return { ...state }
  }
};
