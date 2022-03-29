import {combineReducers} from '@reduxjs/toolkit';
import {userProcess} from './user-process/user-process';
import {appProcess} from './app-process/app-process';
import {dataProcess} from './data-process/data-process';
import {Process} from '../const';

export const rootReducer = combineReducers({
  [Process.Data]: dataProcess.reducer,
  [Process.App]: appProcess.reducer,
  [Process.User]: userProcess.reducer,
});
