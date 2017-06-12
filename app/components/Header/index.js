import React, { Component } from 'react';
import HeaderBar from './HeaderBar';

export default class Header extends Component {
  render() {
    return (
      <div>
        <HeaderBar>
          This is Header!
        </HeaderBar>
      </div>
    )
  }
}
