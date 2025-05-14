export type ArtProps = {
  id: number;
  title: string;
  artist_title?: string | null;
  artist_id?: number | null;
  image_id?: string | null;
  artwork_type_title: string;
  thumbnail?: {
    lqip?: string;
    width?: number;
    height?: number;
    alt_text?: string;
  } | null;
};

export type ArtworkResponse = {
  data: ArtProps[] | null;
  info: {
    license_text: string;
    license_links: string[];
    version: string;
  };
  config: {
    iiif_url: string;
    website_url: string;
  };
};

export type CollectionResponse = {
  preference: null;
  pagination: {
    total: number;
    limit: number;
    offset: number;
    total_pages: number;
    current_page: number;
  };
  data: Array<{
    _score: number;
    id: number;
  }>;
  info: {
    license_text: string;
    license_links: string[];
    version: string;
  };
  config: {
    iiif_url: string;
    website_url: string;
  };
};
