import { createSelector } from 'reselect';

const selectGlobal = (state) => state.get('login');

export const selectAuth = () => createSelector(
  selectGlobal,
  (globalState) => globalState.formState
);

export const selectIsSending = () => createSelector(
  selectGlobal,
  (globalState) => globalState.isSending
);
