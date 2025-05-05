import { render, screen } from '@testing-library/react';
import CardSkeleton from './CardSkeleton';

describe('<CardSkeleton />', () => {
  it('should render 12 cards', () => {
    render(<CardSkeleton />);

    const cards = screen.getAllByTestId('card-skeleton');
    expect(cards).toHaveLength(12);
  });
});
