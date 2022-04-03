export enum Process {
  User = 'USER',
  Data = 'DATA',
  App = 'APP',
}

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
  Offer = '/offer/',
  NotFound = '*',
}

export enum APIRoute {
  Offers = '/hotels',
  Favorite = '/favorite',
  Comments = '/comments',
  Login = '/login',
  Logout =  '/logout',
}

export enum HttpCode {
  Success = 200,
  NoContent = 204,
  BadRequest = 400,
  Unauthorized = 401,
  NotFound = 404,
}

export enum SubmitStatus {
  Unknown,
  Sending,
  Success,
  Error,
}

export const SortType = {
  POPULAR: 'Popular',
  LOW_PRICE_FIRST: 'Price: low to high',
  HIGH_PRICE_FIRST: 'Price: high to low',
  TOP_RATED_FIRST: 'Top rated first',
} as const;

export const CardType = {
  MAIN: {
    articleClassName: 'cities__place-card',
    imgWrapperClassName: 'cities__image-wrapper',
    cardInfoClassName: '',
    imgWidth: '260',
    imgHeight: '200',
  },
  FAVORITE: {
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
} as const;

export const FavoriteButtonType = {
  CARD: {
    buttonClassName: 'place-card',
    imgWidth: '18',
    imgHeight: '19',
  },
  ROOM: {
    buttonClassName: 'property',
    imgWidth: '31',
    imgHeight: '33',
  },
} as const;
