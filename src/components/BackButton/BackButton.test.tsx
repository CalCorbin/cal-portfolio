import { render, fireEvent, screen } from '@testing-library/react';
import BackButton from './BackButton';

describe('<BackButton />', () => {
  const prepareComponent = () => render(<BackButton />);

  it('should fire window.history.back() when clicked', () => {
    const spy = jest.spyOn(window.history, 'back');
    prepareComponent();

    fireEvent.click(screen.getByLabelText('Go back'));
    expect(spy).toHaveBeenCalled();
  });
});
