import { useRouter, useSearchParams } from 'next/navigation';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Pagination from './Pagination';

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
  useSearchParams: jest.fn(),
}));

describe('<Pagination />', () => {
  const initialProps = (overrides = {}) => {
    return {
      page: 5,
      pagination: { total_pages: 10, total: 100 },
      ...overrides,
    };
  };

  let pushMock: jest.Mock;
  const setMock = jest.fn();

  beforeEach(() => {
    pushMock = jest.fn();
    (useRouter as jest.Mock).mockReturnValue({
      push: pushMock,
    });

    const toString = jest.fn().mockReturnValue('');
    (useSearchParams as jest.Mock).mockReturnValue({
      toString,
      get: jest.fn(),
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
    jest.resetAllMocks();
  });

  describe('rendering', () => {
    it('should render pagination with correct current page', () => {
      render(<Pagination {...initialProps()} />);

      expect(screen.getByText('5')).toHaveAttribute('aria-current', 'page');
      expect(
        screen.getByText('Showing 5 of 10 pages (100 results)')
      ).toBeInTheDocument();
    });

    it('should not render when pagination is null', () => {
      const { container } = render(
        <Pagination page={1} pagination={null as never} />
      );
      expect(container).toBeEmptyDOMElement();
    });

    it('should not render when total_pages is less than 1', () => {
      const props = initialProps({
        pagination: {
          total_pages: 1,
          total: 0,
        },
        page: 1,
      });

      const { container } = render(<Pagination {...props} />);
      expect(container).toBeEmptyDOMElement();
    });

    it('should render 83 pages when total_pages is 83', () => {
      const props = initialProps({
        pagination: {
          total_pages: 83,
          total: 4592,
        },
        page: 1,
      });

      render(<Pagination {...props} />);
      expect(screen.getByText('1')).toHaveAttribute('aria-current', 'page');
      expect(
        screen.getByText('Showing 1 of 83 pages (4592 results)')
      ).toBeInTheDocument();
    });

    it('should render 83 pages when total_pages is 356', () => {
      const props = initialProps({
        pagination: {
          total_pages: 356,
          total: 4592,
        },
        page: 1,
      });

      render(<Pagination {...props} />);
      expect(screen.getByText('1')).toHaveAttribute('aria-current', 'page');
      expect(
        screen.getByText('Showing 1 of 83 pages (4592 results)')
      ).toBeInTheDocument();
    });
  });

  describe('navigation', () => {
    it('should go back a previous page correctly', () => {
      global.URLSearchParams = jest.fn().mockImplementation(() => ({
        toString: () => 'page=4',
        set: setMock,
      }));

      render(<Pagination {...initialProps()} />);

      // Click previous page
      screen.getByLabelText('Previous page').click();
      expect(pushMock).toHaveBeenCalledWith('?page=4');
    });

    it('should go forward a page correctly', () => {
      global.URLSearchParams = jest.fn().mockImplementation(() => ({
        toString: () => 'page=6',
        set: setMock,
      }));

      render(<Pagination {...initialProps()} />);

      // Click next page
      screen.getByLabelText('Next page').click();
      expect(pushMock).toHaveBeenCalledWith('?page=6');
    });

    it('should go to first page', () => {
      // Mock URLSearchParams
      global.URLSearchParams = jest.fn().mockImplementation(() => ({
        toString: () => 'page=1',
        set: jest.fn(),
      }));
      const props = {
        page: 10,
        pagination: {
          total_pages: 10,
          total: 100,
        },
      };
      render(<Pagination {...props} />);

      // Click on first page
      screen.getByText('1').click();
      expect(pushMock).toHaveBeenCalledWith('?page=1');
    });

    it('should go to the last page', () => {
      global.URLSearchParams = jest.fn().mockImplementation(() => ({
        toString: () => 'page=10',
        set: setMock,
      }));
      const props = {
        page: 1,
        pagination: {
          total_pages: 10,
          total: 100,
        },
      };
      render(<Pagination {...props} />);

      // Click on last page
      screen.getByText('10').click();
      expect(pushMock).toHaveBeenCalledWith('?page=10');
    });

    it('should disable previous button on first page', () => {
      render(<Pagination {...initialProps({ page: 1 })} />);

      expect(screen.getByLabelText('Previous page')).toBeDisabled();
      expect(screen.getByLabelText('Next page')).not.toBeDisabled();
    });

    it('should disable next button on last page', () => {
      const props = initialProps({
        pagination: {
          total_pages: 10,
          total: 100,
        },
        page: 10,
      });
      render(<Pagination {...props} />);

      expect(screen.getByLabelText('Previous page')).not.toBeDisabled();
      expect(screen.getByLabelText('Next page')).toBeDisabled();
    });

    it('should show correct pagination range for middle page', () => {
      render(<Pagination {...initialProps()} />);

      // Should show: 1 ... 4 5 6 ... 10
      expect(screen.getByText('1')).toBeInTheDocument();
      expect(screen.getByText('4')).toBeInTheDocument();
      expect(screen.getByText('5')).toBeInTheDocument();
      expect(screen.getByText('6')).toBeInTheDocument();
      expect(screen.getByText('10')).toBeInTheDocument();
      expect(screen.getAllByText('...').length).toBe(2);
    });

    it('should show correct pagination range for early page', () => {
      const props = initialProps({
        pagination: {
          total_pages: 10,
          total: 100,
        },
        page: 2,
      });

      render(<Pagination {...props} />);

      // Should show: 1 2 3 ... 10
      expect(screen.getByText('1')).toBeInTheDocument();
      expect(screen.getByText('2')).toBeInTheDocument();
      expect(screen.getByText('3')).toBeInTheDocument();
      expect(screen.getByText('10')).toBeInTheDocument();
      expect(screen.getAllByText('...').length).toBe(1);
    });

    it('should show correct pagination range for late page', () => {
      const props = {
        page: 9,
        pagination: {
          total_pages: 10,
          total: 100,
        },
      };
      render(<Pagination {...props} />);

      // Should show: 1 ... 8 9 10
      expect(screen.getByText('1')).toBeInTheDocument();
      expect(screen.getByText('8')).toBeInTheDocument();
      expect(screen.getByText('9')).toBeInTheDocument();
      expect(screen.getByText('10')).toBeInTheDocument();
      expect(screen.getAllByText('...').length).toBe(1);
    });

    it('should not navigate when trying to go to a page less than 1', () => {
      // Set up with page 1 so we can try to go to page 0
      render(<Pagination {...initialProps({ page: 1 })} />);

      // Directly call handlePageChange with an invalid page
      // You'll need to expose this or find a way to trigger it
      // One approach: click prev on first page and verify no navigation
      screen.getByLabelText('Previous page').click();
      expect(pushMock).not.toHaveBeenCalled();
    });

    it('should not navigate when trying to go beyond the last page', () => {
      // Set up with the last page
      render(
        <Pagination
          {...initialProps({
            page: 10,
            pagination: { total_pages: 10, total: 100 },
          })}
        />
      );

      // Try to go beyond
      screen.getByLabelText('Next page').click();
      expect(pushMock).not.toHaveBeenCalled();
    });
  });
});
