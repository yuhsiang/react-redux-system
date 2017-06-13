import groupItems from '../../utils/groupItems';
import { CHANGE_GROUP_OPEN } from './constants';


const assign = Object.assign || require('object.assign');

const initialState = {
  groupItem: groupItems.defaultGroup
};

function switchGroupItem(groupItem, payload) {
  if (payload.id === groupItem.id) {
    groupItem.isOpen = payload.isOpen;
  } else {
    const {items} = groupItem,
          len = items.length;
    let i = 0;

    for (; i < len; i++) {
      const item = items[i];
      if (item.isGroup()) {
        switchGroupItem(item, payload);
      }
    }
  }
}

export default function StatsHierarchyReducer(state = initialState, action){
  switch (action.type){
    case CHANGE_GROUP_OPEN:
      const { payload } = action;
      let i = 0;
      if (payload.id === state.groupItem.id) {
        return assign({}, state, {
          groupItem: assign({}, {}, payload)
        });
      } else {
        switchGroupItem(state.groupItem, payload);
        return assign({}, state, {
          groupItem: assign({}, {}, state.groupItem)
        });
      }
      return state;
      break;
    default:
      return state;
  }
}
