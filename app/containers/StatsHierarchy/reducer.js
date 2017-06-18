import groupItems from '../../utils/groupItems';
import { CHANGE_GROUP_OPEN, MOVE_GROUP } from './constants';


const assign = Object.assign || require('object.assign');

const initialState = {
  groupItem: groupItems.defaultGroup
};

/**
 * set group item to true / false according to payload
 */
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

function isToSameGroup(src, target) {
  let i = 0;
  const { items } = target,
        len = items.length;

  for (; i < len; i++) {
    if (src.id === items[i].id) {
      return true;
    }
  }
  return false;
}

function deleteFromGroup(src, target) {
  let i = 0;
  const { items } = target,
        len = items.length;

  // find src first
  for (; i < len; i++) {
    const item = items[i];
    if (item.id === src.id) {
      items.splice(i, 1);
      return true;
    }
  }
  for (i = 0; i < len; i++) {
    const item = items[i];
    if (item.isGroup()) {
      if (deleteFromGroup(src, item)) {
        return true;
      }
    }
  }
  return false;
}

function addToGroup(src, toGroup, target) {
  let i = 0;
  const { items } = target,
        len = items.length;

  if (toGroup.id === target.id) {
    items.push(src);
    return true;
  }
  for (i = 0; i < len; i++) {
    const item = items[i];
    if (item.isGroup()) {
      if (addToGroup(src, toGroup, item)) {
        return true;
      }
    }
  }
  return false;
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

    case MOVE_GROUP:
      const {item, toGroup} = action.payload;
      console.log(action.payload);
      if (isToSameGroup(item, toGroup)) {
        return state;
      }

      deleteFromGroup(item, state.groupItem);

      addToGroup(item, toGroup, state.groupItem);
      return assign({}, state, {
        groupItem: assign({}, {}, state.groupItem)
      });
      // if (item.)
      return state;
      break;
    default:
      return state;
  }
}
