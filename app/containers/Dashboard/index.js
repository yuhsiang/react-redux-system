import React, { Component } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { fetchSideMenu } from './actions';
import { selectSideMenu } from './selector';
import SideMenu from './SideMenu';
import MenuItem from './MenuItem';
import Wrapper from './Wrapper';

class Dashboard extends Component {

  componentDidMount() {
    console.log('dashboard did mount');
    this.props.dispatch(fetchSideMenu());
  }

  renderMenuItems() {
    const { sideMenu } = this.props;
    return sideMenu.map((item) => {
      return (
        <MenuItem key={item.id} to={`/${item.textCode}`}>
          {item.text}
        </MenuItem>
      )
    })
  }

  render() {
    return (
      <div>
        <SideMenu>
          {this.renderMenuItems()}
        </SideMenu>
        <Wrapper>
        {React.Children.toArray(this.props.children)}
        </Wrapper>
      </div>
    )
  }
}

const mapStateToProps = createStructuredSelector({
  sideMenu: selectSideMenu()
})
//
// const mapDispatchToProps = (dispatch) => {
//   return {
//     onFetchSideMenu: dispatch(fetchSideMenu())
//   }
// }

export default connect(mapStateToProps)(Dashboard);
