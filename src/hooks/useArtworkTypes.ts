import { useQuery } from '@tanstack/react-query';
import API_URLS from '../constants/apiUrls';

const useArtworkTypes = () => {
  const { ARTIC_BASE_PATH } = API_URLS;

  return useQuery({
    queryKey: ['artworkTypes'],
    queryFn: async () => {
      const url = new URL(`${ARTIC_BASE_PATH}/api/v1/artwork-types`);
      url.searchParams.set('fields', 'title');
      const response = await fetch(url.toString());
      const data = await response.json();
      const titles = data.data.map((item: { title: string }) => item.title);
      return titles || [];
    },
  });
};

export default useArtworkTypes;
