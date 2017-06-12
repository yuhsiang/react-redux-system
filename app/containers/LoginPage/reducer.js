import { AUTH_FORM_ONCHANGE, AUTH_SET_LOGGIN_STATE, AUTH_REQUEST_ONSEND, AUTH_ERROR } from './constants';

const assign = Object.assign || require('object.assign');

// The initial application state
const initialState = {
  formState: {
    username: '',
    password: ''
  },
  isSending: false,
  // loggedIn: auth.loggedIn(),
  loggedIn: false,
  errorMessage: ''
};

export default function loginReducer(state = initialState, action) {
  switch (action.type) {
    case AUTH_FORM_ONCHANGE:
      return assign({}, state, {
        formState: action.newState
      });
      break;
    case AUTH_SET_LOGGIN_STATE:
      return assign({}, state, {
        loggedIn: action.newState
      });
      break;
    case AUTH_REQUEST_ONSEND:
      console.log(action)
      return assign({}, state, {
        isSending: action.isSending
      });
      break;
    case AUTH_ERROR:
      return assign({}, state, {
        errorMessage: action.message
      });
    default:
      return state;
  }
}
