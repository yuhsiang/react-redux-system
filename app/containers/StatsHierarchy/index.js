import React, { Component } from 'react';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';

import { selectGroupItem } from './selector';

class StatsHierarchy extends Component {
  render() {
    // render this...
    console.log(this.props.groupItems);
    return (
      <div>

      </div>
    )
  }
}

const mapStateToProps = createStructuredSelector({
  groupItems: selectGroupItem(),
});

export default connect(mapStateToProps)(StatsHierarchy);
