import { cleanup, render } from '@testing-library/react';
import { Helmet } from 'react-helmet';
import HelmetData from './HelmetData';

describe('HelmetData', () => {
  const initialProps = {
    title: 'The Hobbit',
    description: 'A book about a hobbit',
    image: 'image/ring/one-ring.jpg',
    url: 'https://www.example.com',
  };

  const prepareComponent = (props = initialProps) =>
    render(<HelmetData {...props} />);

  afterEach(cleanup);

  it('should render expected props', () => {
    prepareComponent();

    const helmet = Helmet.peek();
    expect(helmet.title).toBe(initialProps.title);
    expect(helmet.metaTags).toHaveLength(5);
    expect(helmet.metaTags[0].content).toBe(initialProps.title);
    expect(helmet.metaTags[1].content).toBe(initialProps.description);
    expect(helmet.metaTags[2].content).toBe(initialProps.image);
    expect(helmet.metaTags[3].content).toBe(initialProps.url);
  });
});
