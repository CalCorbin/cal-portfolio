import Head from 'next/head';

interface MetaDataTagsProps {
  title: string;
  description: string;
  image: string;
  url: string;
}

const MetaDataTags = ({
  title,
  description,
  image,
  url,
}: MetaDataTagsProps) => {
  return (
    <Head>
      <meta name="description" content={description} />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta charSet="UTF-8" />
      <title>{title}</title>
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:url" content={url} />
      <meta property="og:type" content="website" />
    </Head>
  );
};

export default MetaDataTags;
