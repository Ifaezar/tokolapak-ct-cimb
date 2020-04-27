import userTypes from "../types/user"

const { ON_LOGIN_FAIL, ON_LOGIN_SUCCESS, ON_LOGOUT } = userTypes

const init_state = {
  id: 0,
  username: "",
  fullname: "",
  addres: {},
  role: "",
  errMsg: ''
};

export default (state = init_state, action) => {
  switch (action.type) {
    case ON_LOGIN_SUCCESS:
      const { username, fullName, role, id } = action.payload;
      return {
        ...state,
        username,
        fullName,
        role,
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
