import {UserData} from './user-data';

export type User = Omit<UserData, 'email' | 'token'>;

export type Review = {
  comment: string,
  date: string,
  id: number,
  rating: number,
  user: User,
};

export type ReviewForForm = Omit<Review, 'date' | 'user'>;


