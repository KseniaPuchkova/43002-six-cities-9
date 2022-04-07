import {appProcess, changeCity, changeSortType} from './app-process';
import {ONE_ACTION, fakeCity} from '../../utils/mocks';
import {SortType} from '../../const';

const DEFAULT_CITY = 'Paris';
const ANOTHER_CITY = 'Moscow';

describe('Reducer: appProcess', () => {
  it('without additional parameters should return initial state', () => {
    expect(appProcess.reducer(void 0, {type: ONE_ACTION}))
      .toEqual({
        activeCity: DEFAULT_CITY,
        sortType: SortType.POPULAR,
      });
  });

  it('should replace current city with another city', () => {
    const state = {
      activeCity: fakeCity,
      sortType: SortType.POPULAR,
    };
    expect(appProcess.reducer(state, changeCity(ANOTHER_CITY)))
      .toEqual({
        activeCity: ANOTHER_CITY,
        sortType: SortType.POPULAR,
      });
  });

  it('should change sort type', () => {
    const state = {
      activeCity: fakeCity,
      sortType: SortType.POPULAR,
    };
    expect(appProcess.reducer(state, changeSortType(SortType.LOW_PRICE_FIRST)))
      .toEqual({
        activeCity: fakeCity,
        sortType: SortType.LOW_PRICE_FIRST,
      });
  });
});
