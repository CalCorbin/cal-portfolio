import { useQuery } from 'react-query';
import API_URLS from '../constants/apiUrls';

interface collectionDataResponse {
  id: number;
}

/**
 * Fetches art data from the Art Institute of Chicago API
 * API docs: https://api.artic.edu/docs/
 * @param searchTerm {string} - The search term to use
 */
const searchArtic = async (searchTerm: string) => {
  const { ARTIC_BASE_PATH, ARTIC_ARTWORKS } = API_URLS;
  const collections = await fetch(
    `${ARTIC_BASE_PATH}${ARTIC_ARTWORKS}/search`,
    {
      method: 'POST',
      headers: {
        'access-control-allow-origin': '*',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        q: searchTerm,
        fields: 'id',
      }),
    }
  );
  const { data: collectionData } = await collections.json();
  const collectionIds = collectionData.map(
    (collection: collectionDataResponse) => collection.id
  );
  const imageIds = await fetch(
    `${ARTIC_BASE_PATH}${ARTIC_ARTWORKS}?ids=${collectionIds.join(
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
    () => searchArtic(searchTerm),
    {
      staleTime: 1000 * 60,
      keepPreviousData: true,
      refetchOnWindowFocus: false,
      enabled,
    }
  );
}
