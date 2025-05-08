import { useQuery } from '@tanstack/react-query';
import API_URLS from '../constants/apiUrls';

const useArtworkSearch = (query: string, page: number = 1) => {
  const { ARTIC_BASE_PATH, ARTIC_ARTWORKS } = API_URLS;
  const pageSize = 12;

  return useQuery({
    queryKey: ['artworks', query, page],
    queryFn: async () => {
      // Do initial search in art collections
      const collections = await fetch(
        `${ARTIC_BASE_PATH}${ARTIC_ARTWORKS}/search`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            q: query,
            fields: 'id',
            limit: pageSize,
            page: page,
          }),
        }
      );

      const { data: collectionData, pagination } = await collections.json();

      if (!collectionData.length) return { data: [], pagination };

      // Gather collection ids and grab artwork images.
      const ids = collectionData
        .map((item: { id: number }) => item.id)
        .join(',');
      const artworks = await fetch(
        `${ARTIC_BASE_PATH}${ARTIC_ARTWORKS}?ids=${ids}&fields=title,image_id,artist_title,thumbnail,artist_id`
      );
      const { data } = await artworks.json();

      // Finally return results
      return { data, pagination };
    },
    enabled: !!query,
  });
};

export default useArtworkSearch;
