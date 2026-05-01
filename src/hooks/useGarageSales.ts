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
  const { GARAGE_SALES_BASE_PATH, GARAGE_SALES } = API_URLS;
  const { recordID, ...bodyParams } = params;

  return useQuery({
    queryKey: ['garageSales', params],
    queryFn: async () => {
      const url = new URL(`${GARAGE_SALES_BASE_PATH}${GARAGE_SALES}`);
      if (recordID !== undefined) url.searchParams.set('recordID', String(recordID));

      const hasBodyParams = Object.keys(bodyParams).length > 0;
      const response = await fetch(url.toString(), hasBodyParams ? {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(bodyParams),
      } : undefined);

      return response.json() as Promise<GarageSalesResponse>;
    },
  });
};

export default useGarageSales;
