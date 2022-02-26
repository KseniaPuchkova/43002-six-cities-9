import Review from '../types/review';

const reviews:Review[] = [
  {
    comment: 'Ullamco sunt occaecat voluptate magna.',
    date: '2021-09-08T14:13:56.569Z',
    id: 1,
    rating: 4,
    user: {
      avatarUrl: `https://i.pravatar.cc/128?rnd=${Math.random()}`,
      id: 1,
      isPro: false,
      name: 'Mary',
    },
  },
  {
    comment: 'Labore et nulla laboris eu aliquip eiusmod veniam.',
    date: '2020-06-08T14:12:56.569Z',
    id: 2,
    rating: 2,
    user: {
      avatarUrl: `https://i.pravatar.cc/128?rnd=${Math.random()}`,
      id: 2,
      isPro: false,
      name: 'Max',
    },
  },
  {
    comment: 'Incididunt ad magna reprehenderit irure esse reprehenderit reprehenderit nulla enim nulla non veniam.',
    date: '2020-10-08T14:13:56.569Z',
    id: 3,
    rating: 5,
    user: {
      avatarUrl: `https://i.pravatar.cc/128?rnd=${Math.random()}`,
      id: 3,
      isPro: true,
      name: 'Jan',
    },
  },
  {
    comment: 'Cillum aute in velit excepteur dolore nisi labore id quis.',
    date: '2019-07-08T14:13:56.569Z',
    id: 4,
    rating: 4,
    user: {
      avatarUrl: `https://i.pravatar.cc/128?rnd=${Math.random()}`,
      id: 4,
      isPro: false,
      name: 'Anna',
    },
  },
];

export default reviews;
