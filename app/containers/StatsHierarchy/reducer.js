import groupItems from '../../utils/groupItems';

const assign = Object.assign || require('object.assign');

const initialState = {
  groupItem: groupItems.createGroupItem({
    id: 0,
    type: groupItems.getGroupType(),
    name: '測試群組'
  }),
};

export default function StatsHierarchyReducer(state = initialState, action){
  switch (action.type){
    default:
      return state;
  }
}
