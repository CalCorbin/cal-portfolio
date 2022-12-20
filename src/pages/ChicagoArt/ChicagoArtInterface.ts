export interface ArtProps {
  title: string;
  artist_title?: string;
  artist_id?: number;
  image_id: string;
  thumbnail?: {
    lqip?: string;
    width?: number;
    height?: number;
    alt_text?: string;
  };
}
