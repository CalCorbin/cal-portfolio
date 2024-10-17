import BackButton from './BackButton';
import { render, fireEvent } from '@testing-library/react';

describe('<BackButton />', () => {
  it('should fire window.history.back() when clicked', () => {
    const spy = jest.spyOn(window.history, 'back');
    const { getByTestId } = render(<BackButton />);
    fireEvent.click(getByTestId('back-button'));
    expect(spy).toHaveBeenCalled();
  });
});
