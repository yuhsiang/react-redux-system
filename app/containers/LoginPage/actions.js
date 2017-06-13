import { AUTH_FORM_ONCHANGE, AUTH_SET_LOGGIN_STATE, AUTH_REQUEST_ONSEND, AUTH_ERROR } from './constants';
import bcrypt from 'bcryptjs';
import auth from 'utils/auth';
import { browserHistory } from 'react-router';

export function changeForm(newState) {
  return { type: AUTH_FORM_ONCHANGE, newState };
}

/**
 * Log the user in
 * @param  {object} form The username, password of the user to be logged in
 */
export function login(form) {
  const { password, username } = form;
  return (dispatch) => {
    dispatch(sendingRequest(true));
    const salt = bcrypt.genSaltSync(10);
    bcrypt.hash(password, salt, (err, hash) => {
      // Something wrong while hashing
      if (err) {
        dispatch(sendingRequest(false));
        // dispatch(setErrorMessage(errorMessages.GENERAL_ERROR));
        return;
      }
      auth.login({username, password: hash}).then((res) => {
        if (res.code !== 0) {
          dispatch(sendingRequest(false));
          // error msg
        }

        dispatch(sendingRequest(false));
        dispatch(changeForm({username: "", password: ""}));

        if (res.data.token) {
          auth.setAuthToken(res.data.token);
          forwardTo('/');
        } else {
          // error msg
        }
      });
    });
  }
}

/**
 * Sets the requestSending state, which displays a loading indicator during requests
 * @param  {boolean} sending The new state the app should have
 * @return {object}          Formatted action for the reducer to handle
 */
export function sendingRequest(isSending) {
  return { type: AUTH_REQUEST_ONSEND, isSending };
}

/**
 * Forwards the user
 * @param {string} location The route the user should be forwarded to
 */
function forwardTo(location) {
  browserHistory.push(location);
}
