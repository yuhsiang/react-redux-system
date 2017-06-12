import { createSelector } from 'reselect';

const selectGlobal = (state) => {
  return state.get('StatsHierarchy')
}

export const selectGroupItem = () => createSelector(
  selectGlobal,
  (globalState) => {
    return globalState;
  }
)
