import { ArtProps } from './ArticApi';

export type QueryResults = {
  isLoading: boolean;
  isFetching: boolean;
  isError: boolean;
  data: {
    data?: Array<ArtProps>;
    pagination?: {
      total_pages: number;
      total: number;
    };
  };
};
