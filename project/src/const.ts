export enum AuthorizationStatus {
  Auth = 'AUTH',
  NoAuth = 'NO_AUTH',
  Unknown = 'UNKNOWN',
}
export enum AppRoute {
  Main = '/',
  SignIn = '/login',
  Favorites = '/favorites',
  Room = '/offer/:id',
  NotFound = '*',
}

export enum APIRoute {
  Offers = '/hotels',
  Favorite = '/favorite',
  Comments = '/comments',
  Login = '/login',
  Logout =  '/logout'
}
export const TIMEOUT_SHOW_ERROR = 2000;

export enum HTTP_CODE {
  BAD_REQUEST = 400,
  UNAUTHORIZED = 401,
  NOT_FOUND = 404,
}

export const SortType = {
  POPULAR: 'Popular',
  LOW_PRICE_FIRST: 'Price: low to high',
  HIGH_PRICE_FIRST: 'Price: high to low',
  TOP_RATED_FIRST: 'Top rated first',
};

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


