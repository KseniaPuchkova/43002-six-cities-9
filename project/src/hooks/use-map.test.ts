import {renderHook} from '@testing-library/react-hooks';
import {screen} from '@testing-library/react';
import useMap from './use-map';
import {makeFakeOffer} from '../utils/mocks';

const FAKE_OFFER_ID = 1;
const fakeOffer = makeFakeOffer(FAKE_OFFER_ID);
const fakeCity = fakeOffer.city;

describe('Hook, useMap', () => {
  it('should return map', () => {
    const fakeMap = document.createElement('section');
    document.body.appendChild(fakeMap);

    const ref = {current: fakeMap};
    renderHook(() => useMap(ref, fakeCity));

    expect(screen.getByText('CARTO')).toBeInTheDocument();
    expect(screen.getByText('Leaflet')).toBeInTheDocument();
  });
});
