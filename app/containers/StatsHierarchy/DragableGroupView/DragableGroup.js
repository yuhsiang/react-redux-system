import React, { Component } from 'react';
import { connect } from 'react-redux';
import HTML5Backend from 'react-dnd-html5-backend';
import { DropTarget } from 'react-dnd';

import { TYPE_DRAGABLE_ITEM, TYPE_DROP_GROUP_ZONE } from './constants';
import { moveGroup } from '../actions';

const groupDropTarget = {
  drop(props, monitor, component) {
    // dont bubble up
    if (component.props.isOverCurrent) {
      props.dispatch(moveGroup(monitor.getItem().item, props.groupItems))
    }
  }
};

function collect(connect, monitor) {
  return {
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver(),
    isOverCurrent: monitor.isOver({ shallow: true }),
  };
}

class DragableGroup extends Component {

  render() {
    const { connectDropTarget, isOverCurrent } = this.props;
    // console.log(isOverCurrent, this.props.children.props);
    let backgroundColor = 'white';

    if (isOverCurrent) {
      backgroundColor = 'darkgreen';
    }
    return (
      connectDropTarget(
        <div style={{backgroundColor}}>
          {this.props.children}
        </div>
      )
    );
  }
}

export default connect()(DropTarget(TYPE_DRAGABLE_ITEM, groupDropTarget, collect)(DragableGroup));
