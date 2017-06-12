import { FETCH_SIDE_MENUS, CHANGE_SIDE_MENUS } from './constants';

const assign = Object.assign || require('object.assign');

const initialState = {
  sideMenus: [],
  isLoading: false,
};

export default function dashboardReducer (state = initialState, action){
  switch (action.type){
    case FETCH_SIDE_MENUS:
      return state;
      break;
    case CHANGE_SIDE_MENUS:
      return assign({}, state, {
        sideMenus: [...action.sideMenus]
      });
      break;
    default:
      return state;
  }
}
