import { cleanup, render } from '@testing-library/react';
import MetaDataTags from './MetaDataTags';

describe('MetaDataTags', () => {
  const initialProps = {
    title: 'The Hobbit',
    description: 'A book about a hobbit',
    image: 'image/ring/one-ring.jpg',
    url: 'https://www.example.com',
  };

  const prepareComponent = (props = initialProps) =>
    render(<MetaDataTags {...props} />);

  afterEach(cleanup);

  it.skip('should render expected props', () => {
    prepareComponent();

    expect(document.title).toBe(initialProps.title);
    expect(
      document
        .querySelector('meta[property="og:title"]')
        ?.getAttribute('content')
    ).toBe(initialProps.title);
    expect(
      document
        .querySelector('meta[property="og:description"]')
        ?.getAttribute('content')
    ).toBe(initialProps.description);
    expect(
      document
        .querySelector('meta[property="og:image"]')
        ?.getAttribute('content')
    ).toBe(initialProps.image);
    expect(
      document.querySelector('meta[property="og:url"]')?.getAttribute('content')
    ).toBe(initialProps.url);
  });
});
