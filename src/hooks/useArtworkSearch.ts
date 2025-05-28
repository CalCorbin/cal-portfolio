import { useQuery } from '@tanstack/react-query';
import API_URLS from '../constants/apiUrls';
import {
  ArtworkResponse,
  CollectionResponse,
} from '../components/ChicagoArt/types/ArticApi';
import { SearchParamQuery } from '../components/ChicagoArt/types/SearchParamQuery';

const useArtworkSearch = (
  query: string,
  page: number = 1,
  selectedFilters: string[] = []
) => {
  const { ARTIC_BASE_PATH, ARTIC_ARTWORKS } = API_URLS;
  const pageSize = 12;

  return useQuery({
    queryKey: ['artworks', query, page, selectedFilters],
    queryFn: async () => {
      // Do initial search in art collections
      const searchUrl = new URL(`${ARTIC_BASE_PATH}${ARTIC_ARTWORKS}/search`);
      let params: SearchParamQuery = {
        q: query,
        fields: ['id'],
        limit: pageSize,
        page: page,
      };
      if (selectedFilters.length > 0) {
        params = {
          ...params,
          query: {
            bool: {
              should: selectedFilters.map((filter) => ({
                match: {
                  artwork_type_title: filter,
                },
              })),
              minimum_should_match: 1,
            },
          },
        };
      }

      searchUrl.searchParams.set('params', JSON.stringify(params));

      const collections = await fetch(searchUrl.toString());

      const { data: collectionData, pagination } =
        (await collections.json()) as CollectionResponse;

      if (!collectionData.length) return { data: [], pagination };

      // Gather collection ids
      const ids = collectionData
        .map((item: { id: number }) => item.id)
        .join(',');

      // Build artworkUrl and fetch artwork images
      const artworkUrl = new URL(`${ARTIC_BASE_PATH}${ARTIC_ARTWORKS}`);
      artworkUrl.searchParams.set('ids', ids);
      artworkUrl.searchParams.set(
        'fields',
        'id,title,image_id,artist_title,thumbnail,artist_id,artwork_type_title'
      );
      const artworks = await fetch(artworkUrl.toString());
      const { data } = (await artworks.json()) as ArtworkResponse;

      // Finally return results
      return { data, pagination };
    },
    enabled: !!query,
  });
};

export default useArtworkSearch;
