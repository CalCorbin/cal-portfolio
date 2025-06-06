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
      <meta httpEquiv="content-language" content="en" />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'WebPage',
            name: title,
            description: description,
            image: image,
            url: url,
          }),
        }}
      />
      <link rel="icon" href="/favicon.ico" />
      <meta name="robots" content="index, follow" />
    </Head>
  );
};

export default MetaDataTags;
