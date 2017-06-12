import { createSelector } from 'reselect';

const selectGlobal = (state) => state.get('dashboard');

export const selectSideMenu = () => createSelector(
  selectGlobal,
  (globalState) => globalState.sideMenus
);
