import request from 'superagent';
import auth from './auth';

const API_URI = 'api/';

/**
 * api lib
 * @type {Object}
 */
const api = {
  /**
   * Logs a user in
   * @param  {obj}        form The username and password of the user
   * @return {promiseObj} promise object
   */
  getSideMenu() {
    return new Promise((resolve, reject) => {

      if (!auth.isLoggedIn()) {
        reject();
      }
      const token = auth.getAuthToken();
      request
        .get(`${API_URI}abilities?token=${token}`)
        .end(function(err, res){
          if (err) {
            reject();
          }
          return resolve(res.body);
        });
    });
  },

}
export default api;
