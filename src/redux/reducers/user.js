import userTypes from "../types/user"

const { ON_LOGIN_FAIL, ON_LOGIN_SUCCESS, ON_LOGOUT } = userTypes

const init_state = {
  id: 0,
  username: "",
  fullname: "",
  addres: {},
  email: "",
  errMsg: ''
};

export default (state = init_state, action) => {
  switch (action.type) {
    case ON_LOGIN_SUCCESS:
      const { username, fullName, email, id } = action.payload;
      return {
        ...state,
        username,
        fullName,
        email,
        id,
      };
    case ON_LOGIN_FAIL:
      return { ...state, errMsg: action.payload }
    case ON_LOGOUT:
      return { ...init_state }
    default:
      return { ...state }
  }
};
