import React, { Component } from 'react';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';

import { selectGroupItem } from '../selector';
import GroupOpener from './GroupOpener';
import { switchGroupOpen } from '../actions';

const SIZE_PADDINGLEFT = 15;

class DragableGroupView extends Component {


  renderGroup(groupItems) {
    console.log(groupItems);
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
            <span>➙</span><span>{items[i].name}</span>
          </div>
        );
      }
    }

    if (groupItems.isOpen) {
      indicatorIcon = '▼';
    }

    return (
      <div>
        <div><GroupOpener onClick={() => {this.props.dispatch(switchGroupOpen(groupItems))}}>{indicatorIcon}</GroupOpener><span>{groupItems.name}</span></div>
        {res}
      </div>
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

export default connect(mapStateToProps)(DragableGroupView);
