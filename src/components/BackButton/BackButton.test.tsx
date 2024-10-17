import BackButton from './BackButton';
import {
  render,
  screen,
  fireEvent,
} from '@testing-library/react';

describe('<BackButton />', () => {
  it("should fire window.history.back() when clicked", () => {
    const spy = jest.spyOn(window.history, 'back');
    render(<BackButton />);
    fireEvent.click(screen.getByRole('button'));
    expect(spy).toHaveBeenCalled();
  });
});