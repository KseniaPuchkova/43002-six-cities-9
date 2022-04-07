import {combineReducers} from '@reduxjs/toolkit';
import {userProcess} from './user-process/user-process';
import {appProcess} from './app-process/app-process';
import {dataProcess} from './data-process/data-process';
import {NameSpace} from '../const';

export const rootReducer = combineReducers({
  [NameSpace.Data]: dataProcess.reducer,
  [NameSpace.App]: appProcess.reducer,
  [NameSpace.User]: userProcess.reducer,
});
