import { Helmet } from 'react-helmet';

interface PortfolioHelmetProps {
  title: string;
  description: string;
  image: string;
  url: string;
}

const PortfolioHelmet = ({
  title,
  description,
  image,
  url,
}: PortfolioHelmetProps) => {
  return (
    <Helmet>
      <title>{title}</title>
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:url" content={url} />
      <meta property="og:type" content="website" />
    </Helmet>
  );
};

export default PortfolioHelmet;
