import { useQuery } from 'react-query';

interface collectionDataResponse {
  id: number;
}

/**
 * Fetches art data from the Art Institute of Chicago API
 * API docs: https://api.artic.edu/docs/
 * @param searchTerm {string} - The search term to use
 */
const searchArctic = async (searchTerm: string) => {
  const collections = await fetch(
    `https://api.artic.edu/api/v1/artworks/search?q=${searchTerm}?fields=data`
  );
  const { data: collectionData } = await collections.json();
  const collectionIds = collectionData.map(
    (collection: collectionDataResponse) => collection.id
  );
  const imageIds = await fetch(
    `https://api.artic.edu/api/v1/artworks?ids=${collectionIds.join(
      ','
    )}&fields=title,image_id,artist_title`
  );
  const { data: imageData } = await imageIds.json();

  return imageData;
};

/**
 * React Query hook to fetch art data from the Art Institute of Chicago API
 * @param searchTerm {string} - The search term to use
 * @param enabled {boolean} - Whether or not to fetch data
 */
export default function useSearchArtic(searchTerm: string, enabled: boolean) {
  return useQuery(
    ['searchResults', searchTerm],
    () => searchArctic(searchTerm),
    {
      keepPreviousData: true,
      refetchOnWindowFocus: false,
      enabled,
    }
  );
}
