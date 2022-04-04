import {render} from '@testing-library/react';
import LoadingScreen from './loading-screen';

describe('Component: LoadingScreen', () => {
  it('should render correctly', () => {
    render(<LoadingScreen />);

    const {container} = render(<LoadingScreen />)
    expect(container.firstChild).toHaveClass('loader__wrapper')
  });
});
