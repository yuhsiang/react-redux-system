import { FETCH_SIDE_MENUS, CHANGE_SIDE_MENUS } from './constants';
import api from '../../utils/api';


export function fetchSideMenu() {

  return (dispatch) => {
    api.getSideMenu().then((res) => {
      // handle error!
      console.log(res);
      dispatch(sideMenuChange(res.data.sideMenus));
    }, (err) => {
      console.log(err);
    });
  }
}

export default function sideMenuChange(sideMenus) {
  return {
    type: CHANGE_SIDE_MENUS,
    sideMenus
  }
}
