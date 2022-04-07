import {createSlice} from '@reduxjs/toolkit';
import {NameSpace, SortType} from '../../const';

const DEFAULT_CITY = 'Paris';

type InitalState = {
  activeCity: string,
  sortType: string,
};

const initialState: InitalState = {
  activeCity: DEFAULT_CITY,
  sortType: SortType.POPULAR,
};

export const appProcess = createSlice({
  name: NameSpace.App,
  initialState,
  reducers: {
    changeCity: (state, action) => {
      state.activeCity = action.payload;
      state.sortType = SortType.POPULAR;
    },
    changeSortType: (state, action) => {
      state.sortType = action.payload;
    },
  },
});

export const {changeCity, changeSortType} = appProcess.actions;
