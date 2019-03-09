import * as React from 'react';

import ImageList from 'components/ImageList';

import { getList } from 'api';
import { IImage } from 'api/response';

export default () => {
  const [images, setImages] = React.useState<IImage[]>([]);

  const [query, setQuery] = React.useState('');

  React.useEffect(() => {
    (async () => {
      setImages(await getList());
    })();
  }, []);

  return (
    <>
      <input onChange={e => setQuery(e.target.value)} value={query} />
      <ImageList
        images={images.filter(
          item => `${item.title} ${item.description}`.indexOf(query) > -1
        )}
      />
    </>
  );
};
