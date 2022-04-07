import {dataProcess, loadOffers, loadOffer, loadOffersNearby, loadReviewsByOffer, loadFavorites, changeSubmitStatus} from './data-process';
import {makeFakeOffer, makeFakeOffers, makeFakeReviewsByOffer, ONE_ACTION} from '../../utils/mocks';
import {SubmitStatus} from '../../const';

const OFFER_ID = 0;
const fakeOffer = makeFakeOffer(OFFER_ID);
const fakeOffers = makeFakeOffers();
const fakeReviewsByOffer = makeFakeReviewsByOffer();

describe('Reducer: dataProcess', () => {
  it('without additional parameters should return initial state', () => {
    expect(dataProcess.reducer(void 0, {type: ONE_ACTION}))
      .toEqual({
        offers: [],
        isDataLoaded: false,
        currentOffer: null,
        offersNearby: [],
        reviewsByOffer: [],
        favorites: [],
        submitStatus: SubmitStatus.Unknown,
      });
  });

  it('should load offers', () => {
    const state = {
      offers: [],
      isDataLoaded: false,
      currentOffer: null,
      offersNearby: [],
      reviewsByOffer: [],
      favorites: [],
      submitStatus: SubmitStatus.Unknown,
    };
    expect(dataProcess.reducer(state, loadOffers(fakeOffers)))
      .toEqual({
        offers: fakeOffers,
        isDataLoaded: true,
        currentOffer: null,
        offersNearby: [],
        reviewsByOffer: [],
        favorites: [],
        submitStatus: SubmitStatus.Unknown,
      });
  });

  it('should load favorite offers', () => {
    const state = {
      offers: fakeOffers,
      isDataLoaded: true,
      currentOffer: null,
      offersNearby: [],
      reviewsByOffer: [],
      favorites: [],
      submitStatus: SubmitStatus.Unknown,
    };
    expect(dataProcess.reducer(state, loadFavorites(fakeOffers)))
      .toEqual({
        offers: fakeOffers,
        isDataLoaded: true,
        currentOffer: null,
        offersNearby: [],
        reviewsByOffer: [],
        favorites: fakeOffers,
        submitStatus: SubmitStatus.Unknown,
      });
  });

  it('should load current offer', () => {
    const state = {
      offers: fakeOffers,
      isDataLoaded: true,
      currentOffer: null,
      offersNearby: [],
      reviewsByOffer: [],
      favorites: [],
      submitStatus: SubmitStatus.Unknown,
    };
    expect(dataProcess.reducer(state, loadOffer(fakeOffer)))
      .toEqual({
        offers: fakeOffers,
        isDataLoaded: true,
        currentOffer: fakeOffer,
        offersNearby: [],
        reviewsByOffer: [],
        favorites: [],
        submitStatus: SubmitStatus.Unknown,
      });
  });

  it('should load offers nearby', () => {
    const state = {
      offers: fakeOffers,
      isDataLoaded: true,
      currentOffer: fakeOffer,
      offersNearby: [],
      reviewsByOffer: [],
      favorites: [],
      submitStatus: SubmitStatus.Unknown,
    };

    const fakeOffersNearby = [fakeOffers[1], fakeOffers[2], fakeOffers[3]];

    expect(dataProcess.reducer(state, loadOffersNearby(fakeOffersNearby)))
      .toEqual({
        offers: fakeOffers,
        isDataLoaded: true,
        currentOffer: fakeOffer,
        offersNearby: fakeOffersNearby,
        reviewsByOffer: [],
        favorites: [],
        submitStatus: SubmitStatus.Unknown,
      });
  });

  it('should load reviews by offer', () => {
    const state = {
      offers: fakeOffers,
      isDataLoaded: true,
      currentOffer: fakeOffer,
      offersNearby: fakeOffers,
      reviewsByOffer: [],
      favorites: [],
      submitStatus: SubmitStatus.Unknown,
    };
    expect(dataProcess.reducer(state, loadReviewsByOffer(fakeReviewsByOffer)))
      .toEqual({
        offers: fakeOffers,
        isDataLoaded: true,
        currentOffer: fakeOffer,
        offersNearby: fakeOffers,
        reviewsByOffer: fakeReviewsByOffer,
        favorites: [],
        submitStatus: SubmitStatus.Unknown,
      });
  });

  it('should change submit status by sending', () => {
    const state = {
      offers: fakeOffers,
      isDataLoaded: true,
      currentOffer: fakeOffer,
      offersNearby: fakeOffers,
      reviewsByOffer: fakeReviewsByOffer,
      favorites: [],
      submitStatus: SubmitStatus.Unknown,
    };
    expect(dataProcess.reducer(state, changeSubmitStatus(SubmitStatus.Sending)))
      .toEqual({
        offers: fakeOffers,
        isDataLoaded: true,
        currentOffer: fakeOffer,
        offersNearby: fakeOffers,
        reviewsByOffer: fakeReviewsByOffer,
        favorites: [],
        submitStatus: SubmitStatus.Sending,
      });
  });
});
