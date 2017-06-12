import request from 'superagent';

const API_URI = 'api/';

/**
 * Authentication lib
 * @type {Object}
 */
const auth = {
  /**
   * Logs a user in
   * @param  {obj}        form The username and password of the user
   * @return {promiseObj} promise object
   */
  login(form) {
    return new Promise((resolve, reject) => {
      request
        .post(`${API_URI}auth`)
        .send(form)
        .end(function(err, res){
          if (err) {
            reject();
          }
          return resolve(res.body);
        });
    });
  },

  setAuthToken(token) {

    localStorage.setItem('token', token);
  },

  getAuthToken() {
    return localStorage.getItem('token');
  },

  isLoggedIn() {
    const token = localStorage.getItem('token');
    return token !== null && token !== '';
  },

  logout() {
    localStorage.clear();
  }
}
export default auth;
