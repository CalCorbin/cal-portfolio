import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import Talks from './Talks';

describe('<Talks/>', () => {
  beforeEach(() => {
    render(<Talks />);
  });

  it('should renders talks section', () => {
    const talksSection = screen.getByTestId('talks-section');
    expect(talksSection).toBeInTheDocument();

    const header = screen.getByText('tech talks');
    expect(header).toBeInTheDocument();
  });

  it('should render the first video by default', () => {
    const iframe = screen.getByTitle('Test Driven Development with Cypress');
    expect(iframe).toBeInTheDocument();
    expect(iframe).toHaveAttribute(
      'src',
      'https://www.youtube.com/embed/Az6Glc63tp0'
    );
  });

  it('should navigate to the next video when next button is clicked', () => {
    // Get the next button and click it
    const nextButton = screen.getByLabelText('Next video');
    fireEvent.click(nextButton);

    // Check if the second video is displayed
    const iframe = screen.getByTitle('Shipping Good Software Fast');
    expect(iframe).toBeInTheDocument();
    expect(iframe).toHaveAttribute(
      'src',
      'https://www.youtube.com/embed/jg6-5EwdeZ0'
    );
  });

  it('should navigate to the previous video when previous button is clicked', () => {
    // First navigate to the second video
    const nextButton = screen.getByLabelText('Next video');
    fireEvent.click(nextButton);

    // Then navigate back to the first video
    const prevButton = screen.getByLabelText('Previous video');
    fireEvent.click(prevButton);

    // Check if the first video is displayed again
    const iframe = screen.getByTitle('Test Driven Development with Cypress');
    expect(iframe).toBeInTheDocument();
    expect(iframe).toHaveAttribute(
      'src',
      'https://www.youtube.com/embed/Az6Glc63tp0'
    );
  });

  it('should cycle to the last video when clicking previous on the first video', () => {
    // Click the previous button when on the first video
    const prevButton = screen.getByLabelText('Previous video');
    fireEvent.click(prevButton);

    // Should show the last video
    const iframe = screen.getByTitle('Solve Problems, Not Syntax');
    expect(iframe).toBeInTheDocument();
    expect(iframe).toHaveAttribute(
      'src',
      'https://www.youtube.com/embed/wUD4sHZtIWE'
    );
  });

  it('should cycle to the first video when clicking next on the last video', () => {
    // Navigate to the last video
    const nextButton = screen.getByLabelText('Next video');
    fireEvent.click(nextButton);
    fireEvent.click(nextButton);

    // Now we're on the last video, click next again
    fireEvent.click(nextButton);

    // Should cycle back to the first video
    const iframe = screen.getByTitle('Test Driven Development with Cypress');
    expect(iframe).toBeInTheDocument();
    expect(iframe).toHaveAttribute(
      'src',
      'https://www.youtube.com/embed/Az6Glc63tp0'
    );
  });

  it('should change the video when clicking on pagination dots', () => {
    // Get all pagination dots
    const paginationDots = screen.getAllByRole('button', {
      name: /Go to video \d+/,
    });

    // Click on the second dot
    fireEvent.click(paginationDots[1]);

    // Check if the second video is displayed
    let iframe = screen.getByTitle('Shipping Good Software Fast');
    expect(iframe).toBeInTheDocument();

    // Click on the third dot
    fireEvent.click(paginationDots[2]);

    // Check if the third video is displayed
    iframe = screen.getByTitle('Solve Problems, Not Syntax');
    expect(iframe).toBeInTheDocument();

    // Click on the first dot
    fireEvent.click(paginationDots[0]);

    // Check if the first video is displayed
    iframe = screen.getByTitle('Test Driven Development with Cypress');
    expect(iframe).toBeInTheDocument();
  });

  it('should verify the correct number of pagination dots', () => {
    const paginationDots = screen.getAllByRole('button', {
      name: /Go to video \d+/,
    });
    expect(paginationDots).toHaveLength(3); // Should match the number of videos
  });
});
