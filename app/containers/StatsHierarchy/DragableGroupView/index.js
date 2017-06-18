import React, { Component } from 'react';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';

import { selectGroupItem } from '../selector';
import GroupOpener from './GroupOpener';
import { switchGroupOpen } from '../actions';

import DragableItem from './DragableItem';
import DragableGroup from './DragableGroup';


const SIZE_PADDINGLEFT = 15;

class DragableGroupView extends Component {
  renderGroup(groupItems) {
    const { items } = groupItems,
          len = items.length;

    let res = [],
        i = 0,
        group,
        indicatorIcon = '▶';

    for (; i < len; i++) {
      if (!groupItems.isOpen) {
        break;
      }
      const item = items[i];
      if (item.isGroup()) {
        res.push(<div style={{paddingLeft:SIZE_PADDINGLEFT}} key={`item-${items[i].id}`}>{this.renderGroup(item)}</div>);
      } else {

        res.push(
          <div style={{paddingLeft:SIZE_PADDINGLEFT}} key={`item-${items[i].id}`}>
            <span>➙</span><DragableItem item={item} name={items[i].name}></DragableItem>
          </div>
        );
      }
    }

    if (groupItems.isOpen) {
      indicatorIcon = '▼';
    }

    return (
      <DragableGroup groupItems={groupItems}>
        <div><GroupOpener onClick={() => {this.props.dispatch(switchGroupOpen(groupItems))}}>{indicatorIcon}</GroupOpener><span>{groupItems.name}</span></div>
        {res}
      </DragableGroup>
    );
  }
  render() {
    const { groupItems } = this.props;
    // assume groups are in hierarchy order
    return (
      <div>
        {this.renderGroup(groupItems)}
      </div>
    )
  }
}

const mapStateToProps = createStructuredSelector({
  groupItems: selectGroupItem(),
});

export default connect(mapStateToProps)(DragDropContext(HTML5Backend)(DragableGroupView));
