import { useQuery } from '@tanstack/react-query';
import API_URLS from '../constants/apiUrls';

interface collectionDataResponse {
  id: number;
}

/**
 * Fetches art data from the Art Institute of Chicago API
 * API docs: https://api.artic.edu/docs/
 * @param searchTerm {string} - The search term to use
 */
const artworkSearch = async (searchTerm: string) => {
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
        limit: 12,
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
    )}&fields=title,image_id,artist_title,thumbnail,artist_id`
  );
  const { data: imageData } = await imageIds.json();
  return imageData;
};

/**
 * React Query hook to fetch art data from the Art Institute of Chicago API
 * @param searchTerm {string} - The search term to use
 */
export default function useSearchArtic(searchTerm: string) {
  return useQuery({
    queryKey: ['searchResults', searchTerm],
    queryFn: () => artworkSearch(searchTerm),
    staleTime: 1000 * 60,
    gcTime: 1000 * 60,
    refetchOnWindowFocus: false,
    enabled: !!searchTerm,
  });
}
