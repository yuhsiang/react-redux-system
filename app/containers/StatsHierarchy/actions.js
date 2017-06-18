import { CHANGE_GROUP_OPEN, MOVE_GROUP } from './constants';

export function switchGroupOpen(groupItems) {
  groupItems.isOpen = !groupItems.isOpen;
  return {
    type: CHANGE_GROUP_OPEN,
    payload: groupItems,
  }
}

export function moveGroup(item, toGroup) {
  return {
    type: MOVE_GROUP,
    payload: {item, toGroup}
  }
}
