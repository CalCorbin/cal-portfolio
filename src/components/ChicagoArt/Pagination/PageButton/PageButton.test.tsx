import { fireEvent, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import PageButton from './PageButton';

describe('PageButton', () => {
  it('should render children correctly', () => {
    render(<PageButton>it</PageButton>);
    expect(screen.getByText('it')).toBeInTheDocument();
  });

  it('should call onClick when clicked', () => {
    const handleClick = jest.fn();
    render(<PageButton onClick={handleClick}>Click me</PageButton>);

    fireEvent.click(screen.getByText('Click me'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('should be disabled when disabled prop is true', () => {
    render(<PageButton disabled>Disabled</PageButton>);
    expect(screen.getByText('Disabled')).toBeDisabled();
  });

  it('should be enabled by default', () => {
    render(<PageButton>Enabled</PageButton>);
    expect(screen.getByText('Enabled')).not.toBeDisabled();
  });

  it('should not call onClick when disabled', () => {
    const handleClick = jest.fn();
    render(
      <PageButton onClick={handleClick} disabled>
        Disabled
      </PageButton>
    );

    fireEvent.click(screen.getByText('Disabled'));
    expect(handleClick).not.toHaveBeenCalled();
  });

  it('should apply correct CSS classes', () => {
    const { rerender } = render(<PageButton>Default</PageButton>);
    expect(screen.getByText('Default').className).toBe('pageButton');

    rerender(<PageButton isActive>Active</PageButton>);
    expect(screen.getByText('Active').className).toBe('pageButton activePage');

    rerender(<PageButton isArrow>Arrow</PageButton>);
    expect(screen.getByText('Arrow').className).toBe('pageButton pageArrow');

    rerender(
      <PageButton isActive isArrow>
        Active Arrow
      </PageButton>
    );
    expect(screen.getByText('Active Arrow').className).toBe(
      'pageButton activePage pageArrow'
    );
  });

  it('should set aria-label attribute correctly', () => {
    render(<PageButton ariaLabel="Page 5">5</PageButton>);
    expect(screen.getByText('5')).toHaveAttribute('aria-label', 'Page 5');
  });

  it('should set aria-current attribute correctly with string value', () => {
    render(<PageButton ariaCurrent="page">Current</PageButton>);
    expect(screen.getByText('Current')).toHaveAttribute('aria-current', 'page');
  });

  it('should set aria-current attribute correctly with boolean value', () => {
    render(<PageButton ariaCurrent={true}>Current</PageButton>);
    expect(screen.getByText('Current')).toHaveAttribute('aria-current', 'true');
  });

  it('should render complex children correctly', () => {
    render(
      <PageButton>
        <span data-testid="child-element">Complex Child</span>
      </PageButton>
    );

    expect(screen.getByTestId('child-element')).toBeInTheDocument();
    expect(screen.getByText('Complex Child')).toBeInTheDocument();
  });
});
