import {Offer} from '../types/offer';
const AVATAR_URL = 'https://i.pravatar.cc/128';

export const offers:Offer[] = [
  {
    bedrooms: 3,
    city: {
      location: {
        latitude: 52.38333,
        longitude: 4.9,
        zoom: 10,
      },
      name: 'Amsterdam',
    },
    description: 'Deserunt minim deserunt enim sunt. Excepteur reprehenderit aliquip ad sunt ex ea laboris proident commodo ut et culpa ad mollit.',
    goods: ['Wi-Fi', 'Towels', 'Heating', 'Kitchen', 'Cable TV', 'Washing machine', 'Coffee machine', 'Dishwasher', 'Baby seat'],
    host: {
      avatarUrl: `${AVATAR_URL}?rnd=${Math.random()}`,
      id: 1,
      isPro: true,
      name: 'Angelina',
    },
    id: 1,
    images: ['img/apartment-01.jpg', 'img/apartment-02.jpg', 'img/apartment-03.jpg'],
    isFavorite: true,
    isPremium: true,
    location: {
      latitude: 52.3909553943508,
      longitude: 4.85309666406198,
      zoom: 8,
    },
    maxAdults: 4,
    previewImage: 'img/apartment-01.jpg',
    price: 120,
    rating: 4.7,
    title: 'Beautiful & luxurious studio at great location',
    type: 'Studio',
  },
  {
    bedrooms: 2,
    city: {
      location: {
        latitude: 52.38333,
        longitude: 4.9,
        zoom: 8,
      },
      name: 'Amsterdam',
    },
    description: 'Aliqua aliqua velit nisi non dolore non occaecat adipisicing magna do consectetur quis.',
    goods: ['Heating', 'Kitchen', 'Washing machine', 'Coffee machine', 'Fridge'],
    host: {
      avatarUrl: `${AVATAR_URL}?rnd=${Math.random()}`,
      id: 2,
      isPro: true,
      name: 'Mary',
    },
    id: 2,
    images: ['img/room.jpg', 'img/apartment-01.jpg'],
    isFavorite: true,
    isPremium: false,
    location: {
      latitude: 52.369553943508,
      longitude: 4.85309666406198,
      zoom: 8,
    },
    maxAdults: 2,
    previewImage: 'img/room.jpg',
    price: 100,
    rating: 3,
    title: 'Wood and stone place',
    type: 'Private room',
  },
  {
    bedrooms: 1,
    city: {
      location: {
        latitude: 52.38333,
        longitude: 4.9,
        zoom: 10,
      },
      name: 'Amsterdam',
    },
    description: 'Nostrud nulla laborum laborum ea nulla ullamco eu adipisicing amet occaecat.',
    goods: ['Heating', 'Kitchen', 'Split system', 'Washing machine', 'Dishwasher', 'Baby seat'],
    host: {
      avatarUrl: `${AVATAR_URL}?rnd=${Math.random()}`,
      id: 4,
      isPro: false,
      name: 'Kurt',
    },
    id: 3,
    images: ['img/apartment-03.jpg', 'img/apartment-01.jpg', 'img/apartment-02.jpg'],
    isFavorite: false,
    isPremium: true,
    location: {
      latitude: 52.3909553943508,
      longitude: 4.929309666406198,
      zoom: 8,
    },
    maxAdults: 4,
    previewImage: 'img/apartment-03.jpg',
    price: 170,
    rating: 5,
    title: 'Canal View Prinsengracht',
    type: 'Studio',
  },
  {
    bedrooms: 3,
    city: {
      location: {
        latitude: 52.38333,
        longitude: 4.9,
        zoom: 10,
      },
      name: 'Paris',
    },
    description: 'Cillum occaecat amet irure reprehenderit aliquip proident et nostrud commodo aliquip aliquip non.',
    goods: ['Cable TV', 'Washing machine', 'Coffee machine', 'Dishwasher', 'Wi-Fi'],
    host: {
      avatarUrl: `${AVATAR_URL}?rnd=${Math.random()}`,
      id: 4,
      isPro: true,
      name: 'Angelina',
    },
    id: 4,
    images: ['img/room.jpg'],
    isFavorite: true,
    isPremium: false,
    location: {
      latitude: 52.3809553943508,
      longitude: 4.939309666406198,
      zoom: 8,
    },
    maxAdults: 3,
    previewImage: 'img/apartment-02.jpg',
    price: 180,
    rating: 3.5,
    title: 'Nice, cozy, warm big bed apartment',
    type: 'Apartment',
  },
  {
    bedrooms: 3,
    city: {
      location: {
        latitude: 52.38333,
        longitude: 4.9,
        zoom: 10,
      },
      name: 'Paris',
    },
    description: 'Cillum occaecat amet irure reprehenderit aliquip proident et nostrud commodo aliquip aliquip non.',
    goods: ['Cable TV', 'Washing machine', 'Coffee machine', 'Dishwasher', 'Wi-Fi'],
    host: {
      avatarUrl: `${AVATAR_URL}?rnd=${Math.random()}`,
      id: 4,
      isPro: true,
      name: 'Angelina',
    },
    id: 5,
    images: ['img/apartment-03.jpg'],
    isFavorite: true,
    isPremium: false,
    location: {
      latitude: 52.3702157,
      longitude: 4.8951679,
      zoom: 8,
    },
    maxAdults: 3,
    previewImage: 'img/apartment-03.jpg',
    price: 230,
    rating: 4.5,
    title: 'Nice, cozy, warm big bed apartment',
    type: 'Apartment',
  },
];

