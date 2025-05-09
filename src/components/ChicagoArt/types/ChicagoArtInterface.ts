export interface ArtProps {
  id: number;
  title: string;
  artist_title?: string | null;
  artist_id?: number;
  image_id?: string | null;
  thumbnail?: {
    lqip?: string;
    width?: number;
    height?: number;
    alt_text?: string;
  } | null;
}
