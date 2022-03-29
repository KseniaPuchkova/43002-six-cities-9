import {createSlice} from '@reduxjs/toolkit';
import {CITIES} from '../../components/cities-list/cities-list';
import {Process, SortType} from '../../const';

const DEFAULT_CITY_INDEX = 0;

type InitalState = {
  activeCity: string,
  sortType: string,
}

const initialState: InitalState = {
  activeCity: CITIES[DEFAULT_CITY_INDEX],
  sortType: SortType.POPULAR,
};

export const appProcess = createSlice({
  name: Process.App,
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
