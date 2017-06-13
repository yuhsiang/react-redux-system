import { CHANGE_GROUP_OPEN } from './constants';

export function switchGroupOpen(groupItems) {
  groupItems.isOpen = !groupItems.isOpen;
  return {
    type: CHANGE_GROUP_OPEN,
    payload: groupItems,
  }
}
