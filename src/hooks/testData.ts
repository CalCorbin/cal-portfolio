import {
  CollectionResponse,
  ArtworkResponse,
} from '../components/ChicagoArt/types/ArticApi';

export const mockCollectionsResponse: CollectionResponse = {
  preference: null,
  data: [
    {
      _score: 136.79367,
      id: 122232,
    },
    {
      _score: 99.20633,
      id: 2344,
    },
    {
      _score: 99.1752,
      id: 20392,
    },
    {
      _score: 98.025276,
      id: 154136,
    },
    {
      _score: 95.81213,
      id: 86421,
    },
    {
      _score: 95.794685,
      id: 8585,
    },
    {
      _score: 95.6341,
      id: 74065,
    },
    {
      _score: 95.36229,
      id: 182567,
    },
    {
      _score: 94.26268,
      id: 12380,
    },
    {
      _score: 93.58326,
      id: 23468,
    },
    {
      _score: 89.675476,
      id: 186425,
    },
    {
      _score: 87.4162,
      id: 9512,
    },
  ],
  pagination: {
    total: 38,
    limit: 12,
    offset: 0,
    total_pages: 3,
    current_page: 1,
  },
  info: {
    license_text:
      'The `description` field in this response is licensed under a Creative Commons Attribution 4.0 Generic License (CC-By) and the Terms and Conditions of artic.edu. All other data in this response is licensed under a Creative Commons Zero (CC0) 1.0 designation and the Terms and Conditions of artic.edu.',
    license_links: [
      'https://creativecommons.org/publicdomain/zero/1.0/',
      'https://www.artic.edu/terms',
    ],
    version: '1.13',
  },
  config: {
    iiif_url: 'https://www.artic.edu/iiif/2',
    website_url: 'http://www.artic.edu',
  },
};

export const mockArtworkResponse: ArtworkResponse = {
  data: [
    {
      id: 154136,
      title: 'Three-Piece Tea Set with Tray',
      thumbnail: {
        lqip: 'data:image/gif;base64,R0lGODlhAwAFAPMAALWWjbaakL6lmr6onsGimcOkm8OuosiqoMito8ivpcmxps6xp8i0p822qs62qwAAACH5BAAAAAAALAAAAAADAAUAAAQLEIigDmsLFZcGMREAOw==',
        width: 3000,
        height: 2319,
        alt_text: 'A work made of silver-plated nickel, silver, and bakelite.',
      },
      artwork_type_title: 'Metalwork',
      artist_id: 87541,
      artist_title: 'Gene Theobald',
      image_id: 'be36e3c2-7b0f-91ce-4d54-4dc187966729',
    },
    {
      id: 74065,
      title: 'Tea and Coffee Service',
      thumbnail: {
        lqip: 'data:image/gif;base64,R0lGODlhAwAFAPMAALWWjbaakL6lmr6onsGimcOkm8OuosiqoMito8ivpcmxps6xp8i0p822qs62qwAAACH5BAAAAAAALAAAAAADAAUAAAQLEIigDmsLFZcGMREAOw==',
        width: 3000,
        height: 2250,
        alt_text: 'A work made of silver and ebonized wood.',
      },
      artwork_type_title: 'Metalwork',
      artist_id: 4581,
      artist_title: 'Jean-Simon Chaudron',
      image_id: '75af939c-888d-dddc-0047-42659c2b094b',
    },
    {
      id: 122232,
      title: 'Laurette with a Cup of Coffee',
      thumbnail: {
        lqip: 'data:image/gif;base64,R0lGODlhAwAFAPMAALWWjbaakL6lmr6onsGimcOkm8OuosiqoMito8ivpcmxps6xp8i0p822qs62qwAAACH5BAAAAAAALAAAAAADAAUAAAQLEIigDmsLFZcGMREAOw==',
        width: 1622,
        height: 2250,
        alt_text: 'A work made of oil on canvas.',
      },
      artwork_type_title: 'Painting',
      artist_id: 35670,
      artist_title: 'Henri Matisse',
      image_id: '72d28816-c42f-af88-63fc-d12426db240e',
    },
    {
      id: 12380,
      title: 'Tea Bowl',
      thumbnail: {
        lqip: 'data:image/gif;base64,R0lGODlhCAAFAPUAAE09LkQ5M0Y7NUw+MVlLQ19aWHVmXndqX2hjYXlrY3RubJGEeoyHg5eOiJSMi5+Yl7OqpsTAwMfEwMrGxtPPzN/a1eDb1uDc2eHd2uLf2uLf3ePh3eTi3eXj4+bk5Ojm4+nn4+nl5Ovp6Ozq6+7s7PDs6/Dt7AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAAAAAAALAAAAAAIAAUAAAYlwA0oU7FwPhfMYSAIABaaUoNgSBggIZMEUVAwKCKSJ+J4TDqjIAA7',
        width: 3000,
        height: 1999,
        alt_text:
          'A work made of jian ware; stoneware with dark brown "hare\'s fur" glaze and metal rim.',
      },
      artwork_type_title: 'Decorative Arts',
      artist_id: null,
      artist_title: null,
      image_id: '288118db-838c-1cee-5731-d3d26b99d737',
    },
    {
      id: 86421,
      title: 'Panel (Furnishing Fabric)',
      thumbnail: {
        lqip: 'data:image/gif;base64,R0lGODlhAwAFAPMAALWWjbaakL6lmr6onsGimcOkm8OuosiqoMito8ivpcmxps6xp8i0p822qs62qwAAACH5BAAAAAAALAAAAAADAAUAAAQLEIigDmsLFZcGMREAOw==',
        width: 1301,
        height: 2250,
        alt_text:
          'French toile fabric with oriental scenes in red on a white ground. Pattern repeats and includes scenes of life.',
      },
      artwork_type_title: 'Textile',
      artist_id: 35013,
      artist_title: 'Jean Baptiste Huet',
      image_id: '99a562f9-d39a-274b-0a75-163168dda766',
    },
    {
      id: 2344,
      title: 'Tea Bowl',
      thumbnail: {
        lqip: 'data:image/gif;base64,R0lGODlhAwAFAPMAALWWjbaakL6lmr6onsGimcOkm8OuosiqoMito8ivpcmxps6xp8i0p822qs62qwAAACH5BAAAAAAALAAAAAADAAUAAAQLEIigDmsLFZcGMREAOw==',
        width: 3000,
        height: 2230,
        alt_text:
          'Porcelain tea bowl and a plate with an enamel pattern depicting a white unicorn and a blue bull flanking coat of arms and standing on a ribbon with a "FOY POUR DEVOIR" motto.',
      },
      artwork_type_title: 'Ceramics',
      artist_id: null,
      artist_title: null,
      image_id: 'bb506af3-7677-b443-c8b0-431ddcc077c4',
    },
    {
      id: 20392,
      title: 'Tea Bowl',
      thumbnail: {
        lqip: 'data:image/gif;base64,R0lGODlhAwAFAPMAALWWjbaakL6lmr6onsGimcOkm8OuosiqoMito8ivpcmxps6xp8i0p822qs62qwAAACH5BAAAAAAALAAAAAADAAUAAAQLEIigDmsLFZcGMREAOw==',
        width: 3000,
        height: 2155,
        alt_text:
          'A work made of jian ware; dark-gray stoneware with dark-brown glaze and overglaze \u201chare\u2019s fur\u201d markings in iron oxide.',
      },
      artwork_type_title: 'Vessel',
      artist_id: null,
      artist_title: null,
      image_id: '61b66906-0e3d-cdbb-2012-1ea21731608c',
    },
    {
      id: 8585,
      title: 'Raku Ware Tea Bowl',
      thumbnail: {
        lqip: 'data:image/gif;base64,R0lGODlhAwAFAPMAALWWjbaakL6lmr6onsGimcOkm8OuosiqoMito8ivpcmxps6xp8i0p822qs62qwAAACH5BAAAAAAALAAAAAADAAUAAAQLEIigDmsLFZcGMREAOw==',
        width: 3000,
        height: 2225,
        alt_text: 'A work made of glazed stoneware.',
      },
      artwork_type_title: 'Decorative Arts',
      artist_id: 111345,
      artist_title: 'Raku Ry\u014dny\u016b',
      image_id: 'dcf5e379-e1f8-da54-495c-b6669d698120',
    },
    {
      id: 182567,
      title: 'Tea and Coffee Service',
      thumbnail: {
        lqip: 'data:image/gif;base64,R0lGODlhDAAFAPUAAJ+LbaSObaCOc6OQcqWRcqaRcqqVdqWSeKaUeKmWfKmXfbaigryrjr2ulrismr+ynb+4rb2+v8CuksW1m8S3n8K2pMW6pcbAt8DAwMLCw8jHxsjJycrKys/Myc/NyczMys7Oz9HPy9DOzNDPzdLQztTSz9jUzM7P0NLT09fW09PU1tPV19XU1NXW19jX1dbX2tfY29fZ3Nva2dna2tvd3Nze3N3e3Nzd3t3e3tve4tvf4gAAAAAAAAAAAAAAAAAAACH5BAAAAAAALAAAAAAMAAUAAAY3wFFKdsPZarQZbMX5SCYmly4Xe3kumo0gwXhYKJVFI4DJQAwHBQEwQBQcEZBKRCqxWiFUR3UKAgA7',
        width: 3000,
        height: 1233,
        alt_text:
          'A work made of hard-paste porcelain, polychrome enamels, and gilding.',
      },
      artwork_type_title: 'Ceramics',
      artist_id: 101705,
      artist_title: 'Denuelle Porcelain Manufactory',
      image_id: '9eec42b2-5757-dd55-90ad-b1ed194f8401',
    },
    {
      id: 9512,
      title: 'Oribe-Type Ewer',
      thumbnail: {
        lqip: 'data:image/gif;base64,R0lGODlhBAAFAPQAABITExMTFB0cGSIhHyYjHSkoJTUxJzw2Lz04Lzc0MEE/PUdANk1GO0NDRFtUTWBWS6+fibumhLmrlMatjAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAAAAAAALAAAAAAEAAUAAAURIEAIQXIgAxNJxjJBhfI4TQgAOw==',
        width: 1800,
        height: 2250,
        alt_text:
          'Greenish brown ceramic kettle with floral and geometric designs.',
      },
      artwork_type_title: 'Decorative Arts',
      artist_id: null,
      artist_title: null,
      image_id: '2e28c794-3fed-bd00-ed01-64c46cee9b7e',
    },
    {
      id: 23468,
      title: 'Water jar (Mizusashi)',
      thumbnail: {
        lqip: 'data:image/gif;base64,R0lGODlhBwAFAPUAAEg5LEQ8NlNLPoR2X5J9WqWGV6ePZrmRYriUZbueetuwe5aZnbWbgLKml6ytsMOghcKqidKvh8uumdy8ncGzotC9rMO6sdfEr8/GvdLEtdvMu77Ax9HKw9nRydna3ejo7ezs8O7w9fHy+AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAAAAAAALAAAAAAHAAUAAAYhwFAHwsFcRJnG4SFhaCiJSURRsXgIBkRhsAE5BIDA4hMEADs=',
        width: 1075,
        height: 763,
        alt_text: 'A work made of glazed stoneware.',
      },
      artwork_type_title: 'Vessel',
      artist_id: 36439,
      artist_title: 'Kita\u00f4ji Rosanjin',
      image_id: '0f0cc5e1-b55a-8978-ceaf-c5c2c23e475c',
    },
    {
      id: 186425,
      title: 'Afternoon Tea',
      thumbnail: {
        lqip: 'data:image/gif;base64,R0lGODlhBAAFAPQAAD05NkY2LEM6MkQ4MEZGSElMTlZLRVVQSFtaVWVXT2ZZT2ZhVmZgW3ZtZHhtZnJvaHpyaoR7cYd7co+FfwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAAAAAAALAAAAAAEAAUAAAURYAMxkZI40hAIhzE9C0AUSAgAOw==',
        width: 1829,
        height: 2250,
        alt_text: 'A work made of oil on canvas.',
      },
      artwork_type_title: 'Painting',
      artist_id: 40762,
      artist_title: 'Jean-Fran\u00e7ois Rafa\u00eblli',
      image_id: '6e960a8e-4189-f7b7-4785-716474c36179',
    },
  ],
  info: {
    license_text:
      'The `description` field in this response is licensed under a Creative Commons Attribution 4.0 Generic License (CC-By) and the Terms and Conditions of artic.edu. All other data in this response is licensed under a Creative Commons Zero (CC0) 1.0 designation and the Terms and Conditions of artic.edu.',
    license_links: [
      'https://creativecommons.org/publicdomain/zero/1.0/',
      'https://www.artic.edu/terms',
    ],
    version: '1.13',
  },
  config: {
    iiif_url: 'https://www.artic.edu/iiif/2',
    website_url: 'http://www.artic.edu',
  },
};
