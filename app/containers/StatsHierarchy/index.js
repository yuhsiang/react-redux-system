import React, { Component } from 'react';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';

import { selectGroupItem } from './selector';
import GroupView from './GroupView';
import DragableGroupView from './DragableGroupView';

class StatsHierarchy extends Component {
  render() {
    return (
      <div>
        <GroupView>
          <DragableGroupView />
        </GroupView>
      </div>
    )
  }
}

const mapStateToProps = createStructuredSelector({
  groupItems: selectGroupItem(),
});

export default connect(mapStateToProps)(StatsHierarchy);
