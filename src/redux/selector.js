import { createSelector } from '@reduxjs/toolkit';

const selectAuth = state => state.catalog;

export const selectToken = createSelector(selectAuth, auth => auth.token);
export const selectAuthIsLoading = createSelector(
  selectAuth,
  auth => auth.isLoading
);
export const selectAuthError = createSelector(selectAuth, auth => auth.error);
export const selectAuthUserData = createSelector(selectAuth, auth => auth.user);
export const selectAuthIsSignedIn = createSelector(
  selectAuth,
  auth => auth.isSignedIn
);
export const selectAuthFavourites = createSelector(
  selectAuth,
  auth => auth.favs
);
export const selectAllTeachers = createSelector(
  selectAuth,
  auth => auth.allTeachers
);
