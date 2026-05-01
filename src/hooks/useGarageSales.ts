import { useQuery } from '@tanstack/react-query';
import API_URLS from '../constants/apiUrls';
import { GarageSalesResponse } from '../components/GarageSales/types/GarageSalesApi';

interface GarageSalesParams {
  recordID?: number;
  orderByField?: string;
  ascending?: boolean;
  filterField?: string;
  filterType?: 'equal' | 'notequal' | 'like' | 'notlike' | 'in' | 'notin';
  filterValue?: string;
}

const useGarageSales = (params: GarageSalesParams = {}) => {
  const { GARAGE_SALES_PROXY } = API_URLS;

  return useQuery({
    queryKey: ['garageSales', params],
    queryFn: async () => {
      const response = await fetch(GARAGE_SALES_PROXY, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(params),
      });
      return response.json() as Promise<GarageSalesResponse>;
    },
  });
};

export default useGarageSales;
