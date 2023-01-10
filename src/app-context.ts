import { AsyncLocalStorage } from 'async_hooks';

export type ALSData = {
  userData: UserData;
};
export type UserData = {
  userId: number;
};

// To DO: its nice to fully wrap this so that the caller is
// not dealing with ALS methods.
export const als = new AsyncLocalStorage<ALSData>();
