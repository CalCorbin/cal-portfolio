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

export default function useSearchArtic(searchTerm: string, enabled: boolean) {
  return useQuery(
    ['searchResults', searchTerm],
    () => searchArctic(searchTerm),
    {
      staleTime: 1000 * 60 * 60 * 24,
      keepPreviousData: true,
      refetchOnWindowFocus: false,
      enabled,
    }
  );
}
