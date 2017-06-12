import React, { Component } from 'react';
import { connect } from 'react-redux';
import { changeForm, login } from './actions';
import { selectAuth, selectIsSending } from './selector';
import { createStructuredSelector } from 'reselect';

const assign = Object.assign || require('object.assign');
class LoginPage extends Component {


  render() {
    // this.props.dispatch({type: 'AUTH_FORM_ONCHANGE', formState:{password:123, username:123} })
    return (
      <div>
        <form>
          <div>
            <label htmlFor="username">Username</label>
            <input type="text" id="username"
              value={this.props.formData.username}
              placeholder="username"
              onChange={this.props.onChangeUsername}
              autoCorrect="off" autoCapitalize="off"
              spellCheck="false"
            />

          </div>
          <div>
            <label htmlFor="password">Password</label>
            <input id="password" type="password"
              value={this.props.formData.password}
              placeholder="••••••••••"
              onChange={this.props.onChangePassword}
            />
          </div>

        </form>
        <div>
          {this.props.isSending ? (
            <div >登入中</div>
          ) : (
            <button onClick={this.props.onLoginClick.bind(null, this.props.formData)}>Login</button>
          )}
        </div>
      </div>
    )
  }
}


const mapStateToProps = createStructuredSelector({
  formData: selectAuth(),
  isSending: selectIsSending(),
});

function mapDispatchToProps(dispatch) {
  return {
    onChangePassword: (evt) => dispatch(changeForm({password: evt.target.value})),
    onChangeUsername: (evt) => dispatch(changeForm({username: evt.target.value})),
    onLoginClick: (form) => dispatch(login(form)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);
