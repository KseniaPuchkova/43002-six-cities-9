export enum AppRoute {
  Main = '/',
  SignIn = '/login',
  Favorites = '/favorites',
  Room = '/offer/:id',
  NotFound = '*',
}

export enum AuthorizationStatus {
  Auth = 'AUTH',
  NoAuth = 'NO_AUTH',
  Unknown = 'UNKNOWN',
}

export const CardTypes = {
  MAIN: {
    articleClassName: 'cities__place-card',
    imgWrapperClassName: 'cities__image-wrapper',
    cardInfoClassName: '',
    imgWidth: '260',
    imgHeight: '200',
  },
  FAVORITES: {
    articleClassName: 'favorites__card',
    imgWrapperClassName: 'favorites__image-wrapper',
    cardInfoClassName: 'favorites__card-info',
    imgWidth: '150',
    imgHeight: '110',
  },
  ROOM: {
    articleClassName: 'near-places__card',
    imgWrapperClassName: 'near-places__image-wrapper',
    cardInfoClassName: '',
    imgWidth: '260',
    imgHeight: '200',
  },
};

export enum SortType {
  Popular = 'Popular',
  LowPriceFirst = 'Price: low to high',
  HighPriceFirst = 'Price: high to low',
  TopRatedFirst = 'Top rated first'
}
