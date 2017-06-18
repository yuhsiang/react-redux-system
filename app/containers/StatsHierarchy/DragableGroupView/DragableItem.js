import React, { Component } from 'react';
import { DragSource } from 'react-dnd';
import { TYPE_DRAGABLE_ITEM } from './constants';

const dragItemSource = {
  // getItem(): Returns a plain object representing the currently dragged item.
  // Every drag source must specify it by returning an object from its
  // beginDrag() method. Returns null if no item is being dragged.
  beginDrag(props) {
    return {item: props.item};
  }
}

function collect(connect, monitor) {
  return {
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging()
  }
}

class DragableItem extends Component {
  render() {
    const { connectDragSource, name } = this.props;
    return connectDragSource(
      <span style={{cursor:'move'}}>{name}</span>
    );

  }
}

export default DragSource(TYPE_DRAGABLE_ITEM, dragItemSource, collect)(DragableItem);
